const express = require(`express`)
const router = express.Router()
const cors = require("cors")

const {getProfile, editInfo, uploadResume} = require(`../controllers/studentProfile`)
const {multerSinglePdf} = require(`../middlewares/multerSinglePdf`)

//midleware
router.use(
    cors({
        credentials:true,
        origin:"http://localhost:5173"
    })
)

//get Profile
router.get(`/getProfile`, getProfile)

//edit Info
router.post(`/editInfo`, editInfo)

//upload resume
router.post(`/uploadResume`, multerSinglePdf, uploadResume)

module.exports = router