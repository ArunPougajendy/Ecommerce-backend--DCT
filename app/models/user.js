const mongoose = require('mongoose');
const validatePackage = require ('validator');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;
const jwt = require('jsonwebtoken');

const { cartLineItemSchema } = require('./cart_line_item');

const userSchema = new Schema({
  username: {
      type: String,
      required: true,
      minlength: 4,
      maxlength: 24,
      unique: true,
      trim: true
  },
  password: {
      type: String,
      required: true,
      minlength: 8,
      maxlength: 128,
      trim: true
  },
  email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      validate: { //defined yoyr cistom validation for a field
          validator: function(value) {
              return validatePackage.isEmail(value);
          },
          message: function(){
              return 'invalid email format'
          }
       }
      
      //Custom validation required
  },
  mobile: {
      type: String,
      required: true,
      unique: true,
      minlength: 10,
      maxlength: 10,
      trim: true,
      //custom Validation
      validate: {
          validator: function(value){
              return validatePackage.isNumeric(value);
          },
          message: function(){
              return 'invalid number format'
          }
      }
  },
  tokens: [
      {
          token: {
              type: String
          }
      }
  ],
  cartLineItems: [cartLineItemSchema],
  role: { 
      type: String,
      enum: ['customer','admin'],
      default: 'customer'
  }
})
//npm install --save bcryptjs

//mongoose middleware funciton - pre hooks op post hooks

userSchema.pre('save',function(next){
    let user = this
    if(user.isNew){
        User.countDocuments().then((count)=>{
            if(count == 0 ){
                user.role = 'admin'
            }
            next()
        })
    } else {
        next()
    }
})

userSchema.pre('save',function(next){
    let user = this;
    if (user.isNew){
        bcrypt.genSalt(10).then(function(salt){
            bcrypt.hash(user.password,salt).then(function(encrypted){
                user.password= encrypted;
                next();
            })
        })
    } else {
        next()
    }
})

// userSchema.statics.findByCredentials = function (email, password) {
//     let User = this;
//     return User.findOne({email: email}). then(function(user){
//         if(!user){
//             return Promise.reject('invalid email or password');
//         }

//         return bcrypt.compare(password,user.password).then(function(result){
//             if(result) 
//                 return Promise.resolve(user)
//             else
//                 return Promise.reject("invalid email or password");
//         })
//     })
// }

userSchema.statics.findByCredentials = function (email, password) {
    let User=this;
    return User.findOne({email: email}).then(function (user) {
        if(!user) {
            return Promise.reject('Invalid Email or Password')
        }

        // return new Promise (function () {
        //     bcrypt.compare
        // })

        return bcrypt.compare(password, user.password).then(function (result) {
            if(result) {
                return Promise.resolve(user);
            } else {
                return Promise.reject('invalid email or password');
            }
        })
    })
}
userSchema.methods.generateToken = function () {
    const user = this
    const tokenData = {
        userId: user._id
    }
    const token = jwt.sign(tokenData,'supersecret');
    user.tokens.push({
        token //ES6 concise property
    })
    return user.save().then((user) =>{
        return Promise.resolve(token);
    })
}

userSchema.statics.findByToken = function(token){
    let User = this 
    let tokenData 
    try {
        tokenData = jwt.verify(token, 'supersecret')
    } catch (e) {
        return Promise.reject(e)
    }

    return User.findOne({
        '_id': tokenData.userId,
        'tokens.token': token
    })

}


const User = mongoose.model('user', userSchema);

module.exports = {
    User
}