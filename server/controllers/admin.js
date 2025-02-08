const company = require(`../models/company`)
const admin = require(`../models/admin`)

const {hashPassword, comparePassword} = require(`../middlewares/hashing`)

const login = async (req, res) => {
    try{
        const {password} = req.body

        const theAdmin = await admin.find()
        const match = await comparePassword(password, theAdmin[0].password)
        if(match){
            console.log('logged in successfully');
            jwt.sign({
                    AdminId: theAdmin[0]._id
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
            console.log('Wrong password');
            return res.status(401).json({
                err: `Unauthorized, Wrong Password`
            })
        }
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            err: `Error ocurred while attempting to login for the admin`
        })
    }

}

const logout = (req, res) => {
    try{
        // Clear the token from the cookie
        res.clearCookie('token');

        console.log('Admin logged out successfully');
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


const getUnverifiedCompanies = async (req, res) => {
    try{
        const token = req.cookies.token;
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        
        const theCompanies = await company.find({verified: false})
                                            .select(`_id name location domaine email website certificate logo`)
        return res.status(200).json(theCompanies)
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            err: `Error Ocurred while attempting to get Unverified Companies from DB`
        })
    }
}

const verifyCompany = async (req ,res) => {
    try{
        const token = req.cookies.token;
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        const {companyId} = req.body
        await company.updateOne(
            {_id: companyId}, {verified : true}
        )

        return res.status(200).json({
            msg: `Company verified successfully`
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            err: `Error Ocurred while attemptig to verify companies`
        })
    }
}

module.exports = {login, logout, getUnverifiedCompanies, verifyCompany}