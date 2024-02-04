const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        minLength: [5, 'Password is too short!'],
        match: [/^[A-Za-z0-9]+$/, 'Username must be alphanumeric'],
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        validate: {
            validator: function (value) {
                return /^[A-Za-z0-9]+$/.test(value);
            },
            message: `Invalid password characters!`
        },
        minLength: 8,
    },
});

// TODO: make it work
userSchema.path('username').validate(async (username) => {
    try {
        const usernameCount = await mongoose.models.User.countDocuments({ username });

        return !usernameCount;
    } catch (error) {
        console.log(error);
    }
}, 'Username alredy exists');

userSchema.virtual('repeatPassword')
    .set(function (value) {
        if (value !== this.password) {
            throw new Error('Passsword missmatch!');
        }
    });

userSchema.pre('save', async function () {
    try {
        const hash = await bcrypt.hash(this.password, 10);

        this.password = hash;
    } catch (error) {
        console.log(error);
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
