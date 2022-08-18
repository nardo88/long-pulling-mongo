import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import router from './routers/books.js'
import constants from './constants/index.js'
import Book from './models/book.js'
import events from 'events'

export const emittor = new events.EventEmitter()
const pipeline = [{ $match: { operationType: 'insert' } }]

const app = express()
app.use(express.json())
app.use(cors())

app.use('/api/v1/book', router)

const start = async () => {
    try {
        await mongoose.connect(constants.mongoUrl, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        })
        // запускаем сервер Express
        app.listen('5000', () => {
            console.log('server started...')
        })
        // Запускаем слушатель от mongoDb на событие добавления записи в коллекцию
        Book.watch(pipeline).on('change', (data) => {
            // в случае возникновения события, вызываем кастомное событие с помощью
            // emittor. Аргументом передаем добавленный документ в коллекцию
            emittor.emit('newBook', data.fullDocument)
        })

    } catch (e) {
        console.log(e)
    }
}

start()

