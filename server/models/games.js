const mongoose = require('mongoose')

const Schema = mongoose.Schema

const gameSchema = new Schema({
    title: String,
    description: String,
    image: String,
    price: String,
    company: String,
    category: String,
    rating: Number,
    downloads: Number,
    age: Number,
    url: {
        android: String,
        apple: String
    },
    trending: Boolean,
    top: Boolean,
    suggestion: Boolean,
    user: String,
    status: String
},
    {
        timestamps: {
            createdAt: 'createdAt',
            updatedAt: 'updatedAt'
        }
    }
)

module.exports = mongoose.model('games', gameSchema)