var mongoose = require('mongoose')

var options = {
    connectTimeoutMS: 6000,
    useNewUrlParser: true,
    useUnifiedTopology: true
}
mongoose.connect('mongodb+srv://admin:n6r8JASafZRpOd8E@cluster0-7ujnb.gcp.mongodb.net/test?retryWrites=true&w=majority',
    options,
    function(err) {
        console.log(err);
    }
);

module.exports = mongoose;