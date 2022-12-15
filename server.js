const express = require("express");
const app = express();
const bcrypt = require("bcryptjs");
require("dotenv").config;
const cors = require('cors');
const authentication = require("./Middleware/authentication")
const jwt = require("jsonwebtoken")
const {UserModel} = require("./Models/User.model")
const userRoutes = require('./Routes/User.Route');

const {connection} = require("./db.js");
const PORT = process.env.PORT || 8000

app.use(cors());
app.use(express.json());

app.get("/", async(req, res)=>{
    res.send("Homepage")
});

app.use("/user",userRoutes);

app.post("/emicalculator",  async(req, res)=>{
    const {amount, interest, tenure} = req.body;
    console.log(amount, interest, tenure);
    const R = (interest/12/100);
    const a = amount*R;
    const b = 1+R*tenure;
    const EMI = a*b/(b-1);
    const total = EMI * tenure;
    const InterestPayable = total - amount;
    res.send({'EMI': EMI, "InterestPayable": InterestPayable,
    "TotalPayment": total,})
})
app.listen(PORT, async()=>{
    try{
         await connection;
        console.log("connected to db successfully");
    }catch(err)
    {
        console.log(err)
    }
    console.log("server is started on 8000");
})