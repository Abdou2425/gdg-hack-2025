const express = require(`express`)
const router = express.Router()
const cors = require("cors")

const {multerSingleImg} = require(`../middlewares/multerSingleImg`)
const {multerSingleChallenge} = require(`../middlewares/multerSingleChallenge`)

//midleware
router.use(
    cors({
        credentials:true,
        origin:"http://localhost:5173"
    })
)

const {getProfile, 
    editInfo, 
    createIntership, 
    createChallenge, 
    getAllSubmissions, 
    getAllChallenges, 
    getOneIntership} = require(`../controllers/companyProfile`)

//get profile
router.get(`/getProfile`, getProfile)

//edit info
router.post(`/editInfo`, editInfo)

//create intership
router.post(`/createIntership` ,multerSingleImg ,createIntership)

//create challenge
router.post(`/createChallenge/:intershipId`, multerSingleChallenge, createChallenge )

//getAllSubmissions
router.get(`/getAllSubmissions/:challengeId`, getAllSubmissions)

//getAllChallenges
router.get(`/getAllChallenges/:intershipId`, getAllChallenges)

//get one intership
router.get(`/getOneIntership/:intershipId`, getOneIntership)

module.exports = router