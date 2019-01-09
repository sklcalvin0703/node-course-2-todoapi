const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// Todo.remove({}).then((result)=>{
//     console.log(result);
// });

//Todo.findOneAndRemove will return the doc
//Todo.findByIdAndRemove    will return the doc

Todo.findByIdAndRemove('5c361aff1aed6f341df42555').then((todo)=>{
    console.log(todo);
});
