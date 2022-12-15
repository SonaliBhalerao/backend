const jwt = require('jsonwebtoken');
require('dotenv').config();

const authentication = (req, res, next)=>{
    if(!req.headers.authorization){
        return res.send("please login");
    }
    const user_token = req.headers.authorization.split(" ")[1];
    jwt.verify(user_token, "secret", function(err, decoded){
        if(err){
            return res.send("please login");
        }
        req.body.email = decoded.email;
        req.body.userId = decoded.userId;
        next();
    })
}


// const authentication = (req,res,next)=>{
//     var bearer = req.headers["authorization"];
//     //console.log(bearer);
//     if(bearer){
//         bearer = bearer.split(" ");
//         let token = bearer[1];
//         if(!token){
//             return res.status(401).send({
//                 message:"Please login to continue."
//                });
//         }else{
//             let SECRET = process.env.jwt_secret_key;
//             try{

//                 var decoded = jwt.verify(token, SECRET);
//                 console.log("decoded", decoded._id);
//                 if(decoded){
//                     console.log("user = id added");
//                     req.body.user = decoded._id;
//                     next();
//                 }else{
//                     return res.status(401).send({
//                         message:"Please login to continue."
//                        });
//                 }
//             }catch(err){
//                 if(err.expiredAt && err.expiredAt< new Date()){
//                     return res.status(401).send({
//                       message:"Session expired."
//                     })
//                   }else{
//                     return res.status(401).send({
//                      message:"Please login to continue."
//                     })
//                 }
//             }
//         }
//     }else{
//         return res.status(401).send({
//             message:"Please login to continue."
//            });
//     }
// }

module.exports = authentication;