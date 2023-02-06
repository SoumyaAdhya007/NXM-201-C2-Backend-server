const mongoose= require("mongoose");

const connect= mongoose.connect("mongodb+srv://soumya:soumya@cluster0.ezxms.mongodb.net/goldshop?retryWrites=true&w=majority");

module.exports={
    connect
}