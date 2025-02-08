//database student models
const student = require(`../models/student`)
const studentOTPVerification = require(`../models/studentOTPVerification`)

//middlewares
const {hashPassword, comparePassword} = require(`../middlewares/hashing`)
const {isOnlyString} = require(`../middlewares/isOnlyString`)
const {isValidEmail} = require(`../middlewares/isValidEmail`)

//cookie package
const jwt = require(`jsonwebtoken`)

//email hander package
const nodemailer = require(`nodemailer`)

//env variables
require(`dotenv`).config()

//nodemailer stuff
let transporter = nodemailer.createTransport({
    service : "Gmail",
    auth :{
        user : process.env.AUTH_EMAIL,
        pass : process.env.AUTH_PASS
    }
})
//testing nodemailer success
transporter.verify( (error, success) => {
    if(error) {
        console.log(error)
    }
    else{
        console.log("Nodemailer ready for msgs")
        console.log(success)
    }
})

//path
const path = require(`path`)

//student register
const register = async (req, res) => {
    try{
        const {name, email, password, univId, speciality} = req.body
        

        //check
        if(!name){
            console.log('Name is Required');
            return res.status(400).json({
                status: `Failed`,
                err: `Name is required `
            })
        }
        else if(!isOnlyString(name)){
            console.log('Name cannot contain Numbers or any special characters');
            return res.status(400).json({
                status: `Failed`,
                err: `Name cannot contain Numbers or any special characters`
            })
        }

        //check email
        if(!email){
            console.log('Email is required');
            return res.status(400).json({
                status: `Failed`,
                err: `Email is required `
            })
        }
        else {
            if(!isValidEmail(email)){
            console.log('Enter a valid email addresse');
            return res.status(400).json({
                status: `Failed`,
                err: `Enter a valid email addresse`
            })}

            const existingEmail = await student.find({email})
            if(existingEmail.length > 0){
                console.log('Email already exist');
                return res.status(400).json({
                    status: `Failed`,
                    err: `Email already exist`
                })
            }
        }

        //check password
        if(!password){
            console.log('Password is required');
            return res.status(400).json({
                status: `Failed`,
                err: `Password is required `
            })
        }
        else if(password.length < 8 || password.length > 32){
            console.log('Password must be between 8 and 32 characters');
            return res.status(400).json({
                status: `Failed`,
                err: `Password must be between 8 and 32 characters`
            })
        }

        //check univId
        if(!univId){
            console.log('University Id is required');
            return res.status(400).json({
                status: `Failed`,
                err: 'University Id is required'
            })
        }
        else{
            if(univId.toString().length != 8 || isNaN(univId)){
                console.log('University Id is wrong, must be 8 digits');
                    return res.status(400).json({
                        err: "University Id is wrong"
                    }
            )}
            
            const existingUnivId = await student.find({univId})
            if(existingUnivId.length > 0){
                return res.status(400).json({
                    status: `Failed`,
                    err: "UnivId already exist"
                })
            }
        }

        if(!speciality){
            console.log('Speciality is required');
            return res.status(400).json({
                status: `Failed`,
                err: `Speciality is required`
            })
        }
        else if(!isOnlyString(speciality)){
            console.log('Speciality cannot contain any numbers or special characters');
            return res.status(400).json({
                status: `Failed`,
                err: `Speciality cannot contain any numbers or special characters`
            })
        }


        const hashedPass = await hashPassword(password)
        const theStudent = await student.create({name, 
                            email, 
                            password: hashedPass,
                            univId,
                            speciality,
                            verified: false
                            })


        console.log('student record created successfully');
        const studentId = theStudent._id
        sendOTP( {studentId, email} , res)
    }
    catch(error){
        console.log(error);
        res.status(500).json({
            status: `Failed`,
            err: `Error Occurred while attempting to register`
        })
    }
}

const sendOTP = async ({studentId ,email}, res) => {
    try{
        const otp = `${Math.floor(1000 + Math.random() * 9000)}`

        //send email
        const mailOptions = {
            from: process.env.AUTH_EMAIL,
            to: email,
            subject: "Verify Your Email",
            html: `<p/>Your InterNest verification code is : <b>${otp}</b></p>
                    <p>This code expires in <b>10 minutes</b></p>`
        }

        //hashing the OTP Number
        const hashedOTP = await hashPassword(otp)

        await studentOTPVerification.create({
            studentId: studentId,
            otp: hashedOTP,
            createdAt: Date.now(),
            expiredAt: Date.now() + 600000
        })

        //send email
        await transporter.sendMail(mailOptions)

        return res.status(200).json({
            status: "Pending",
            msg: "OTP Verification code has been sent to the email",
            data: {studentId, email}
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            err: `Error Occurred sending OTP Verification Email`
        })
    }
}

const verifyOTP = async (req, res) => {
    try{
        const {studentId, otp} = req.body
        if(!studentId || !otp){
            console.log('No StudentId or Otp provided');
            return res.status(400).json({
                err: 'No StudentId or Otp provided'
            })
        }

        const studentOTP = await studentOTPVerification.find({studentId})
        if(studentOTP.length <= 0 ){
            console.log('This student does not exist or have been verified already');
            return res.status(404).json({
                err: 'This student does not exist or have been verified already'
            })   
        }

        const {expiredAt} = studentOTP[0]
        const  hashedOTP = studentOTP[0].otp
        if(expiredAt < Date.now()){
            //user otp expired
            await studentOTPVerification.deleteMany({studentId})
            await student.deleteOne({_id: studentId})

            console.log('OTP Code Expired');
            return res.status(400).json({
                err: `OTP Code expired`
            })
        }

        const validOTP = await comparePassword(otp, hashedOTP)
        if(!validOTP){
            console.log('Wrong OTP Code');
            return res.status(400).json({
                err: `Wrong OTP Code`
            })
        }

        await student.updateOne(
            {_id: studentId},
            {verified: true}
        )
        await studentOTPVerification.deleteMany({studentId})
        console.log('Student Verified Successfully');
        return res.status(200).json({
            status: `Verified`,
            msg: `Student Verified Successfully, you can now login to InterNest`
        })

     }
    catch(error){
        console.log(error);
        return res.status(500).json({
            err: `Error Occured when verifing Student OTP Code`
        })
    }
}

const resendOTP = async (req, res) => {
    try{
        const {studentId, email} = req.body
        if(!studentId || !email){
            console.log('No StudentId or email provided');
            return res.status(400).json({
                err: 'No StudentId or email provided'
            })
        }

        //delete existing veification recoreds
        await studentOTPVerification.deleteMany({studentId})
        sendOTP({studentId, email}, res)
    }
    catch(error){
        console.log('Failed to resend OTP Code');
        return res.status(500).json({
            status : `Failed`,
            err: `Error Ocurred when resending OTP Code`
        })
    }
}

const login = async (req, res) => {
    try{
        const {email, password} = req.body

        const existingStudent = await student.findOne({email})
        if(!existingStudent){
            console.log('There is no student with such email');
            return res.status(404).json({
                status: `Failed`,
                err: 'There is no student with such email'
            })
        }
        else if(!existingStudent.verified){
            console.log('Student isnt verified yet');
            return res.status(401).json({
                status: "Unauthorized",
                err: 'Student isnt verified yet'
            })
        }
    
        const match = await comparePassword(password, existingStudent.password)
        if(match) {
            console.log('logged in successfully');
            jwt.sign({
                        studentId: existingStudent._id, 
                        studentName: existingStudent.name,
                        studentEmail: existingStudent.email, 
                        studentUnivId: existingStudent.univId
                    }, 
                    process.env.JWT_SECRET_KEY,
                    {expiresIn :"7d"},
                    (err, token) => {
                        if(err) throw err
                        res.cookie(`token`, token, {httpOnly:true}).status(200).json({msg: `you've logged in successfully`})
                    }  
                )
        }
        else{
            console.log('Wrong Password');
            return res.status(401).json({
                status: "Unauthorized",
                err: `Wrong Password`
            })
        }
    }
    catch(error) {
        console.log(error);
        return res.status(500).json({
            status: "Failed",
            err: `Error Occurred when attempting to login`
        })
    }

}

const logout = async (req, res) => {
    try {
        // Clear the token from the cookie
        res.clearCookie('token');

        console.log('Student logged out successfully');
        return res.status(200).json({
            msg: 'Logged out successfully'
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            err: 'Error while attemting to logout'
        });
    }
}

module.exports = {register, login, logout, verifyOTP, resendOTP}