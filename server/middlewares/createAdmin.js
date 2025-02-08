const admin = require(`../models/admin`)
const {hashPassword} = require(`./hashing`)

//env variables
require(`dotenv`).config()

const createAdmin = async () => {
    try {
        const existingAdmin = await admin.findOne();

        if(existingAdmin) {
            console.log('Admin already exists.');
            return;
        }

        const hashedPass = await hashPassword(process.env.ADMIN_PASSWORD)

        // Create a new admin record
        const theAdmin = new admin({
            password: hashedPass
        });
        await theAdmin.save();

        console.log('Admin record created successfully.');
    } 
    catch(error){
        console.error('Error creating admin record:', error);
    }
};

module.exports = {createAdmin}