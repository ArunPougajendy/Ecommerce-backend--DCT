const { User } = require('../models/user');

const authenticateUser = (req,res,next) => {
    const token = req.header('x-auth')
    User.findByToken(token).then((user)=>{
        req.user = user
        req.token = token
        next()
    }).catch((err) =>{
        res.send({
            notice: err
        })
    })
} 

const authorizeUser = (req,res,next) =>{
    const currentUser = req.user
    if(currentUser.role == 'admin') {
        next()
    } else {
        res.status(403).send({
            notice: 'Access Denied'
        })
    }
}

module.exports = {
    authenticateUser,
    authorizeUser
}