const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    isbn: {
        type: String
    },
    pageCount: {
        type: Number,
        min: 1
    },
    date: {
        type: String
    },
    thumbnailUrl: {
        type: String,
        required: true
    },
    shortDescription: {
        type: String
    },
    longDescription: {
        type: String
    },
    authors: {
        type: [String],
        required: true
    },
    categories: {
        type: [String]
    },
    available: {
        type: Boolean,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    }
})

module.exports = mongoose.model('Book', bookSchema)