const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcrypt');

var UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        unique: true, //do not duplicate
        validate:{ //custom validation for email
            validator: validator.isEmail,
            message: '{VALUE} is not a valid email'
        }
    },
    password:{
        type: String,
        require: true,
        minlength: 6
    },
    //only for mongodb
    tokens: [{
        access: {
            type: String,
            required: true
        },
        token:{
            type: String,
            required: true
        }
    }]
});

//override the methods toJSON
UserSchema.methods.toJSON = function() {
    var user = this;
    var userObject = user.toObject();
    return _.pick(userObject, ['_id', 'email']);
};
//instance method
UserSchema.methods.generateAuthToken = function () {
    var user = this;
    var access = 'auth';
    var token = jwt.sign({_id: user._id.toHexString(), access}, 'abc123').toString();

    user.tokens = user.tokens.concat([{access, token}]);

   return user.save().then(()=>{
        return token;
    });
};

UserSchema.methods.removeToken = function (token) {
    var user = this;

    return user.update({
        $pull: { //pull out something matched
            tokens: {
                token: token
            }
        }
    })
};

//model method
UserSchema.statics.findByToken = function(token){
    var User = this;
    var decoded;
    
    try{
        decoded = jwt.verify(token, 'abc123');
    }catch (e){
        // return new Promise((resolve,reject) =>{
        //     reject();
        // });
        return Promise.reject();
    }
    return User.findOne({
        _id: decoded._id,
        'tokens.token': token,
        'tokens.access': 'auth'
    });
};

UserSchema.statics.findByCredentials = function (email, password) {
    var user = this;
    return user.findOne({email}).then((user)=>{
        if((!user)){
            return Promise.reject('no user found');
        }
        return new Promise((resolve,reject)=>{
            bcrypt.compare(password, user.password, (err, res)=>{
                if(res){
                    resolve(user);
                }else{
                    reject('wrong pw');
                }
            })
        })
        
});
};

UserSchema.pre('save', function (next){
    var user = this;
    if(user.isModified('password')){
        bcrypt.genSalt(10, (err, salt)=>{
            bcrypt.hash(user.password, salt, (err,hash)=>{
                user.password = hash;
                next();
            })
        })
    }else{
        next();
    }
});


var User = mongoose.model('User', UserSchema);

module.exports = {
    User
};
