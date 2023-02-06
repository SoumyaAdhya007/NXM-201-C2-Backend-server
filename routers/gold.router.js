const express=require("express");

const {auntentication}=require("../middleware/authentication.middlewere");
const {authorization}=require("../middleware/authorization.middleware")
const GoldRouter=express.Router();
GoldRouter.use(auntentication);


GoldRouter.get("/goldrate", authorization(["customer"]), (req,res)=>{
    try {
        res.status(201).send("Today Gold Price 40,000")
    } catch (error) {
        res.status(501).send({"msg":error})
    }
} )

GoldRouter.get("/userstats",authorization(["manager"]), (req,res)=>{
    try {
        res.status(201).send("Welcome Manager")
    } catch (error) {
        res.status(501).send({"msg":error})
        
    }
})

module.exports={
    GoldRouter
}