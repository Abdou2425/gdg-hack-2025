const mongoose = require(`mongoose`)

const intershipSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required : true
    },
    company: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: `company`,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    duration: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model(`intership`, intershipSchema, `intership`)