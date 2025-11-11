const express = require(`express`)
const router = express.Router()
const cors = require("cors")

const {register, login, logout} = require(`../controllers/companyAuth`)
const {multerSinglePdf} = require(`../middlewares/multerSinglePdf`)

//midleware
router.use(
    cors({
        credentials:true,
        origin:"http://localhost:5173"
    })
)

//register
router.post(`/register`, multerSinglePdf, register)

//login
router.post(`/login`, login)

//logout
router.post(`/logout`, logout)

module.exports = router