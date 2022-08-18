// Define Mongoose
const mongoose = require('mongoose');

// include validator for email
import { isEmail } from 'validator';

// Create a new instance of the Mongoose schema to define shape of each document
const userSchema = new mongoose.Schema({
    // Add individual properties and their types
    // Setting required to true will disallow null values
    username: { 
        type: String, required: true,
        trim: true, unique: true 
    },
    email: {
        type: String, required: true, unique: true, 
        validate: [ isEmail, 'Please fill a valid email address']
    },
    thoughts: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'Thought' }
    ],
    friends: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
    ]
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

// returns the amount of friends this user have
userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

// Using mongoose.model() to compile a model based on the schema
// 'User' is the name of the model
// userSchema is the name of the schema we are using to create a new instance of the model
const User = mongoose.model('user', userSchema);

// Error handler function to be called when an error occurs when trying to save a document
const handleError = (err) => console.error(err);

// We use the model to create individual documents that have the properties as defined in our schema
User.create(
    {
        username: 'tester',
        email: 10,
        price: 1,
        inStock: true,
    },
    (err) => (err ? handleError(err) : console.log('Created new document'))
);

module.exports = User;
