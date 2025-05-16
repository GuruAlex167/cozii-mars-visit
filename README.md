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
```
git clone https://github.com/GuruAlex167/cozii-mars-visit.git
```

2. Install dependencies 
```
cd cozii-mars-visit  
npm install
```


3. Create a .env file in the server directory with the following:   
Note: Update the MongoDB URI if using MongoDB Atlas   
```   
MONGODB_URI=mongodb://localhost:27017/mars-application   
PORT=5000
```

4. Running the Application
```
npm run start
```

5. Open your browser and visit `http://localhost:3000`


