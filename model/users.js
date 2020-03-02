var mongoose = require('./bdd');


//schema mongoDB
var usersSchema = mongoose.Schema({
    firstName: String,
    email: String,
    pwd:String,
    salt:String,
    token:String,
    myLibrairy: [{type: mongoose.Schema.Types.ObjectId, ref:"books"}],
    lastRead: [{type: mongoose.Schema.Types.ObjectId, ref:"books"}]

});

// Model
var usersModel = mongoose.model('users', usersSchema);

module.exports = usersModel;