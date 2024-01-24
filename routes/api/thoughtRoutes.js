const router = require('express').Router();
const {
    getThought,
    getOneThought,
    createThought,
    updateThought,
    deleteThought,
    createReaction,
    deleteReaction
}= require('../../controllers/thoughtController');

//  /api/thought
router.route('/')
.get(getThought)
.post(createThought);



// /api/users/:thoughtId
router.route('/:thoughtId').get(getOneThought);
router.route('/:thoughtId').put(updateThought);
router.route('/:thoughtId').delete(deleteThought)

// /api/users/:thoughtId/reactions
router.route('/:thoughtId/reactions').post(createReaction)
router.route('/:thoughtId/reactions').delete(deleteReaction)

module.exports = router;



