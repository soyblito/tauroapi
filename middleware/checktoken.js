let jwt = require('jsonwebtoken');
const config = require('../config/auth.config');

let checkToken = (req,res,next) => {
  let token = req.headers.authorization; 
  token = token.slice(7, token.length);
  if (token) {
    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        //console.log("err",err);
        return res.json({
          success: false,
          message: 'Token is not valid'
        });
      } else {
        req.decoded = decoded;
        //next();
        return res.json({
          success: true,
          message: 'Token valid'
        });
      }
    });
  } else {
    return res.json({
      success: false,
      message: 'Auth token is not supplied'
    });
  }
};

module.exports = {
  checkToken: checkToken
}