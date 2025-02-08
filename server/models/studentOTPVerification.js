const mongoose = require(`mongoose`)

const studentOTPVerificationSchema = new mongoose.Schema({
    studentId: String,
    otp: String,
    createdAt: Date,
    expiredAt: Date
})

module.exports = mongoose.model(`StudentOTP`, studentOTPVerificationSchema, `StudentOTP`)