const router = require('express').Router();
const {
  getUsers,
  getOneUser,
  createUser,
  updateUser,
  deleteUser,
} = require('../../controllers/userController');

//  /api/users
router.route('/')
.get(getUsers)
.post(createUser);

// /api/users/:userId
router.route('/:userId').get(getOneUser);

router.route('/:userId').put(updateUser);
router.route('/:userId').delete(deleteUser)
module.exports = router;
