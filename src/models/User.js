const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        minLength: [5, 'Password is too short!'],
        match: [/^[A-Za-z0-9]+$/, 'Username must be alphanumeric'],
        unique: {
            value: true,
            message: 'Username already exists',
        },
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        validate: {
            validator: function(value) {
                return /^[A-Za-z0-9]+$/.test(value);
            },
            message: `Invalid password characters!`
        },
        minLength: 8,
    },
});

// TODO: make it work
userSchema.path('username').validate(function(value) {
    const user = mongoose.model('User').findOne({username: value});

    return !!user;
}, 'Username already exists');

userSchema.virtual('repeatPassword')
    .set(function(value) {
        if (value !== this.password) {
            throw new Error('Passsword missmatch!');
        }
    });

userSchema.pre('save', async function() {
    const hash = await bcrypt.hash(this.password, 10);

    this.password = hash;
});

const User = mongoose.model('User', userSchema);

module.exports = User;
