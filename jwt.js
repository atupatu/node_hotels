const jwt = require("jsonwebtoken");

const jwtAuthMiddleware = (req ,res ,next) =>{
    
    //Extract jwt token from the request header
    const token = req.headers.authorization.split(' ')[1];
    if(!token) return res.status(401).json({error: 'Unauthorised'});

    try{
        //Verify the JWT toekn
        const decoded = jwt.verify(token ,process.env.JWT_SECRET);

        //Attach user infocmation to the requested object
        req.user = decoded;
        next();
    }catch(err){
        console.error(err);
        res.status(401).json({error: 'Invalid Token'});
    }
}

const generateToken = (userData)=>{
    return jwt.sign(userData, process.env.JWT_SECRET)
}
module.exports = {jwtAuthMiddleware,generateToken}