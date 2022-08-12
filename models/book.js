import mongoose from "mongoose"

const Book = new mongoose.Schema({
    autor: { type: String },
    title: { type: String },
    price: { type: String },
})

export default mongoose.model('Book', Book)

