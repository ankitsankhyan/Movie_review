const {isValidObjectId} = require('mongoose');
const PasswordResetToken = require('../Model/passwordResetToken')
const {sendError} = require('../utils/helper');
const brcrypt = require('bcryptjs');
exports.isValidPassResetToken = async (req, res, next)=>{
    const {token, userId} = req.body;
    console.log(token, userId, 'printing');
    console.log(req.body);
    if (typeof token !== 'string') {
        return sendError(res, 'Invalid token not of string type' , 400);
      }
      console.log(token, userId);
    if(!token || !token.trim() || !isValidObjectId(userId)) return sendError(res, "Invalid request!");

    const resetToken = await PasswordResetToken.findOne({owner: userId});
  
    if(!resetToken) return sendError(res, "Unauthorized access, invalid request!");
  
    const matched = await brcrypt.compare(token, resetToken.token);
    if (!matched) return sendError(res, "Unauthorized access, invalid request!");
// this sets resetToken in req object which can be used anywhere in the application
    req.resetToken = resetToken;
    next();
};