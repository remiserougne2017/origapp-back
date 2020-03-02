var mongoose = require('./bdd');

//Contenu schema
const contentSchema = mongoose.Schema({
    title: String,
    pageNum: String,
    status: Boolean
})

//media schema
const mediaSchema = mongoose.Schema({
    type: String,
    title: String,
    source: String,
    texte: String,
    duration: Number
})

//Books Schema
const booksSchema = mongoose.Schema({
    isbn: String,
    image: String,
    title: String,
    description: String,
    authors: String,
    illustrators: String,
    year_publishing: String,
    type: String,
    category: {type: mongoose.Schema.Types.ObjectId, ref:"tags"},
    status: Boolean,
    modificationDate: String,
    rating: String,
    votesCount: Number,
    viewsCount: Number,
    content: [contentSchema],
    media: [mediaSchema],
    publisher: {type: mongoose.Schema.Types.ObjectId, ref:"publishers"},

})

var booksModel = mongoose.model('books', booksSchema);

module.exports = booksModel;