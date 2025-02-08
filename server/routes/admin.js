const express = require(`express`)
const router = express.Router()
const cors = require("cors")

//midleware
router.use(
    cors({
        credentials:true,
        origin:"http://localhost:5173"
    })
)

const {login, logout, getUnverifiedCompanies, verifyCompany} = require(`../controllers/admin`)

//login 
router.post(`/login`, login)

//logout
router.post(`/logout`, logout)

//get Unverified Companies
router.post(`/getUnverifiedCompanies`, getUnverifiedCompanies)

//verify company
router.post(`./verifyCompany`, verifyCompany)

module.exports = router