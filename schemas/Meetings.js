const {Schema, model} = require('mongoose') 

const Meetings = new Schema({
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
    demands: [{
        id: String,
        label: String,
        level: String,
        status: String
    }],
    date_up: String,
    time: String,
    members: [{
        account_id: String,
        name: String,
        role: String
    }],
    chat: [{
        name: String,
        variant: String,
        text: String 
    }],
    waypoints: [{
        shortid: String,
        name: String,
        title: String,
        category: String,
        photo_url: String,
        cords: {
            lat: Number,
            long: Number
        },
        voters: [String],
        rate: Number
    }]
})

module.exports = model('Meetings', Meetings)