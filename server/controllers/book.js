import Book from "../models/book.js"

class BookController {

    async add(req, res) {
        try {
            const { title, autor, price } = req.body
            const _id = String(Date.now())
            console.log(_id)
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
            Book.watch([{ $match: { _id: id } }]).on('change', (data) => {
                console.log(data)
                res.json(data)
            })

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
}

export default new BookController()