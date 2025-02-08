const mongoose = require(`mongoose`)

const companySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    domaine: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    website: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    logo: String,
    certificate: {
        type: String,
        required: true
    },
    verified: {
        type: Boolean,
        default: true
    }
})

module.exports = mongoose.model(`company`, companySchema, `company`)