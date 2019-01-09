// const MongoClient = require('mongodb').MongoClient;
const {MongoClient} = require('mongodb'); //same as the code above
var user = {name: 'andrew', age:25};
var {name} = user; //object destruction
console.log(name);
MongoClient.connect(process.env.MONGODB_URI ||'mongodb://localhost:27017/TodoApp', (err, client)=>{
    if (err){
        return console.log('Unable to connect to mongodb server');
    }
    console.log('Connected to MongoDB server');
    const db = client.db('TodoApp');

    // db.collection('Todos').insertOne({
    //     text: 'something to do',
    //     completed: false
    // }, (err, result)=>{
    //     if(err){
    //         return console.log('Unable to insert todo');
    //     }
    //     console.log(JSON.stringify(result.ops, undefined, 2));
    // });

    //Insert new doc into Users (name, age, location)
    // db.collection('Users').insertOne({
    //     _id: 123,
    //     name: 'Calvin So',
    //     age: 22,
    //     location: 'Tsuen Wan'
    // }, (err, result)=>{
    //     if(err){
    //         return console.log('unable to insert user');
    //     }
    //     //console.log(JSON.stringify(results.ops, undefined, 2));
    //     console.log(result.ops[0]._id.getTimestamp());
    //     //the obj id are make up of three elements, timestamps (4 bytes), ... 
    // });

    client.close();
});