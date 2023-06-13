const crypto = require('crypto')

module.exports.sendError = (res, err, statusCode = 401)=>{
    res.status(statusCode).json({err});
}


module.exports.generateRandomByte = ()=>{
    return Promise.all((resolve, reject)=>{
        crypto.randomBytes(30,(err, buff)=>{
            if(err) return err;
            const buffString = buff.toString("hex");
            resolve(buffString);
        })
    })
}


