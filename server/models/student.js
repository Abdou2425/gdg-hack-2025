const mongoose = require(`mongoose`)

const studentSchema = new mongoose.Schema({
    name: {
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
    univId : {
        type: Number,
        required: true,
        min: 10000000,
        max: 99999999
    },
    speciality: {
        type: String,
        required: true
    },
    interships: {
        type: [mongoose.SchemaTypes.ObjectId],
        ref: `interships`,
        default: []
    },
    resume: String,
    verified: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model(`student`, studentSchema, `student`)