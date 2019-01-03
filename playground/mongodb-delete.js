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

    //delete many
    // db.collection('Todos').deleteMany({text: 'Eat lunch'}).then((result)=>{
    //     console.log(result);
    // });    

    //delete one (the first items)
    // db.collection('Todos').deleteOne({text: 'Eat lunch'}).then((result)=>{
    //     console.log(result);
    // });

    //find one to delete
    // db.collection('Todos').findOneAndDelete({completed: false}).then((result)=>{
    //     console.log(result);
    // });
    // //client.close();

    // db.collection('Users').deleteMany({name: 'Calvin So'}).then((result)=>{
    //     console.log(result);
    // });

    db.collection('Users').findOneAndDelete({_id: new ObjectID('5c2dc5e9d100021bea0318c2')}).then((result)=>{
        console.log(result);
    });


});