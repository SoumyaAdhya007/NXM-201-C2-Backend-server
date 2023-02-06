const jwt= require("jsonwebtoken");

const auntentication=(req,res,next)=>{
    const token=req.headers.authorization;
    console.log(token)
    if(token){
        try {
            const decode= jwt.verify(token, "soumya");
            if(decode){
                const role=decode.role;
                console.log(role)
                req.body.role=role;
                next()
            }else{
                res.status(201).send("Login first")
            }
        } catch (error) {
            res.status(501).send("Login first")
            
        }
    }else{
        res.status(201).send("Login first")
    }
}
module.exports={
    auntentication
}