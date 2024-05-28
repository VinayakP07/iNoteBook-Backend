const jwt = require('jsonwebtoken');

const shhh = "Ye Mera Area Hai Aur Main Is Area Ka Jaikant Shikre";

const fetchUser = (req, res, next) =>{
    const token = req.header('auth_token');
    if(!token){
        res.json({error : "Enter valid token"});
    }
    try {
        let data = jwt.verify(token, shhh);
        req.user = data;
        next();
    } catch (e) {
        console.log(e);
        res.json({error : "Enter valid token"});
    }
}

module.exports = fetchUser;