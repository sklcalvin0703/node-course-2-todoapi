var mongoose = require('mongoose');

//connecting to the database
mongoose.Promise = global.Promise; //set up to use PRomise
mongoose.connect('mongodb://localhost:27017/TodoApp');

module.exports = {
    mongoose
};