const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const emailVerificationTokenSchema = new mongoose.Schema({

    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    token:{
        type: String,
        required: true,

    }
    ,createdAt:{
        type: Date,
        // this means when to expire the token
        expires: 3600,
        default: Date.now()
    }
});
// arrow function don't have this keyword and hence don't work here
emailVerificationTokenSchema.pre("save", async function (next) {
    console.log('running');
    if (this.isModified("token")) {
// Note this 10 means how exintensive the hashing should be but it takes more time
        this.token = await bcrypt.hash(this.token, 10);
    }

    next();
});


module.exports = mongoose.model('EmailVerificationToken', emailVerificationTokenSchema);