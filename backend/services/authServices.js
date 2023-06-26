const jwt = require('jsonwebtoken');
const User = require('../models/authModels');

const comparePassword = async (password, userPassword) => {
    if(password !== userPassword){
        return false;
    }
    return true;
};

const generateToken = (user) => {
    return jwt.sign(
        { id: user._id, email: user.email },
        'secretkey',
        { expiresIn: '30d' }
    );
};

module.exports = {
    comparePassword,
    generateToken
};