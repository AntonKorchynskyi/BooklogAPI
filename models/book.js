const mongoose = require("mongoose");

const booksSchemaDefinition = {
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
    },
    genre: {
        type: String,
    },
    startDate: {
        type: Date,
    },
    completionDate: {
        type: Date,
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 10,
    },
    review: {
        type: String,
    },
};

// create new mongoose schema using the definition object
var booksSchema = new mongoose.Schema(booksSchemaDefinition);

// create new mongoose model using the schema object
module.exports = mongoose.model('Book', booksSchema);