const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// var id = '5c35b174f6a62a3dc42b577511';

// if (!ObjectID.isValid(id)){
//     console.log('ID not valid');
// }

// Todo.find({
//     _id: id
// }).then((todos)=>{
//     console.log('Todos', todos);
// });

// Todo.findOne({
//     _id: id
// }).then((todo)=>{
//     console.log('Todo', todo);
// });

// Todo.findById(id).then((todo)=>{
//     if(!todo){
//         return console.log('ID not found');
//     }
//     console.log('Todo By ID', todo);
// }).catch((e)=> console.log(e));
var id = '5c34bfc04fbeb335839b3228';
User.findById(id).then((user)=>{
    if(!user){
        return console.log('ID not found');
    }
    console.log('User By ID', JSON.stringify(user,undefined,2));
});
