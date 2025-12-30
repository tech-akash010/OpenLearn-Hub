/**
 * OpenLearn-Hub Backend Server
 * Express server with Firestore integration
 */

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { initializeFirebase } from './config/firebase.config.js';
import driveRoutes from './routes/drive.routes.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';

// Middleware
app.use(cors({
    origin: FRONTEND_URL,
    credentials: true
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Request logging
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        service: 'openlearn-hub-backend',
        database: 'firestore'
    });
});

// API Routes
app.use('/api/drive', driveRoutes);

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        error: 'Not Found',
        message: `Route ${req.method} ${req.path} not found`
    });
});

// Error handler
app.use((err, req, res, next) => {
    console.error('Server error:', err);
    res.status(500).json({
        error: 'Internal Server Error',
        message: err.message || 'An unexpected error occurred'
    });
});

// Initialize Firebase and start server
async function startServer() {
    try {
        console.log('🚀 Starting OpenLearn-Hub Backend...\n');

        // Initialize Firebase
        await initializeFirebase();

        // Start Express server
        app.listen(PORT, () => {
            console.log(`\n✅ Server running on http://localhost:${PORT}`);
            console.log(`📡 Frontend URL: ${FRONTEND_URL}`);
            console.log(`🏥 Health check: http://localhost:${PORT}/health`);
            console.log('\n🔥 Firestore Database ready!\n');
        });
    } catch (error) {
        console.error('❌ Failed to start server:', error.message);
        process.exit(1);
    }
}

// Start the server
startServer();
