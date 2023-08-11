const { check, validationResult } = require("express-validator");
const genres = require("../utils/genres");
const { isValidObjectId } = require("mongoose");
exports.userValidtor = [
  check("name").trim().not().isEmpty().withMessage("Name is missing!"),
  check("email").normalizeEmail().isEmail().withMessage("Email is invalid!"),
  check("password")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Password is missing!")
    .isLength({ min: 8, max: 20 })
    .withMessage("Password must be 8 to 20 characters long!"),
];

exports.validatePassword = [
  check("newPassword")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Password is missing!")
    .isLength({ min: 8, max: 20 })
    .withMessage("Password must be 8 to 20 characters long!"),
];

exports.signInValidator = [
  check("email").normalizeEmail().isEmail().withMessage("Email is invalid!"),
  check("password").trim().not().isEmpty().withMessage("Password is missing!"),
];

exports.actorInfoValidator = [
  check("name").trim().not().isEmpty().withMessage("Actor name is missing!"),
  check("about")
    .trim()
    .not()
    .isEmpty()
    .withMessage("About is a required field!"),
  check("gender")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Gender is a required field!"),
];


// ####################################### MOVIE VALIDATOR ###########################################
exports.validateMovie = [
  check('title').trim().not().isEmpty().withMessage('Title is missing!'),
  check('storyLine').trim().not().isEmpty().withMessage('Storyline is missing!'),
  check('releaseDate').trim().not().isEmpty().withMessage('Release date is missing!'),
  check('releaseDate').isDate().withMessage('Relaease date is invalid!'),
  // here it means that status must be either public or private
  check('status').isIn(['public', 'private']).withMessage('Status is invalid!'),
  check('type').trim().not().isEmpty().withMessage('Type is missing!'),
  // checking array of string and atleast of length one
  // value of arrays will come from the array of genres
  // Note inside custom validator it is imp to return true if something is valid
  check('genres').isArray({min:1}).withMessage('Genres is missing!').custom((value)=>{
         for(let g of value){
          // in js in of python same as g
          if(!genres.includes(g)) {throw new Error('Genres is invalid!')}
         }
         return true;
  }),
  check('tags').isArray({min:1}).withMessage('Tags is missing!').custom((tags)=>{
    for(let tag of tags){
      if(typeof tag !== 'string') {throw new Error('Tags is invalid!')}
    }

    return true;
  })
   ,
  check('cast').isArray().withMessage('Cast is missing!').custom((casts)=>{
    for(let cast of casts ){
      if(isValidObjectId(cast) == false) {throw new Error('Cast is invalid!')}
      if(!cast.roleAs?.trim()){throw new Error('Role as is missing!')}
      if(typeof cast.leadActor !== 'boolean') throw Error('only boolean value inside leadActor is accepted ')
      
    }
    return true;
  }),
  check('trailerInfo').isObject().withMessage('Trailer info is missing!').custom((trailerInfo)=>{
  //  Note if url is not valid then URL object will throw error
    try{
      const newUrl = new URL(trailerInfo.url);
      if(!Result.protocol.startsWith('https')) throw new Error('Trailer url is invalid!');
      let arr = trailerInfo.url.split('/');
      const publicId = arr[arr.length-1].split('.')[0];
      if(publicId !== trailerInfo.public_id) throw new Error('Trailer public_id is invalid!');
    }catch(err){
      throw new Error('Trailer url is invalid!')
    }
   
    if(!trailerInfo.public_id?.trim()) throw Error('Trailer public_id is missing!')
   return true;
  }),
  // here ist parameter is not used  and hence we used _ here
// if now image is present then error is thrown
  check('poster').custom((_, {req})=>{
          if(!req.file)throw Error('Poster is missing!');
  })
]

//  ########################################## VALIDATE Data ##########################################

exports.validate = (req, res, next) => {
  const error = validationResult(req).array();
  if (error.length) {
    return res.json({ error: error[0].msg });
  }

  next();
};

