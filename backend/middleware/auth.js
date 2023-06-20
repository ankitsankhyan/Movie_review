const User = require('../Model/user');
const jwt = require('jsonwebtoken');
exports.isAuth = async (req, res, next) => {
    const token = req.headers?.authorization;
    console.log('running');
    const jwtToken = token.split(' ')[1];
    if(!jwtToken){ return sendError(res,401,'No token found')};
  const decode = jwt.verify(jwtToken, process.env.JWT_SECRET);
    if(!decode) return sendError(res,401,'Invalid token');
    const {userId} = decode;
    const user = await User.findById(userId);
    if(!user) return sendError(res,401,'Invalid token');
    req.user = user;
    next();
}