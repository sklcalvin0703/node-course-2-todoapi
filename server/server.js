var express = require('express');
var bodyParser = require('body-parser'); //take the JSON and convert it into an OBJ

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();

app.use(bodyParser.json());

//CRUD RESTFUL API

//resoruce creation
app.post('/todos', (req, res)=>{
    var todo = new Todo(
        {
           text: req.body.text
        });
    todo.save().then((doc)=>{
        res.send(doc);
    },(error)=>{
        res.status(400).send(error);
    });

});
app.listen(3000, ()=>{
    console.log('Started on Port 3000')
});

// //mnot acutually update to db
// var newTodo = new Todo({
//     text: 'Cook Dinner'
// });

// //add to mongodb
// newTodo.save().then((doc)=>{
//     console.log('saveTodo', doc);
// }), (e)=>{
//     console.log('unable to save todo');
// };

// var newTodo = new Todo({
//     text: 'Testing',
//     completed: true,
//     completedAt: 0
// });

// newTodo.save().then((doc)=>{
//     console.log(JSON.stringify(doc, undefined,2));
// }, (e)=>{
//     console.log('unable to save', e);
// });


// var newUser = new User({
//    email: 'andrew@example.com   '
// });

// newUser.save().then((doc)=>{
//     console.log('User saved', doc);
// }, (e)=>{
//     console.log('Unable to save user', e);
// });