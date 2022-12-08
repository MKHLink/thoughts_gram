const router = require('express').Router();
const {
    getAllThoughts,
    getOneThought,
    createThought,
    updateThought,
    addReaction,
    deleteReaction,
    deleteThought
} = require('../../controllers/thought-controller');

router.route('/').get(getAllThoughts);

router.route('/:id')
    .get(getOneThought)
    .delete(deleteThought)
    .put(updateThought);

router.route('/:userId').post(createThought);

router.route('/:thoughtId/reactions')
    .put(addReaction)
    .delete(deleteReaction);

module.exports = router;