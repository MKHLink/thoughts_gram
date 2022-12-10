const {User, Thought} = require('../models');

const userController = {

    //get all users
    getAllUsers(req,res){
        User.find({})
        .then(dbUserData => res.json(dbUserData))
        .catch(err =>{
            console.log(err);
            res.status(400).json(err);
        });
    },

    //gets a single user by their id
    getUserById({params},res){
        User.findOne({_id: params.id})
        .then(dbUserData=>{
            if(!dbUserData)
            {
                res.status(404).json({message: 'User not found'});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err=>{
            console.log(err);
            res.status(400).json(err);
        });
    },

    //creates a new user
    createUser({body},res){
        User.create(body)
        .then(dbUserData =>res.json(dbUserData))
        .catch(err=> res.status(400).json(err));
    },

    //updates a user by their id
    updateUser({params,body}, res){
        User.findOneAndUpdate({_id: params.id},body,{new:true})
        .then(dbUserData=>{
            if(!dbUserData)
            {
                res.status(404).json({message: 'User not found'});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err=>{
            console.log(err);
            res.status(400).json(err);
        });
    },

    //adds an exisiting user as a friend to another user
    addFriend(req,res){
        User.findOneAndUpdate(
            {_id: req.params.userId},
            {$push: {friends: req.params.friendId}},
            {new: true}
        )
        .then(dbUserData=>{
            if(!dbUserData)
            {
                res.status(404).json({message: 'User not found'});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err=>{
            console.log(err);
            res.status(400).json(err);
        });
    },

    //deletes a user as a friend form their friends array
    removeFriend(req,res){
        User.findOneAndUpdate(
            {_id: req.params.userId},
            {$pull: {friends: req.params.friendId}},
            {new: true}
        )
        .then(dbUserData=>{
            if(!dbUserData)
            {
                res.status(404).json({message: 'User not found'});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err=>{
            console.log(err);
            res.status(400).json(err);
        });
    },

    //removes a user from the database
    deleteUser({params},res){
        User.findOneAndDelete({_id: params.id})
        .then(dbUserData=>{
            if(!dbUserData)
            {
                res.status(404).json({message: 'User not found'});
                return;
            }
            return Thought.deleteMany({_id: {$in: dbUserData.thoughts}})
        })
        .then(()=> 
        res.json({message: "User deleted"}))
        .catch(err=>{
            console.log(err);
            res.status(400).json(err);
        });
    }

};

module.exports = userController;