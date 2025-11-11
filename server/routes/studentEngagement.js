const express = require(`express`)
const router = express.Router()
const cors = require("cors")

const {multerSingleSubmission} = require(`../middlewares/multerSingleSubmission`)

const {getAllInterships, submitChallenge} = require(`../controllers/studentEngagement`)

//midleware
router.use(
    cors({
        credentials:true,
        origin:"http://localhost:5173"
    })
)

//get all profiles
router.get(`/getAllInterships`, getAllInterships)

//submit challenge 
router.post(`/challengeSubmission/:challengeId`, multerSingleSubmission, submitChallenge)

module.exports = router