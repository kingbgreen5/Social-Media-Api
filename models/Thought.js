const { Schema, model } = require('mongoose');

const thoughtSchema = new Schema(
  {      username:{
    type: String,
    required: true
  },
    thoughtText: {
        type: String,
        required: true,
        minlength:1,
        maxlength: 280, 
      }, 
      createdAt: {
        type: Date,
        default: Date.now
      }, 
      reactions: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Reaction'
        }
      ],
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
          },
          id: false
    });

// Define a virtual called reactionCount
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
  });
  
  const Thought = model('thought', thoughtSchema);
  module.exports = Thought;