var mongoose = require('mongoose');

//connecting to the database
mongoose.Promise = global.Promise; //set up to use PRomise
mongoose.connect(process.env.MONGODB_URI);

module.exports = {
    mongoose
};

