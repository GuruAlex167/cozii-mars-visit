const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

console.log(process.env.MONGODB_URI);
// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Application model schema
const applicationSchema = new mongoose.Schema({
    // Personal Information
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    nationality: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },

    // Travel Preferences
    departureDate: { type: Date, required: true },
    returnDate: { type: Date, required: true },
    accommodation: { type: String, required: true },
    specialRequests: { type: String },

    // Health and Safety
    healthDeclaration: { type: Boolean, required: true },
    emergencyContactName: { type: String, required: true },
    emergencyContactPhone: { type: String, required: true },
    emergencyContactEmail: { type: String, required: true },
    medicalConditions: { type: String },

    // Metadata
    applicationDate: { type: Date, default: Date.now },
    status: { type: String, default: 'Pending', enum: ['Pending', 'Approved', 'Rejected'] }
});

const Application = mongoose.model('Application', applicationSchema);

// Routes
app.post('/api/applications', async (req, res) => {
    try {
        const newApplication = new Application(req.body);
        const savedApplication = await newApplication.save();
        res.status(201).json({
            success: true,
            applicationId: savedApplication._id,
            message: 'Application submitted successfully'
        });
        console.log('Application saved successfully');
    } catch (error) {
        console.error('Error saving application:', error);
        res.status(500).json({
            success: false,
            message: 'An error occurred while submitting your application'
        });
    }
});

app.get('/api/applications/:id', async (req, res) => {
    try {
        const application = await Application.findById(req.params.id);
        if (!application) {
            return res.status(404).json({
                success: false,
                message: 'Application not found'
            });
        }
        res.status(200).json({
            success: true,
            application
        });
    } catch (error) {
        console.error('Error retrieving application:', error);
        res.status(500).json({
            success: false,
            message: 'An error occurred while retrieving the application'
        });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});