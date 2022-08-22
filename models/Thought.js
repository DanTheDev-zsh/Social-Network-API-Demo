// Define Mongoose
// const { fdatasync } = require('fs');
const { ObjectID } = require('bson');
const mongoose = require('mongoose');


const reactionSchema = new mongoose.Schema({
    // Add individual properties and their types
    // Setting required to true will disallow null values
    reactionId: {
        type: ObjectID, required: true,
        default: new mongoose.Types.ObjectId()
    },
    reactionBody: {
        type: String, required: true,
        maxlength: 280
    },
    username: { type: String, required: true },
    createdAt: { type: Date, default: Date(), get: formatDate }
},
    {
        _id: false
    }
);


// Create a new instance of the Mongoose schema to define shape of each document
const thoughtSchema = new mongoose.Schema({
    // Add individual properties and their types
    // Setting required to true will disallow null values
    Thought: {
        type: String, required: true,
        minlength: 1, maxlength: 280
    },
    createdAt: {
        type: Date, default: Date(), get: formatDate
    },
    username: { type: String, required: true },
    userId: {
        type: mongoose.Schema.Types.ObjectId, required: true,
        ref: 'User'
    },
    reactions: [
        // Reaction documents
        // Array of nested documents created with the reactionSchema
        reactionSchema
    ]
},
    {
        toJSON: {
            virtuals: true,
        }
    }
);

thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

function formatDate(createdAt) {
    const dataString = createdAt.toString();
    return dataString.substring(0, 24);
}


// Using mongoose.model() to compile a model based on the schema
// 'Thought' is the name of the model
// thoughtSchema is the name of the schema we are using to create a new instance of the model
const Thought = mongoose.model('Thought', thoughtSchema);



module.exports = Thought;
