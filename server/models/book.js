import mongoose from "mongoose"

const Book = new mongoose.Schema({
    _id: { type: String },
    autor: { type: String },
    title: { type: String },
    price: { type: String },
})

export default mongoose.model('Book', Book)

