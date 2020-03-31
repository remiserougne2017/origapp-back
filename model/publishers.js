var mongoose = require('./bdd');

//publishers schema
const publishersSchema = mongoose.Schema({
    name: String,
    books : [{type: mongoose.Schema.Types.ObjectId, ref:"books"}]
})
var publishersModel = mongoose.model('publishers', publishersSchema);

module.exports = publishersModel;

