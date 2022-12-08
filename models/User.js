const {Schema, model} = require('mongoose');
//import {isEmail} from 'validator';

const UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },

    email: {
        type: String,
        required: true,
        unique: true
        //validate: [isEmail, 'invalid email']
    },

    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ],

    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        }
    ]
},
{
    toJSON:{
        virtuals: true
    }
});

UserSchema.virtual('friendCount').get(function(){
    return this.friends.length;
});

const User = model('User', UserSchema);

module.exports = User;