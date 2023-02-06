const authorization=(roleArr)=>{
    return (req,res,next)=>{
        const userRole= req.body.role;
        if(roleArr.includes(userRole)==true){
            next()
        }else{
            res.status(201).send("Not Authorized")
        }
    }
}
module.exports={
    authorization
}