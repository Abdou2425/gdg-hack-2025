//cpmpany models
const company = require(`../models/company`)

//middlewares
const {isOnlyString} = require(`../middlewares/isOnlyString`)
const {isValidEmail} = require(`../middlewares/isValidEmail`)
const {isValidURL} = require(`../middlewares/isValidUrl`)
const {hashPassword, comparePassword} = require(`../middlewares/hashing`)

//cookie package
const jwt = require(`jsonwebtoken`)

const register = async (req, res) => {
    try{
        const {name, location, domaine, email, password, website, description} = req.body
        const certificate = req.file

        console.log(name, location, domaine, email, password, website, description);
        console.log(certificate);

        //check name
        if(!name){
            console.log('Name is required');
            return res.status(400).json({
                status: `Failed`,
                err: `Name is required`
            })
        }
        else if(!isOnlyString(name)){
            console.log('Name cannot contain numbers or any special characters');
            return res.status(400).json({
                status: `Failed`,
                err: 'Name cannot contain numbers or any special characters'
            })
        }
    
        //check localisation
        if(!location){
            console.log('location is required');
            return res.status(400).json({
                status: `Failed`,
                err: `Location is required`
            })
        }
    
        //check domaine
        if(!domaine){
            console.log('Domaine is required');
            return res.status(400).json({
                status: `Failed`,
                err: `Domaine is required`
            })
        }
    
        //check email
        if(!email){
            console.log('Email is required');
            return res.status(400).json({
                status: `Failed`,
                err: `Email is required`
            })
        }
        else {
            if(!isValidEmail(email)){
            console.log('Enter a valid email addresse');
            return res.status(400).json({
                status: `Failed`,
                err: `Enter a valid email addresse`
            })}
    
            const existingEmail = await company.find({email})
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
    
        //check website
        if(!website){
            console.log('website is required');
            return res.status(400).json({
                status: `Failed`,
                err: `website is required`
            })
        }
        else if(!isValidURL(website)){
            console.log('website url nust be is a valid format');
            return res.status(400).json({
                status: `Failed`,
                err: `website url nust be is a valid format`
            })
        }
    
        if(!description){
            console.log('description is required');
            return res.status(400).json({
                status: `Failed`,
                err: "description is required"
            })
        }
    
        const hashedPass = await hashPassword(password)
    
        await company.create({name,
                            location,
                            email,
                            domaine,
                            password: hashedPass,
                            website,
                            description,
                            certificate: certificate?.path
        })
        console.log('company record created successfully');
        return res.status(200).json({
            status: "Success",
            msg: `company record created successfully`
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            status: `Failed`,
            err: `Error Occurred when attempting to register`
        })
    }

}

const login = async (req, res) => {
    try{
        const {email, password} = req.body

        const existingCompany = await company.findOne({email})
        if(!existingCompany){
            console.log('there is no company with such email');
            return res.status(404).json({
                status: `Failed`,
                err: 'there is no company with such email'
            })
        }
        else if(!existingCompany.verified){
            console.log('Company isnt verified yet');
            return res.status(401).json({
                status: "Unauthorized",
                err: 'Company isnt verified yet'
            })
        }

        const match = await comparePassword(password, existingCompany.password)
        if(match){
            console.log('logged in successfully');
            jwt.sign({
                    companyId: existingCompany._id,
                    companyName: existingCompany.name,
                    companyEmail: existingCompany.email,
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
    catch(error){
        console.log(error);
        return res.status(500).json({
            status: `Failed`,
            err: `Error Ocurred while attempting to login`
        })
    }
}

const logout = async (req, res) => {
    try{
        // Clear the token from the cookie
        res.clearCookie('token');

        console.log('Company logged out successfully');
        return res.status(200).json({
            msg: 'Logged out successfully'
        });
    }catch (error) {
        console.log(error.message);
        return res.status(500).json({
            err: 'Error while attemting to logout'
        });
    }
}

module.exports = {register, login, logout}