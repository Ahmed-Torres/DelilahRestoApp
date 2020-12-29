const JWT = require('jsonwebtoken')

module.exports = (req, res, next) =>{
    try {
        let token = req.cookies["token"];
        if (!token) {
            return res.status(401).send("token falso");
        }
        let verifyToken = JWT.verify(token, process.env.SECRET);

        if (verifyToken) {
            req.user = verifyToken;
            next();
        }
    } catch (error) {
        res.status(400).send("Error validando el usuario" + error);
    } 
}

