const student = require(`../models/student`)

const jwt = require(`jsonwebtoken`)

const {hashPassword, comparePassword} = require(`../middlewares/hashing`)
const {isOnlyString} = require(`../middlewares/isOnlyString`)

const getProfile = async(req, res) => {
    try{
        const token = req.cookies.token
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        const existingStudent = await student.findOne({_id: decoded.studentId})
                                            .select(`name email univId speciality interships resume`)
        if(!existingStudent){
            console.log('Student not found or does not exist anymore');
            return res.status(404).json({
                err: 'Student not found or does not exist anymore'
            })
        }

        console.log('student Found');
        return res.status(200).json({existingStudent})


    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            err: `Error Ocurred while attempting to get Student's profile`
        })
    }
}

const editInfo = async (req, res) => {
    try{    
        const token = req.cookies.token
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        const {name, password, speciality, univId} = req.body

        const theStudent = await student.findOne({_id: decoded.studentId})
        if(!theStudent){
            console.log('Student not found or doesnt exist anymore');
            return res.status(404).json({
                err: `Student not found or doesnt exist anymore`
            })
        }

        let msg = ""

        if(name && isOnlyString(name)) {
            theStudent.name = name
            msg = msg + "Name, "
        }
        if(password && password.length >= 8 && password.length <= 32) {
            const hashedPass = await hashPassword(password)
            theStudent.password = hashedPass
            msg = msg + "Password, "
        } 
        if(speciality && isOnlyString(speciality)) {
            theStudent.speciality = speciality;
            msg = msg + "Speciality, "
        }
        if(univId && !isNaN(univId) && univId.toString().length == 8) {
            theStudent.univId = univId
            msg = msg + "univId. "
        }

        if(msg.length > 0) msg = msg + "Have been changed sucessfully"
        else msg = "No changes Have been Done"

        return res.status(200).json({
            msg
        })
    }   
    catch(error){
        console.log(error);
        return res.status(500).json({
            err: `Error Ocurred while attempting to edit student's info`
        })
    }
}

const interships = async (req, res) => {
    
}

const uploadResume = async (req, res) => {
    try{
        const token = req.cookies.token
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        const resume = req.file
        await student.updateOne(
            {_id: decoded.studentId},
            {resume: resume?.path}
        )

        return res.status(200).json({
            msg: `Resume uploaded successfully`
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            err: `Error Ocurre while attempting to upload resume`
        })
    }
}

module.exports = {getProfile, editInfo, uploadResume}