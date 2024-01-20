const router = require('express').Router();
const {
    getThought,
    getOneThought,
    createThought,
    updateThought,
    deleteThought
}= require('../../controllers/thoughtController');

//  /api/users
router.route('/')
.get(getThought)
.post(createThought);



// /api/users/:thoughtId
router.route('/:thoughtId').get(getOneThought);
router.route('/:thoughtId').put(updateThought);
router.route('/:thoughtId').delete(deleteThought)
module.exports = router;



