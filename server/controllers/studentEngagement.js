const student = require(`../models/student`)
const challenege = require(`../models/challenge`)
const intership = require("../models/interships")
const submissions = require("../models/submissions")

const jwt = require(`jsonwebtoken`)

//get list of all available interships in the website
const getAllInterships = async (req, res) => {
    try{
        const interships = await intership.find().populate('company', 'name')
        return res.status(200).json(interships)
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            err: `Error Ocurred while attempting to get the website Interships`
        })
    }
}

//submit challenges to any intership
const submitChallenge = async (req, res) => {
    try{
        const token = req.cookies.token
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        const { challengeId } = req.params
        const attachment = req.file

        await submissions.create({
            student: decoded.studentId,
            challenge: challengeId,
            submittedAt: Date.now(),
            attachment: attachment?.path
        })

        return res.status(200).json({
            msg: `Challenge Sunmission successed`
        })

    }
    catch(error){
        console.log(error)
        return res.status(500).json({
            err: `Error Ocurred while attempting to `
        })
    }
}

module.exports = {getAllInterships, submitChallenge}