//install cryptojs
const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');


var data = {
    id: 10
};

var token = jwt.sign(data, '123abc'); //create hash 
console.log(token);
// jwt.verify
var decoded = jwt.verify(token, '123abc'); 
console.log('decoded', decoded);

// var message = 'I am user no 3';

// var hash = SHA256(message).toString();
// //one way algorithm**

// console.log(`message: ${message}`);
// console.log(`hash: ${hash}`);

// var data = {
//     id: 4
// };
// var token ={
//     data,
//     hash: SHA256(JSON.stringify(data) + 'somescret').toString()
// };


// token.data.id = 5;
// token.hash = SHA256(JSON.stringify(token.data)).toString();

// var resulthash = SHA256(JSON.stringify(data)+'somesecret').toString();

// if (resulthash === token.hash){
//     console.log('data was not changed');
// }else{
//     console.log('data was changed. do not trust')
// }