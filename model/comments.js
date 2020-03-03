var mongoose = require('./bdd');


const commentsSchema = mongoose.Schema({
    pseudo:[{type: mongoose.Schema.Types.ObjectId, ref:"users"}] ,
    userRating: Number,
    comment: String
})

var commentsModel = mongoose.model('comments', commentsSchema);

module.exports = commentsModel;