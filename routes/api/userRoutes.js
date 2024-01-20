const router = require('express').Router();
const {
  getUsers,
  getOneUser,
  createUser,
  updateUser,
  deleteUser,
  createFriend,
  deleteFriend
} = require('../../controllers/userController');

//  /api/users
router.route('/')
.get(getUsers)
.post(createUser);

// /api/users/:userId
router.route('/:userId').get(getOneUser),
router.route('/:userId').put(updateUser),
router.route('/:userId').delete(deleteUser);


//    /api/users/:userId/friends/:friendId
router.route('/:userId/friend/:friendId')
.post(createFriend)
.delete(deleteFriend)





module.exports = router;
