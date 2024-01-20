const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true
    }, 
    email: {
      type: String,
      required: true,
      unique: true,
      match: /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'thought'
      }
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'friend'
      }
    ]
  },
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
    id: false
  }
);

// Virtual to get the total count of friends
userSchema
.virtual('friendCount')
.get(function () {
  return this.friends.length;
}); 

// Initialize our User model
const User = model('user', userSchema);

module.exports = User;
