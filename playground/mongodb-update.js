// const MongoClient = require('mongodb').MongoClient;
const {MongoClient,ObjectID} = require('mongodb'); //same as the code above



// var user = {name: 'andrew', age:25};
// var {name} = user; //object destruction

MongoClient.connect('mongodb://localhost:27017/TodoApp',{useNewUrlParser: true} ,(err, client)=>{
    if (err){
        return console.log('Unable to connect to mongodb server');
    } 
    console.log('Connected to MongoDB server');
    const db = client.db('TodoApp');

    // db.collection('Todos').findOneAndUpdate({_id: new ObjectID('5c2e31a41aed6f341df3ef98')}, {$set: {
    //     completed: true
    // }}, {
    //     returnOriginal: false
    // }).then((result)=>{
    //     console.log(result);
    // });

    db.collection('Users').findOneAndUpdate({_id: new ObjectID('5c2dc5d57d03c61be85f0b65')}, {
        $set: {name: 'June'},
        $inc: {age: 1}
    }, {returnOriginal: false}).then((result)=>{
        console.log(result);
    });


    //client.close();
});

//mongoose - object relational mapping NPM library