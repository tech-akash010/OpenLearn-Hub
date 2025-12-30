/**
 * Storage Routes
 * API endpoints for Firebase Storage operations
 */

import express from 'express';
import multer from 'multer';
import { authenticateUser, validateRequestBody } from '../middleware/auth.middleware.js';
import * as storageService from '../services/firebaseStorage.service.js';

const router = express.Router();

// Configure multer for file uploads (memory storage)
const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 50 * 1024 * 1024 // 50MB limit
    }
});

/**
 * POST /api/storage/upload
 * Upload a file to user's Firebase Storage
 */
router.post('/upload', authenticateUser, upload.single('file'), async (req, res) => {
    try {
        const { userId } = req;
        const file = req.file;
        const metadata = JSON.parse(req.body.metadata || '{}');

        if (!file) {
            return res.status(400).json({
                error: 'Bad Request',
                message: 'No file uploaded'
            });
        }

        // Validate metadata
        const requiredFields = ['subjectName', 'topicName', 'subtopicName', 'title', 'filename'];
        const missing = requiredFields.filter(field => !metadata[field]);
        if (missing.length > 0) {
            return res.status(400).json({
                error: 'Bad Request',
                message: `Missing metadata fields: ${missing.join(', ')}`
            });
        }

        // Upload file
        const result = await storageService.uploadFile(userId, file.buffer, {
            ...metadata,
            mimeType: file.mimetype
        });

        res.json({
            success: true,
            data: result
        });
    } catch (error) {
        console.error('Upload error:', error);
        res.status(500).json({
            error: 'Internal Server Error',
            message: error.message
        });
    }
});

/**
 * POST /api/storage/sync-metadata
 * Sync metadata from localStorage to Firebase (without file upload)
 */
router.post('/sync-metadata', authenticateUser, async (req, res) => {
    try {
        const { userId } = req;
        const { metadata } = req.body;

        if (!metadata) {
            return res.status(400).json({
                error: 'Bad Request',
                message: 'Metadata is required'
            });
        }

        const result = await storageService.syncMetadata(userId, metadata);

        res.json({
            success: true,
            data: result
        });
    } catch (error) {
        console.error('Sync metadata error:', error);
        res.status(500).json({
            error: 'Internal Server Error',
            message: error.message
        });
    }
});

/**
 * GET /api/storage/list
 * List all files for the authenticated user
 */
router.get('/list', authenticateUser, async (req, res) => {
    try {
        const { userId } = req;
        const files = await storageService.listUserFiles(userId);

        res.json({
            success: true,
            data: {
                files,
                count: files.length
            }
        });
    } catch (error) {
        console.error('List files error:', error);
        res.status(500).json({
            error: 'Internal Server Error',
            message: error.message
        });
    }
});

/**
 * GET /api/storage/download-url
 * Get a download URL for a specific file
 */
router.get('/download-url', authenticateUser, async (req, res) => {
    try {
        const { userId } = req;
        const { filePath } = req.query;

        if (!filePath) {
            return res.status(400).json({
                error: 'Bad Request',
                message: 'filePath query parameter is required'
            });
        }

        const url = await storageService.getDownloadUrl(userId, filePath);

        res.json({
            success: true,
            data: { downloadUrl: url }
        });
    } catch (error) {
        console.error('Get download URL error:', error);
        res.status(500).json({
            error: 'Internal Server Error',
            message: error.message
        });
    }
});

/**
 * DELETE /api/storage/delete
 * Delete a file from storage
 */
router.delete('/delete', authenticateUser, async (req, res) => {
    try {
        const { userId } = req;
        const { filePath } = req.body;

        if (!filePath) {
            return res.status(400).json({
                error: 'Bad Request',
                message: 'filePath is required'
            });
        }

        const result = await storageService.deleteFile(userId, filePath);

        res.json({
            success: true,
            data: result
        });
    } catch (error) {
        console.error('Delete file error:', error);
        res.status(500).json({
            error: 'Internal Server Error',
            message: error.message
        });
    }
});

/**
 * POST /api/storage/check-ownership
 * Check if the user owns a specific file
 */
router.post('/check-ownership', authenticateUser, async (req, res) => {
    try {
        const { userId } = req;
        const { filePath } = req.body;

        if (!filePath) {
            return res.status(400).json({
                error: 'Bad Request',
                message: 'filePath is required'
            });
        }

        const isOwner = await storageService.isFileOwner(userId, filePath);

        res.json({
            success: true,
            data: { isOwner }
        });
    } catch (error) {
        console.error('Check ownership error:', error);
        res.status(500).json({
            error: 'Internal Server Error',
            message: error.message
        });
    }
});

export default router;
