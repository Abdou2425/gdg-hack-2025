//file upload package
const multer = require(`multer`)
const path = require('path')

//unique string package
const {v4: uuidv4} = require(`uuid`)

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        //cb(null, `../uploads`)
        cb(null, path.join(__dirname, `../challenges/`));
    },
    filename: (req, file, cb) => {
        const randomId = uuidv4()
        const extName = file.originalname.split(".").pop()

        const fileName = `${randomId}.${extName}`
        cb(null, fileName)
    }
})

const fileFilter = (req, file, cb) => {
    const allowedExtensions = [`pdf`, `docx`];

    // Extract the file extension
    const extName = file.originalname.split('.').pop().toLowerCase();

    if (allowedExtensions.includes(extName)) cb(null, true); // Accept the file
    else cb(new Error('File type not allowed. Only pdf docx are allowed.'), false);
};

const multerSingleChallenge = multer({storage: storage, fileFilter: fileFilter}).single(`challenge`)

module.exports = {multerSingleChallenge}