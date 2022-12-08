const router = require('express').Router();
const {
    getAllThoughts,
    getOneThought,
    createThought,
    updateThought,
    deleteThought
} = require('../../controllers/thought-controller');

router.route('/').get(getAllThoughts);

router.route('/:id')
    .get(getOneThought)
    .delete(deleteThought)
    .put(updateThought);

router.route('/:userId').post(createThought);

module.exports = router;