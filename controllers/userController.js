const User = require('../models/User');

module.exports = {
  async getUsers(req, res) {
    console.log('get all user route hit')
    try {
      console.log('get all user route hit')
      const users = await User.find();
      res.json(users);
    } catch (err) {
      console.error('get all user route failed', err);
      res.status(500).json(err);
      console.log('get all user route failed')
    }
  },
  async getOneUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId })
        .populate({ path: 'thoughts', select: '-__v' })
      .populate({ path: 'friends', select: '-__v' });
      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async createUser(req, res) {
    try {
      const dbUserData = await User.create(req.body);
      res.json(dbUserData);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async updateUser(req, res) {
    try {
console.log('Updating User: '+ req.params.userId)
      const updatedUser = await User.findByIdAndUpdate(
        req.params.userId,
        req.body,
        { new: true, runValidators: true }
      );
      if (!updatedUser) {
        return res.status(404).json({ message: 'No user with that ID' });
      }
      res.json(updatedUser);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async deleteUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId })
console.log('Deleting User: '+ user)
        await User.deleteOne(user)
      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  }
};
