//importing express and all the controllers for user
const router = require('express').Router();
const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    addFriend,
    removeFriend,
    deleteUser
} = require('../../controllers/user-controller');

//gets all users and makes new users
router
    .route('/')
    .get(getAllUsers)
    .post(createUser);

//gets a single user, updates users and deletes a user
router  
    .route('/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);


//end point to add or remove a user as a friend
router.route('/:userId/friends/:friendId')
    .post(addFriend)
    .delete(removeFriend);

module.exports = router;