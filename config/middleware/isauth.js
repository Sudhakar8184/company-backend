const jwt = require('jsonwebtoken');
var secret = process.env.secret;
const Mongoose = require('mongoose')
var User = Mongoose.model('Users')
var authenticate = async (req, res, next) => {
    try {
        let token;
        token = req.headers['authorization']
        const decoded = jwt.verify(token, secret);
  
         let user = await User.findById(decoded.id)
         if(user){
            req.user = decoded;
             next()
         }else{
            res.json({success:false})
         }
      
       
    } catch (error) {
        return res.status(401).json({
            success:false,
            message: 'Auth Failed'
        });
    }
}

module.exports = authenticate;