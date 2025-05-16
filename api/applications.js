// /api/applications.js

const serverless = require('serverless-http');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// ----- Mongoose Connection and Model Caching ----- //

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    throw new Error('Missing MONGODB_URI!');
}

let cached = global.mongoose;
if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
    if (cached.conn) return cached.conn;
    if (!cached.promise) {
        cached.promise = mongoose.connect(MONGODB_URI).then(mongoose => mongoose);
    }
    cached.conn = await cached.promise;
    return cached.conn;
}

// Define/get the model only once (prevents OverwriteModelError)
const applicationSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    dateOfBirth: Date,
    nationality: String,
    email: String,
    phone: String,
    departureDate: Date,
    returnDate: Date,
    accommodation: String,
    specialRequests: String,
    healthDeclaration: Boolean,
    emergencyContactName: String,
    emergencyContactPhone: String,
    emergencyContactEmail: String,
    medicalConditions: String,
    applicationDate: { type: Date, default: Date.now },
    status: { type: String, default: "Pending", enum: ["Pending", "Approved", "Rejected"] }
});
const Application = mongoose.models.Application || mongoose.model('Application', applicationSchema);

// ------------- Routes ------------- //

app.post('/', async (req, res) => {
    await dbConnect();
    console.log("BODY:", req.body);
    try {
        const doc = new Application(req.body);
        const saved = await doc.save();
        console.log("Saved:", saved._id);
        res.status(201).json({
            success: true,
            applicationId: saved._id,
            message: "Application submitted successfully"
        });
    } catch (error) {
        console.error("SAVE ERROR:", error);
        res.status(500).json({
            success: false,
            message: "An error occurred while submitting your application"
        });
    }
});

app.get('/:id', async (req, res) => {
    await dbConnect();
    try {
        const application = await Application.findById(req.params.id);
        if (!application) {
            return res.status(404).json({
                success: false,
                message: "Application not found"
            });
        }
        res.status(200).json({
            success: true,
            application: application
        });
    } catch (error) {
        console.error("GET ERROR:", error);
        res.status(500).json({
            success: false,
            message: "An error occurred while getting the application"
        });
    }
});

module.exports = serverless(app);