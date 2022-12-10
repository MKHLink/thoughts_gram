const {Thought, User} = require('../models');

const thoughtController ={

    //gets all the thoughts in the database
    getAllThoughts(req,res){
        Thought.find({})
        .then(dbThoughtData =>res.json(dbThoughtData))
        .catch(err=>{
            console.log(err);
            res.status(500).json(err);
        });
    },

    //gets a single thought by its id
    getOneThought({params},res){
        Thought.findOne({_id: params.id})
        .then(dbThoughtData =>{
            if(!dbThoughtData)
            {
                res.status(404).json({message: 'No thought found with the id'});
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err=>{
            console.log(err);
            res.status(500).json(err);
        });
    },

    //creates a thought by taking in a user id first
    createThought({params, body}, res){
        Thought.create(body)
            .then(({_id})=>{
                return User.findOneAndUpdate(
                    {_id: params.userId},
                    {$push: {thoughts: _id}},
                    {new: true}
                );
            })
            .then(dbThoughtData =>{
                if(!dbThoughtData)
                {
                    res.status(404).json({message: 'No thought found with the id'});
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err=>{
                console.log(err);
                res.status(500).json(err);
            });
    },

    //updates the contents of a thought by taking an exisiting thought id
    updateThought({params,body},res){
        Thought.findOneAndUpdate({_id: params.id},body, {new: true})
        .then(dbThoughtData =>{
                if(!dbThoughtData)
                {
                    res.status(404).json({message: 'No thought found with the id'});
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err=>{
                console.log(err);
                res.status(500).json(err);
            });
    },

    //adds a reaction to a thought
    addReaction({params, body},res){
        Thought.findOneAndUpdate(
            {_id: params.thoughtId},
            {$push: {reactions: body}},
            {new: true}
        )
        .then(dbThoughtData =>{
            if(!dbThoughtData)
            {
                res.status(404).json({message: 'No thought found with the id'});
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err=>{
            res.status(500).json(err);
        });
    },

    //removes a reaction from a thought
    deleteReaction(req,res){
        Thought.findOneAndUpdate(
            {_id: req.params.thoughtId},
            {$pull: {reactions: {reactionId : req.params.reactionId}}},
            {new: true}
        )
        .then(dbThoughtData =>{
            if(!dbThoughtData)
            {
                res.status(404).json({message: 'No thought found with the id'});
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err=>{
            console.log(err);
            res.status(500).json(err);
        });
    },

    //removes a thought by taking its id
    deleteThought({params},res){
        Thought.findOneAndDelete({_id: params.id})
        .then(deletedThought=>{
            if(!deletedThought)
            {
                res.status(404).json({message:"Thought not found"});
                return;
            }

            return User.findOneAndUpdate(
                {thoughts: params.thoughtId},
                {$pull: {thoughts: params.thoughtId}},
                {new: true}
            )
        })
        .then(()=>{
            res.json({message: "Thought deleted"});
        })
        .catch(err=>{
            res.status(500).json(err);
        });
    }

}

module.exports = thoughtController;