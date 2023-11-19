const {Schema, model} = require('mongoose') 

const Profiles = new Schema({
    account_id: String,
    username: String,
    password: String,
    region: String,
    cords: {
        lat: Number,
        long: Number
    },
    isRefugee: Boolean,
    percent: Number,
    main_photo: String,
    volume: Number,
    media: [{
        label: String,
        icon: String,
        url: String
    }],
    bills: [{
        shortid: String,
        label: String,
        category: String,
        cost: Number,
        photo_url: String,
        likes: Number
    }],
    account_components: [{
        shortid: String,
        title: String,
        path: String
    }]
})

module.exports = model('Profiles', Profiles)