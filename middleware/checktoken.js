let jwt = require('jsonwebtoken');
const config = require('../config/auth.config');

let checkToken = (req,res) => {
  // return res.json({
    //   success: "change 4",
    //   message2: req.headers,
    // });
  
  //let token = req.headers.authorization; 
  let token = req.headers['authorization'];
  token = token.slice(7, token.length);
  if (token) {
    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        return 'Token is not valid'
        //console.log("err",err);
        // return res.json({
        //   success: false,
        //   message: 'Token is not valid'
        // });
      } else {
        //req.decoded = decoded;
        return 'Token valid'
        //next();
        // return res.json({
        //   success: true,
        //   message: 'Token valid'
        // });
      }
    });
  } else {
    return 'Auth token is not supplied'
    // return res.json({
    //   success: false,
    //   message: 'Auth token is not supplied'
    // });
  }
  
};

module.exports = {
  checkToken: checkToken
}