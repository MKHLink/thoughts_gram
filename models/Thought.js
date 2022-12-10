const {Schema, model, Types} = require('mongoose');
//import of moment to format createdAt date value
const moment = require('moment');

const reactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: ()=> new Types.ObjectId()
    },

    reactionBody:{
        type: String,
        required: true,
        maxLength: 280
    },

    username:{
        type: String,
        required: true
    },

    createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => moment(createdAtVal).format("MMM DD, YYYY [at] hh:mm a")
    }
},
{
    toJSON:{
        virtuals: true,
        getters: true
    }
});

const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        maxLength: 280
    },

    createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => moment(createdAtVal).format("MMM DD, YYYY [at] hh:mm a")
    },

    username: {
        type: String,
        require: true
    },

    reactions: [reactionSchema]
},
{
    toJSON:{
        virtuals: true,
        getters: true
    }
});

//virtual to get a count of reactions in a thought
thoughtSchema.virtual('reactionCount').get(function(){
    return this.reactions.length;
});

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;