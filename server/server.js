require('./config/config');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser'); //take the JSON and convert it into an OBJ

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
const {ObjectID} = require('mongodb');
var {authenticate} = require('./middleware/authenticate');

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

//update
app.patch('/todos/:id', (req,res) =>{
    var id = req.params.id;
    var body = _.pick(req.body, ['text', 'completed']); //pick these two prop to body

    if(!ObjectID.isValid(id)){
        return res.status(404).send();
    }

    if(_.isBoolean(body.completed) && body.completed){
        body.completedAt = new Date().getTime(); //return JS timestamp

    }else{
        body.completed = false;
        body.completedAt = null;
    }
    Todo.findByIdAndUpdate(id, {$set:body}, {new: true}).then((todo)=>{
        if(!todo){
            return res.status(404).send();
        }
        res.send({todo});
    }).catch(()=>{
        res.status(400).send();
    })
});

// POST /user
app.post('/users', (req,res)=>{
    var body = _.pick(req.body,['email','password']);

    var user = new User({
        email: body.email,
        password: body.password
    });

    user.save().then(()=>{
        return user.generateAuthToken();
    }).then((token)=>{
        res.header('x-auth', token).send(user); //create custom header
    }).catch((e)=> {
        res.status(400).send(e);
    })

});

app.get('/users/me', authenticate, (req,res)=>{
    res.send(req.user);
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