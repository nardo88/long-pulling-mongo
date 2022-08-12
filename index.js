import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import router from './routers/books.js'
import constants from './constants/index.js'
// подключаем модули для swagger
import swaggerUI from 'swagger-ui-express'
import swaggerJsDoc from 'swagger-jsdoc'
import options from './constants/options.js'

const app = express()
app.use(express.json())
app.use(cors())

app.use('/api/v1/book', router)

// Проинициализируем спецификации для swagger
const specs = swaggerJsDoc(options)
// создаем endpoint для swagger
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs))

const start = async () => {
    try {
        await mongoose.connect(constants.mongoUrl, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        })

        app.listen('5000', () => {
            console.log('server started...')
        })

    } catch (e) {
        console.log(e)
    }
}

start()

