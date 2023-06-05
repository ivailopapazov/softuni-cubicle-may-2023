const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    password: {
        type: String,
        // validate: {
        //     validator: function(value) {
        //         return this.repeatPassword === value;
        //     },
        //     message: `Password missmatch!`
        // }
    },
});

userSchema.virtual('repeatPassword')
    .set(function(value) {
        if (value !== this.password) {
            throw new mongoose.MongooseError('Passsword missmatch!');
        }
    })

const User = mongoose.model('User', userSchema);

module.exports = User;
