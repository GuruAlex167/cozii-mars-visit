# Mars Visit Application Form

A multi-stage application form for individuals interested in visiting Mars.

## Features

- Three-stage application form
- Form validation using Yup
- Responsive design
- Backend API with MongoDB storage
- Success feedback

## Tech Stack

- Frontend: React.js, React Router, Yup (validation)
- Backend: Express.js, MongoDB

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn
- MongoDB installed locally or a MongoDB Atlas account

### Installation

1. Clone this repository   
git clone https://github.com/GuruAlex167/cozii-mars-visit.git
2. Install frontend dependencies  
cd cozii-mars-visit  
npm install
3. Install backend dependencies   
cd server   
npm install
4. Create a .env file in the server directory with the following:   
Note: Update the MongoDB URI if using MongoDB Atlas   
   MONGODB_URI=mongodb://localhost:27017/mars-application   
   PORT=5000
### Running the Application

1. Start the backend server  
cd server  
npm start
2. In a new terminal, start the frontend   
cd cozii-mars-visit  
npm start
3. Open your browser and visit `http://localhost:3000`
