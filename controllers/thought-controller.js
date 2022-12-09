const {Thought, User} = require('../models');

const thoughtController ={

    getAllThoughts(req,res){
        Thought.find({})
        .then(dbThoughtData =>res.json(dbThoughtData))
        .catch(err=>{
            console.log(err);
            res.status(500).json(err);
        });
    },

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