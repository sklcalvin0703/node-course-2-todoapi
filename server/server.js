var express = require('express');
var bodyParser = require('body-parser'); //take the JSON and convert it into an OBJ

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
var {ObjectID} = require('mongodb');

var app = express();
const port = process.env.PORT || 3000;

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

//return ALL the todos
app.get('/todos', (req, res)=>{
    Todo.find().then((todos)=>{
        res.send({
            todos
        });
    }, (err)=>{
        res.status(400).send(err);
    });
});

//GET /todos/(individual items)url parameters
app.get('/todos/:id', (req, res)=>{
    var id = req.params.id;

    //valid id using invalid
    if(!ObjectID.isValid(id)){
        return res.status(404).send();
    }

    //findByID
    Todo.findById(id).then((todo)=>{
        if(!todo){
            return res.status(404).send();
        }
        res.send({todo});
    }).catch((err)=>{
        res.status(400).send();
    });
    //sucess
    //error

});

//delete
app.delete('/todos/:id', (req,res)=>{
    var id = req.params.id;
    if(!ObjectID.isValid(id)){
        return res.status(404).send();
    }
    Todo.findByIdAndRemove(id).then((todo)=>{
        if(!todo){
            return res.status(404).send();
        }
        res.status(200).send({todo});
    }).catch((e)=>{
        res.status(400).send();
    })
});

 
app.listen(port, ()=>{
    console.log(`Started on Port ${port}`);
});

module.exports = {
    app
}

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