var mongoose = require('./bdd');

//Commentaires
const commentsSchema = mongoose.Schema({
    userId:[{type: mongoose.Schema.Types.ObjectId, ref:"users"}],
    userRating: Number,
    comment: String,
})

//media schema
const mediaSchema = mongoose.Schema({
    type: String,
    title: String,
    source: String,
    texte: String,
    duration: Number
})

//Contenu schema
const contentSchema = mongoose.Schema({
    title: String,
    imageContent:String,
    pageNum: String,
    status: Boolean,
    media: [mediaSchema],

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
    category: [{type: mongoose.Schema.Types.ObjectId, ref:"tags"}],
    status: Boolean,
    modificationDate: String,
    rating: String,
    votesCount: Number,
    viewsCount: Number,
    content: [contentSchema],
    publisher: {type: mongoose.Schema.Types.ObjectId, ref:"publishers"},
    comments: [commentsSchema]
})

var booksModel = mongoose.model('books', booksSchema);

module.exports = booksModel;