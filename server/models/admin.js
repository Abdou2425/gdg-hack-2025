const mongoose = require(`mongoose`)

const adminSchema = new mongoose.Schema({
    password : {
        type : String,
        required : true
    }
})

module.exports = mongoose.model(`admin`, adminSchema, `admin`)