const {Schema, model} = require('mongoose');

const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        maxLength: 280
    },

    createAt: {
        type: Date,
        default: Date.now,
        //getter
    },

    username: {
        type: String,
        require: true
    }
});

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;