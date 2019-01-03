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

    //find act as a cursor (pointer)
    //find({_id: '5c2dc4314b588b1be130857a'}) not work since it is not a string
    // db.collection('Todos').find({_id: new ObjectID('5c2dc4314b588b1be130857a')}).toArray().then((docs)=>{
    //     console.log('Todos');
    //     console.log(JSON.stringify(docs, undefined, 2));
    // }, (err) =>{
    //     console.log('unable to fetch todos', err);
    // });

    db.collection('Todos').find().count().then((count)=>{
        console.log(`Todos count: ${count}`);
    }, (err) =>{
        console.log('unable to fetch todos', err);
    });

    db.collection('Users').find({name: 'Calvin So'}).toArray().then((docs)=>{
        console.log('Users');
        console.log(JSON.stringify(docs, undefined, 2));
    }, (err)=>{
        console.log('unable to fetch', err);
    });

    //client.close();
});