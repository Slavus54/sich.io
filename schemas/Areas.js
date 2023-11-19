const {Schema, model} = require('mongoose') 

const Areas = new Schema({
    shortid: String,
    account_id: String,
    username: String,
    title: String,
    category: String,
    region: String,
    cords: {
        lat: Number,
        long: Number
    },
    status: String,
    assault_points: Number,
    damages: [{
        shortid: String,
        name: String,
        label: String,
        category: String,
        isKilled: Boolean,
        photo_url: String,
        cords: {
            lat: Number,
            long: Number
        },
        trust_points: Number
    }],
    facts: [{
        shortid: String,
        name: String,
        text: String,
        level: String,
        isTrue: Boolean
    }]
})

module.exports = model('Areas', Areas)