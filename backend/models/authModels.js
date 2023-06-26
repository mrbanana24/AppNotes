// User model
const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
    required: false,
    trim: true,
    minlength: 1,
    maxlength: 20,
  },
  email: {
    type: String,
    required: false,
    trim: true,
    unique: true,
    minlength: 1,
    maxlength: 50,
  },
  password: {
    type: String,
    required: false,
    trim: true,
    minlength: 1,
    maxlength: 1024,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
