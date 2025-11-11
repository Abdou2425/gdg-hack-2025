const mongoose = require(`mongoose`)

const challengeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required : true
    },
    intership: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: `intership`,
        required: true
    },
    level:{
        type: String,
        required: true
    },
    expireAt: {
        type: Date,
        required: true
    },
    challenge: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model(`challenge`, challengeSchema, `challenge`)