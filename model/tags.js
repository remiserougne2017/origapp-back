var mongoose = require('./bdd');

//schema mongoDB
var tagsSchema = mongoose.Schema({
    name: String,
});

var tagsModel = mongoose.model('tags', tagsSchema);

module.exports = tagsModel;