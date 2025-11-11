const company = require(`../models/company`)
const intership = require(`../models/interships`)
const challenge = require(`../models/challenge`)
const submissions = require(`../models/submissions`)

const {isOnlyString} = require(`../middlewares/isOnlyString`)
const {isValidEmail} = require(`../middlewares/isValidEmail`)
const {hashPassword} = require(`../middlewares/hashing`)
const {isValidURL} = require(`../middlewares/isValidUrl`)

const jwt = require(`jsonwebtoken`)
const nodemailer = require(`nodemailer`)

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

const getProfile = async (req, res) => {
    try{
        const token = req.cookies.token;
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    
        const existingCompany = await company.findOne({_id: decoded.companyId})
                                            .select('name location domaine email website description certificate')
                                            
        if(!existingCompany) {
            console.log('Company not found or doesnt exist anymore');
            return res.status(404).json({
                err: `Company not found or doesnt exist anymore`
            })
        }
    
        console.log('Profile Found');
        return res.status(200).json({existingCompany})
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            err: `Error Ocurred while attempting to get Company's Profile`
        })
    }
}

const editInfo = async (req, res) => {
    try {
        const token = req.cookies.token;
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        const { name, location, domaine, email, password, website, description } = req.body;

        const theCompany = await company.findOne({ _id: decoded.companyId });
        if (!theCompany) {
            console.log('Company not found or doesn\'t exist anymore');
            return res.status(404).json({
                err: 'Company not found or doesn\'t exist anymore'
            });
        }

        let msg = "";

        if (name && isOnlyString(name)) {
            theCompany.name = name;
            msg += "Name, ";
        }
        if (location && isOnlyString(location)) {
            theCompany.location = location;
            msg += "Location, ";
        }
        if (domaine && isOnlyString(domaine)) {
            theCompany.domaine = domaine;
            msg += "Domaine, ";
        }
        if (email && isValidEmail(email)) { // Assuming you have a function to validate email
            theCompany.email = email;
            msg += "Email, ";
        }
        if (password && password.length >= 8 && password.length <= 32) {
            const hashedPass = await hashPassword(password); // Assuming you have a hashPassword function
            theCompany.password = hashedPass;
            msg += "Password, ";
        }
        if (website && isValidURL(website)) { // Assuming you have a function to validate URL
            theCompany.website = website;
            msg += "Website, ";
        }
        if (description && isOnlyString(description)) {
            theCompany.description = description;
            msg += "Description. ";
        }

        await theCompany.save();

        if (msg.length > 0) msg += "Have been changed successfully.";
        else msg = "No changes have been done.";

        return res.status(200).json({
            msg
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            err: 'Error occurred while attempting to edit company\'s info'
        });
    }
};

const createIntership = async (req, res) => {
    try{
        const token = req.cookies.token;
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    
        const {title, description, location, duration} = req.body
        const image = req.file

        console.log(title, description, location, duration);

        if(!title){
            console.log('Title is required');
            return res.status(400).json({
                err: `Title is required`
            })
        }
        else if(!isOnlyString(title)){
            console.log('no numbers or special characters are allowed on the title');
            return res.status(400).json({
                err: `no numbers or special characters are allowed on the title`
            })
        }

        if(!description){
            console.log('description is required');
            return res.status(400).json({
                err: `description is required`
            })
        }

        if(!location){
            console.log('location is required');
            return res.status(400).json({
                err: `location is required`
            })
        }

        if(!duration){
            console.log('duration is required');
            return res.status(400).json({
                err: `duration is required`
            })
        }

        if(!image){
            console.log('image is required');
            return res.status(400).json({
                err: `image is required`
            })
        }

        await intership.create({
            title,
            description,
            location,
            duration,
            company: decoded.companyId,
            image: image?.path
        })

        return res.status(200).json({
            msg: `Intership record Created successfully`
        })
        
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            err: `Error ocurred while attempting to create a new intership record`
        })
    }
}

const createChallenge = async (req, res) => {
    try{
        // const token = req.cookies.token;
        // const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        const {title, description, level, expireAt} = req.body
        const challengeFile = req.file

        const {intershipId} = req.params

        if(!title && isOnlyString(title)){
            console.log('title is required');
            return res.status(400).json({
                err: `title is required`
            })
        }

        if(!description && isOnlyString(description)){
            console.log('description is required');
            return res.status(400).json({
                err: `description is required`
            })
        }

        if(!level && isOnlyString(level)){
            console.log('level is required');
            return res.status(400).json({
                err: `level is required`
            })
        }

        if(!expireAt){
            console.log('expireAt is required');
            return res.status(400).json({
                err: `expireAt is required`
            })
        }

        if(!challengeFile){
            console.log('challenge is required');
            return res.status(400).json({
                err: `challenge is required`
            })
        }

        await challenge.create({
            title,
            description,
            level,
            intership: intershipId,
            expireAt : Date.now() + expireAt * 86400000,
            challenge : challengeFile?.path
        })

        return res.status(200).json({
            msg: `Challenge created successfully`
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            err: `Error Ocurred while attempting to create challenege`
        })
    }
}

//for company: get the list of all submission of the challenge she offer
const getAllSubmissions = async (req, res) => {
    try{
        const {challengeId} = req.params

        const theSubmisions = await submissions.find({challenge: challengeId})
        return res.status(200).json(theSubmisions)

    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            err: `Error Ocurred while attempting to get student's submissions`
        })
    }
}

//get all challenges of certain intership
const getAllChallenges = async (req, res) => {
    try{    
        // const token = req.cookies.token
        // const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        const {intershipId} = req.params

        const theChallenges = await challenge.find({intership: intershipId})
        return res.status(200).json({theChallenges})
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            err: `Error Ocurred while attempting to get interships's challenges`
        })
    }
}

const acceptedIntership = async (req, res) => {
    try{
        const token = req.cookies.token
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        const {studentId, intershipId} = req.body
        const theStudent = await findOne({_id: studentId})
        const theIntership = await findOne({_id: intershipId})

        const intershipName = theIntership.name
        const stduentEmail = theStudent.email
        
        //send email of acceptance
        const mailOptions = {
            from: process.env.AUTH_EMAIL,
            to: stduentEmail,
            subject: "Congratulations Student",
            html: `<p/>Your InterNest Intership Application in ${intershipName} have gotten the company crazy and decided to give you the chance 
                        tp prove yourself, contact us soon.`
        }
        await transporter.sendMail(mailOptions)

        theStudent.intership.push(theIntership._id)
        await theStudent.save()

        return res.status(200).json({
            msg: `Congrats, you are accepted in the intership`
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            err: `Error Ocurred while attempting to accept student`
        })
    }
}

const getOneIntership = async (req, res) => {
    try{
        // const token = req.cookies.token
        // const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        const {intershipId} = req.params
        const theIntership = await intership.findOne({_id: intershipId}).populate('company', 'name')
        if(!theIntership){
            console.log('the intership have been found or does not exist anymore');
            return res.status(404).json({
                err: `the intership have been found or does not exist anymore`
            })
        }

        console.log('Intership Found');
        return res.status(200).json({theIntership})
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            err: `Error Ocurred while attempting to get the intership record`
        })
    }
}

module.exports = {getProfile, 
                editInfo, 
                createIntership, 
                createChallenge, 
                getAllSubmissions, 
                getAllChallenges, 
                getOneIntership,
                acceptedIntership}