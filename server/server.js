const express = require(`express`)
const cors = require(`cors`)
const dotenv = require(`dotenv`).config()
const {mongoose} = require(`mongoose`)
const cookieParser = require(`cookie-parser`)
const path = require("path");

//database connection
mongoose.connect(process.env.DATABASE_URL)
    .then( () => console.log(`database connected`) )
    .catch(error => console.log(`database connection echec`, error.message)
)

//intilize express
const app = express()

//middlewares
app.use(cookieParser())
app.use(express.urlencoded({extended : false}))
app.use(express.json())

app.use("/certificates", express.static(path.join(__dirname, "certificates")));
app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/challenges", express.static(path.join(__dirname, "challenges")));
app.use("/submissions", express.static(path.join(__dirname, "submissions")));



//create the admin
const {createAdmin} = require(`./middlewares/createAdmin`)
createAdmin()

//import student Auth API
const studentAuth = require(`./routes/studentAuth`)
const studentProfile = require(`./routes/studentProfile`)
app.use(`/student`, studentAuth, studentProfile)

//import company Auth Api
const companyAuth = require(`./routes/companyAuth`)
const companyProfile = require(`./routes/companyProfile`)
app.use(`/company`, companyAuth, companyProfile)

//import engagmenet Api
const engagment = require(`./routes/studentEngagement`)
app.use(`/engaement`, engagment) 

//import admin Api
const admin = require(`./routes/admin`)
app.use(`/admin`, admin)

//start listening to requests
app.listen(process.env.PORT, () =>{
    console.log(`app running on port ${process.env.PORT}`);
})