import Book from "../models/book.js"

class BookController {

    async add(req, res) {
        try {
            const { title, autor, price } = req.body
            const _id = String(Date.now())
            const book = await Book.create({
                _id,
                title,
                autor,
                price
            })

            book.save()
            res.json(book)
        } catch (e) {
            console.log(e)
        }
    }

    async getAll(_req, res) {
        try {
            const books = await Book.find()

            res.json({ data: books })
        } catch (e) {
            console.log(e)
        }
    }

    async getOne(req, res) {
        try {
            const { id } = req.params
            const book = await Book.findById(id)
            if (!book) return res.statu(404).json('not found')
            res.json(book)
        } catch (e) {
            console.log(e)
        }
    }

    async update(req, res) {
        try {
            const { id } = req.params
            const body = req.body

            await Book.findByIdAndUpdate(id, {
                ...body
            })

            res.json('success')
        } catch (e) {
            console.log(e)
        }
    }

    async subscribe(req, res) {
        const pipeline = [{ $match: { operationType: 'insert' } }]
        Book.watch(pipeline).on('change', (data) => {
            console.log(data.fullDocument)
            res.json(data.fullDocument)
        })
    }
}

export default new BookController()