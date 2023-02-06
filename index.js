const express= require("express");
const {connect}=require("./config/db")
const app= express();
const {UserRouter}=require("./routers/user.router")
const {GoldRouter}=require("./routers/gold.router")
app.use(express.json())
app.get("/",(req,res)=>{
    res.send("Welcome")
})

app.use("/user", UserRouter)
app.use("/gold", GoldRouter)
app.listen(9900, async ()=>{
    try {
        await connect;
        console.log("Connected to DB")
        console.log("Server running on 9900")
    } catch (error) {
        console.log(error)
    }
})