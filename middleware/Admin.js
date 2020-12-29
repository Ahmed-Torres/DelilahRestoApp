const JWT = require('jsonwebtoken')
const User = require('../models/User');

module.exports = async (req, res, next)=>{
    try {
        const cookies  = req.cookies;
        if ('token' in cookies) {
          const token = cookies.token;
          const decoded = JWT.verify(token, process.env.SECRET);
          console.log(decoded);
          let isAdmin = await User.findOne({
            where: {email: decoded.email, is_admin:true },
          });
          if (isAdmin) {
            next();
          } else {
            res.status(403).json({ message: 'Acceso prohibido' });
          }
        }
      } catch (error) {
        return res.status(401).json({
          message: 'Autenticación fallida',
          error: error,
        });
      }
    };
