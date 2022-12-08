const {Thought, User} = require('../models');

const thoughtController ={

    getAllThoughts(req,res){
        Thought.find({})
        .then(dbThoughtData =>res.json(dbThoughtData))
        .catch(err=>{
            console.log(err);
            res.status(400).json(err);
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
            res.status(400).json(err);
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
                res.status(400).json(err);
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
                res.status(400).json(err);
            });
    },

    deletThought({params},res){
        Thought.findOneAndDelete({_id: params.thoughtId})
        .then(deletedThought=>{
            if(!deletedThought)
            {
                res.status(404).json({message:"Thought not found"});
                return;
            }

            return User.findOneAndUpdate(
                {_id: params.userId},
                {$pull: {thoughts: params.thoughtId}},
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
            res.status(400).json(err);
        });
    }

}

module.exports = thoughtController;