const { Thought, User } = require('../models');

//                                                    -------- GET --------
module.exports = {
  async getThought(req, res) {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },
//                                                   -------- GET ONE --------
  async getOneThought(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId });
    //   .populate({ path: 'reactions', select: '-__v' });
      if (!thought) {
        return res.status(404).json({ message: 'No ID exists' });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err)
    }
  },
//                                                   -------- CREATE --------
  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);
      const user = await User.findOneAndUpdate(
        { _id: req.body.userId },
        { $addToSet: { thoughts: thought._id } },
        { new: true }
      );

      if (!user) {
        return res
          .status(404)
          .json({ message: 'No User found with that ID.' });
      }

      res.json('!!!!Thought sucessfully created!!!');
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

//                                                   -------- UPDATE --------


async updateThought(req, res) {
    console.log('Update Thought Route')
    try {
        console.log('Updating Thought: ' + req.params.thoughtId)

        const updatedThought = await Thought.findByIdAndUpdate(
            req.params.thoughtId,
            req.body,
            { new: true, runValidators: true }
        )
        if (!updatedThought) {
            return res.status(404).json({ message: 'No thought with that ID' });
          }
          res.json(updatedThought);
        } catch (err) {
          res.status(500).json(err);
        }
    },

// async updateUser(req, res) {
//     try {
// console.log('Updating User: '+ req.params.userId)
//       const updatedUser = await User.findByIdAndUpdate(
//         req.params.userId,
//         req.body,
//         { new: true, runValidators: true }
//       );
//       if (!updatedUser) {
//         return res.status(404).json({ message: 'No user with that ID' });
//       }
//       res.json(updatedUser);
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   },
  //                                                   -------- DELETE --------
  async deleteThought(req, res) {
    try {
        const thought = await ThoughtfindOne({_id: req.params.thoughtId})
        console.log('Deleting Thought: '+ thought)
        await Thought.deleteOne(thought)
    if (!thought) {
    return res.status(404).json({ message: 'No thought with that ID' });
  }
  res.json(thought);
    } catch (err) {
        res.status(500).json(err);
    }
}
};
