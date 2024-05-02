const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const stateSchema = new Schema ({
state: {
    type: String,
    required: true,
    unique: true
},
slug: {
    type: String,
    required: true,
    unique: true
},
code: {
    type: String,
    required: true,
    unique: true
},
nickname: {
    type: String,
    required: true,
    unique: true
},
website: {
    type: String,
    required: false,
    unique: false
},
admission_date: {
    type: String,
    required: true,
    unique: false
},
admission_number: {
    type: Number,
    required: true,
    unique: true
},
capital_city: {
    type: String,
    required: true,
    unique: false
},
capital_url: {
    type: String,
    required: true,
    unique: false
},
population: {
    type: Number,
    required: true,
    unique: false
},
population_rank: {
    type: Number,
    required: true,
    unique: true
},
constitution_url: {
    type: String,
    required: true,
    unique: true
},
state_flag_url: {
    type: String,
    required: false,
    unique: false
},
state_seal_url: {
    type: String,
    required: false,
    unique: false
},
map_image_url: {
    type: String,
    required: false,
    unique: false
},
landscape_background_url: {
    type: String,
    required: false,
    unique: false
},
skyline_background_url: {
    type: String,
    required: false,
    unique: false
},
twitter_url: {
    type: String,
    required: false,
    unique: false
},
facebook_url: {
    type: String,
    required: false,
    unique: false
},
funfacts: {
    type: [String],
    required: false,
    unique: false
}
}); 

module.exports = mongoose.model("state", stateSchema);