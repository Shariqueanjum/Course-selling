
const jwt = require('jsonwebtoken');

const User=require("../mongodb/models/users")


const secretKey = "superS3cr3t1";

const generateJwt = (user) => {
    console.log(user)
    const payload = { username: user.username, };
   // console.log(payload,"iam payload");

    return jwt.sign(payload, secretKey, { expiresIn: '1h' });
  };








const authenticateJwt =async(req,res,next)=>{

    const {authorization}=req.headers;
    await User.find({})
    .then(data=>console.log("All users in Db"))

    if(authorization){
      const token=authorization.split(" ")[1];
      jwt.verify(token,secretKey,(err,user)=>{
        if(err){
            res.status(404).json({messgae:"Not Authorized :))"})
        }else{
            req.user=user;
            next();
        }
      })
    }else{
        res.status(401).json({message:"You are not authorized :)"})
    }

}


module.exports = {
    authenticateJwt,
    generateJwt
}