const mongoose = require(`mongoose`)
const challenge = require("./challenge")

const submissionsSchema = new mongoose.Schema({
    student: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: `student`,
        required: true
    },
    challenge: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: `challenge`,
        required: true
    },
    submittedAt: {
        type: Date,
        required: true
    },
    attachment: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model(`submissions`, submissionsSchema, `submissions`)