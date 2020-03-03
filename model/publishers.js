var mongoose = require('./bdd');

//publishers schema
const publishersSchema = mongoose.Schema({
    name: String
})
var publishersModel = mongoose.model('publishers', publishersSchema);

module.exports = publishersModel;

