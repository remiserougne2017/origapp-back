var mongoose = require('./bdd');


const commentsSchema = mongoose.Schema({
    userId:[{type: mongoose.Schema.Types.ObjectId, ref:"users"}],
    idBook:[{type: mongoose.Schema.Types.ObjectId, ref:"books"}],
    userRating: Number,
    comment: String,
})

var commentsModel = mongoose.model('comments', commentsSchema);

module.exports = commentsModel;