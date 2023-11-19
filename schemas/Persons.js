const {Schema, model} = require('mongoose') 

const Persons = new Schema({
    shortid: String,
    account_id: String,
    username: String,
    fullname: String,
    category: String,
    century: String,
    region: String,
    cords: {
        lat: Number,
        long: Number
    },
    age: Number,
    day_quote: String,
    questions: [{
        shortid: String,
        name: String,
        text: String,
        category: String,
        level: String,
        variants: [String],
        right_answer: String
    }],
    homesteads: [{
        shortid: String,
        name: String,
        title: String,
        format: String,
        photo_url: String,
        cords: {
            lat: Number,
            long: Number
        },
        likes: Number
    }]
})

module.exports = model('Persons', Persons)