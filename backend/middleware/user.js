const {isValidObjectId} = require('mongoose');
const PasswordResetToken = require('../Model/passwordResetToken')
const {sendError} = require('../utils/helper');
const brcrypt = require('bcryptjs');
exports.isValidPassResetToken = async (req, res, next)=>{
    const {token, userId} = req.body;
    if (typeof token !== 'string') {
        return sendError(res, 400, 'Invalid token');
      }
    if(!token || !token.trim() || !isValidObjectId(userId)) return sendError(res, "Invalid request!");

    const resetToken = await PasswordResetToken.findOne({owner: userId});
    if(!resetToken) return sendError(res, "Unauthorized access, invalid request!");
    console.log(resetToken);
    const matched = await brcrypt.compare(token, resetToken.token);
    if (!matched) return sendError(res, "Unauthorized access, invalid request!");
// this sets resetToken in req object which can be used anywhere in the application
    req.resetToken = resetToken;
    next();
};