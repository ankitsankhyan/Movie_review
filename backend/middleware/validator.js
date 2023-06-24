const {check,validationResult} = require('express-validator')

// making custom validator
const iiitmEmailValidator = (value) => {
    if (!value.endsWith('@iiitm.ac.in')) {
      throw new Error('Invalid email domain');
    }
    
    return true;
  };
  
module.exports.validatePassword = [check('newPassword').trim().not().isEmpty().withMessage('Password is required').isLength({min: 6}).withMessage('Password must be at least 6 characters long')];

module.exports.userValidor = [
 check('name').trim().not().isEmpty().withMessage('Name is required'),
 check('email').trim().not().isEmpty().withMessage('Email is required'), 

 check('password').trim().not().isEmpty().withMessage('Password is required')
.isLength({min: 6}).withMessage('Password must be at least 6 characters long')];

module.exports.actorValidator = [
    check('name').trim().not().isEmpty().withMessage('Name is required'),
    check('about').trim().not().isEmpty().withMessage('About is required'),
    check('gender').trim().not().isEmpty().withMessage('Gender is required'),
    check('avatar').trim().not().isEmpty().withMessage('Avatar is required'),
]


module.exports.validationHandler = (req, res, next) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) {
      
       res.json({error:errors[0].msg});
       return;
    }

    next();
}

// q:see hidden files command
// q: how to delete .git folder in bash?






