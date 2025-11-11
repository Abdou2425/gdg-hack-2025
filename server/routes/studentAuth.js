const express = require(`express`)
const router = express.Router()
const cors = require("cors")

const {register, login, logout, verifyOTP, resendOTP} = require(`../controllers/studentAuth`)

//midleware
router.use(
    cors({
        credentials:true,
        origin:"http://localhost:5173"
    })
)

//register endpoint
router.post(`/register`, register)

//verify OTP
router.post(`/verifyOTP`, verifyOTP)

//resend OTP
router.post(`/resendOTP`, resendOTP)

//student login
router.post(`/login`, login)

//student logout
router.post(`/logout`, logout)

module.exports = router