const express=require("express");
const {UserModel}=require("../model/user.model");
const fs= require("fs")
const UserRouter=express.Router();

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

UserRouter.post("/signup", async(req,res)=>{
    try {
        const {name,email,role,password}=req.body;
        bcrypt.hash(password, 4, async(err, hash_pas)=>{
            if(err){
                console.log(err)
            }else{
                const user=new UserModel({
                    name,
                    email,
                    role,
                    password:hash_pas
                })
                await user.save();
                res.status(201).send("Signup successfully")
            }
        })
    } catch (error) {
        res.status(501).send({msg:error})
    }
})

UserRouter.post("/login", async(req,res)=>{
    const {email,password}=req.body;
    try {
        const user= await UserModel.find({email});
        const hash_pass=user[0].password;
        if(user.length>0){
            bcrypt.compare(password, hash_pass, (err, result)=>{
                if(result){
                    const token= jwt.sign({userId:user[0]._id, role:user[0].role}, "soumya",{expiresIn:60})
                    const refresh_token= jwt.sign({userId:user[0]._id}, "refersh_soumya",{expiresIn:60*5})
                    // console.log(token,refresh_token)
                    res.status(201).send({msg:"Login Succesfully",token:token,refresh_token:refresh_token})
                }else{
                    res.status(201).send("Wrong Credentails")
                }
            })
        }else{
            res.status(201).send("User Not Found")
        }
    } catch (error) {
        res.status(501).send({msg:error})
        
    }
})

UserRouter.get("/logout", async(req,res)=>{
    try {
        const token= req.headers.authorization;
        const blaclistData= JSON.parse(fs.readFileSync("./blacklist.json", "utf-8"))
        blaclistData.push(token);
        fs.writeFileSync("./blacklist.json", JSON.stringify(blaclistData));
        res.status(201).send("Logged out successfully")
    } catch (error) {
        res.status(501).send({msg:error})
    }
})

UserRouter.get("/newtoken", async(req,res)=>{
    let refresh_token=req.headers.authorization
    try {
        if(!refresh_token){
            res.status(201).send("Please LOgin Again")
        }else{
            jwt.verify(refresh_token, "refersh_soumya", (err, decoded)=>{
                if(err){
                    res.send({msg:err})
                }else{
                    const token= jwt.sign({userId:decoded.userId, role:decoded.role}, "soumya",{expiresIn:60})
                    res.status(201).send({msg:"Login successsully", token:token})
                }
            })
        }
    } catch (error) {
        res.status(501).send({msg:error})
    }
})
module.exports={
    UserRouter
}