const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  phone: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  name: {
    type: String,
  },
  postImage: {
    type: String,
  },

  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Post = mongoose.model('post', PostSchema);
