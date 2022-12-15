const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebToken");
const { UserModel }= require("../Models/User.model");
const authentication = require("../Middleware/authentication");

const userRoutes = express.Router();

userRoutes.post("/signup",async(req, res)=>{
    const { name, email, password } = req.body;
    await bcrypt.hash(password, 8, function(err, hash){
        if(err){
            return res.send("Signup failed")
        }
        const user = new UserModel({name, email, password:hash})
        user.save();
        return res.send("Signup Successful!");
    })
});

userRoutes.post("/login", async(req, res)=>{
    const {email, password} = req.body;

    const user = await UserModel.findOne({email});
    const new_password = user.password;

    await bcrypt.compare(password, new_password, function(err, result){
        if(err){
            return res.send("Please Login");
        }
        if(result){
            const token = jwt.sign(
                {email:user.email, _id:user._id},
                "secret"
            );
            if(user.length === 0){
                return res.send("Invalid Credentials");
            }
            return res.send({message:"Login Successful!", token: token});
        }
        else{
            return res.send("Invalid Credentials");
        }
    })
})

userRoutes.get("/profile",authentication, async(req,res)=>{
    //const id = req.params.id;
    // const {email}=req.body;
    // const userToken = req.headers.authorization;
    // jwt.verify(userToken, "secret", function(err, decoded){
    //     if(err){
    //         return res.send("Please Login");
    //     }
    // });
    // try{
    //     const user = await UserModel.find({id: id});
    //     return res.send(user);
    // }catch(err)
    // {
    //     console.log(err);
    // }
    // //console.log(email)
    // const user = await EmiModel.find({email:email})
    // res.send({"message": user})
    res.send("Hi")
})

userRoutes.post("/emicalculator",async(req,res)=>{
    const {email,loan,annual,month}=req.body;
    
    let rate=annual/12/100
    let EMI= Math.trunc(loan*rate*(month+(rate*month))/((month+rate)-1))
    const data=await EmiModel.create({
        email,loan,annual,month,EMI
    })
    res.send({"message":EMI})
})
module.exports = userRoutes;