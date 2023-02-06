const mongoose=require("mongoose");

const userScema=mongoose.Schema({
    name:String,
    email:String,
    role:{type:String, enum:["customer", "manager"],default:"customer"},
    password:String
})

const UserModel=mongoose.model("user", userScema);

module.exports={
    UserModel
}