//importing express and thought controllers
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

//gets all thoughts
router.route('/').get(getAllThoughts);

//gets a single thought by id, deletes a thought and updates a thought
router.route('/:id')
    .get(getOneThought)
    .delete(deleteThought)
    .put(updateThought);

//creates a thought for an user
router.route('/:userId').post(createThought);

//adds reactions to thoughts
router.route('/:thoughtId/reactions')
    .put(addReaction);

//deletes an exisiting reaction from a thought
router.route('/:thoughtId/reactions/:reactionId')
    .delete(deleteReaction);

module.exports = router;