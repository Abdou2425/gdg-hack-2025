
# InterNest app
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)![TailwindCSS](https://img.shields.io/badge/TailwindCSS-0F172A?style=for-the-badge&logo=tailwindcss&logoColor=38BDF8)
![Node.js](https://img.shields.io/badge/Node.js-303030?style=for-the-badge&logo=node.js&logoColor=3C873A)
![Express](https://img.shields.io/badge/Express-FFFFFF?style=for-the-badge&logo=express&logoColor=000000)
![MongoDB](https://img.shields.io/badge/MongoDB-001E2B?style=for-the-badge&logo=mongodb&logoColor=4FAA41)



## Overview
Developed a full-stack web application that **connects students with companies** offering internships or job opportunities, Based on :
- Companies Post real-world problems or challenges. 💼🧩
- Students submit their proposed solutions. 🎓📝
- Employers can then review submissions, evaluate candidates, and select the best profiles for internships or job offers. 👔🔍✨ 

Developed as part of **GDG club Algiers hackathon 2025**


## 🎯 Features
### 🔐 Authentication
- **Admin**: Verfiy companies and manage companies, student.
- **Companies/Student**: Provide SignIn/Register pages
### 💻 OTP verification
- While the registration **Students** have a code sent to their emails for more security
### 👤 Profile Section
- Companies and students have a profile page where they can edit their personal information and review their past activities.
### 🏢 Internship Pages
- Students can look for all internships provided by companies and their tasks, also they can submit solution and contact companies.

## 🛠️ Tech Stack

### **Back-end**
![Node.js](https://img.shields.io/badge/Node.js-303030?style=for-the-badge&logo=node.js&logoColor=3C873A)
- Node-js REST Framework
- Email service **nodemailer** to insure more security
- Mongo-db
- Local space to save Assets 

### **Frontend**
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-0F172A?style=for-the-badge&logo=tailwindcss&logoColor=38BDF8)
- CORS for fetching

### **Tools**
- Postman for API testing
- nodemailer for secure authentication

##  🛠️ Setup Instructions
### Prerequisites
- Node.js and npm (for React)
- Mongo-db (database)
- IDE (VS-code)
### Backend Setup
1. Clone the repository:
    ```bash
    git clone https://github.com/Abdou2425/gdg-hack-2025.git
    cd gdg-hack-2025
    ```
2. Install dependencies:
    ```bash
    cd server
    npm install 
    ```
3. Copy the environment variables from the .env.example file, and fill it with your data:
    ```bash
    mv ../server/.env.example .env
    ```
4. Run the server:
    ```bash
    npm start 
    ```
### Frontend Setup
1. Navigate to the frontend directory:
    ```bash
    cd client
    ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Start the development server:
    ```bash
    npm run dev
    ```
## 🧪 Testing the API
Use **Postman** to test the API endpoints try like:
- Create challenge by companie (`POST /company/createIntership/`)
- Student registration (`POST /student/register/`)
- List all internhips (`GET /engaement/getAllInterships/`)
.....

##  👥 Contributors
Kridi mohmaed
## 📜 License
The app was created for **educational purposes** as part of a **Hackathon from the Google Developer Group (GDG) Club Algiers**. It demonstrates practical skills in full-stack development, including backend API creation, frontend web app development.
