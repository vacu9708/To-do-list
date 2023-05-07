const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  userID: {
    type: String,
    unique: true, // To prevent duplicate values
  },
  password: String,
  name: String,
  img: String
  //todos: [{title: String, isCompleted: Boolean}] // Putting to-dos here will be better than having a separate to_do collection.
})

const User = mongoose.model('user', userSchema);
module.exports = User;