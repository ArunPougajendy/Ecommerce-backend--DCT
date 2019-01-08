const mongoose = require('mongoose');
mongoose.Promise = global.Promise;  // Telling mongoose to use the global promise available in JS

mongoose.connect('mongodb://localhost:27017/mern-weekend-ecommerce',{ useNewUrlParser: true }).then((res)=>{
    console.log('connected to db');
}).catch((err)=>{
    console.log(err);
})

module.exports = {
    mongoose
}