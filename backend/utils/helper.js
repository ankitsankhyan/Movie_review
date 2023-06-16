const crypto = require('crypto')

module.exports.sendError = (res, err, statusCode = 401)=>{
    res.status(statusCode).json({err});
}


module.exports.generateRandomByte = ()=>{
    return new Promise((resolve, reject)=>{
        crypto.randomBytes(30,(err, buff)=>{
            if(err) reject(err);
            const buffString = buff.toString("hex");
            resolve(buffString);
        })
    })
}

