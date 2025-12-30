/**
 * Drive Routes
 * API endpoints for Firestore drive metadata operations
 */

import express from 'express';
import { authenticateUser } from '../middleware/auth.middleware.js';
import * as firestoreService from '../services/firestoreService.js';

const router = express.Router();

/**
 * POST /api/drive/sync
 * Sync a drive item's metadata to Firestore
 */
router.post('/sync', authenticateUser, async (req, res) => {
    try {
        const { userId } = req;
        const { metadata } = req.body;

        if (!metadata) {
            return res.status(400).json({
                error: 'Bad Request',
                message: 'Metadata is required'
            });
        }

        const result = await firestoreService.syncMetadata(userId, metadata);

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
 * POST /api/drive/batch-sync
 * Batch sync multiple items
 */
router.post('/batch-sync', authenticateUser, async (req, res) => {
    try {
        const { userId } = req;
        const { items } = req.body;

        if (!items || !Array.isArray(items)) {
            return res.status(400).json({
                error: 'Bad Request',
                message: 'Items array is required'
            });
        }

        const result = await firestoreService.batchSyncMetadata(userId, items);

        res.json({
            success: true,
            data: result
        });
    } catch (error) {
        console.error('Batch sync error:', error);
        res.status(500).json({
            error: 'Internal Server Error',
            message: error.message
        });
    }
});

/**
 * GET /api/drive/list
 * List all drive items for the authenticated user
 */
router.get('/list', authenticateUser, async (req, res) => {
    try {
        const { userId } = req;
        const items = await firestoreService.listUserItems(userId);

        res.json({
            success: true,
            data: {
                items,
                count: items.length
            }
        });
    } catch (error) {
        console.error('List items error:', error);
        res.status(500).json({
            error: 'Internal Server Error',
            message: error.message
        });
    }
});

/**
 * GET /api/drive/item/:itemId
 * Get a specific drive item
 */
router.get('/item/:itemId', authenticateUser, async (req, res) => {
    try {
        const { userId } = req;
        const { itemId } = req.params;

        const item = await firestoreService.getItem(userId, itemId);

        res.json({
            success: true,
            data: item
        });
    } catch (error) {
        console.error('Get item error:', error);
        res.status(500).json({
            error: 'Internal Server Error',
            message: error.message
        });
    }
});

/**
 * DELETE /api/drive/item/:itemId
 * Delete a drive item
 */
router.delete('/item/:itemId', authenticateUser, async (req, res) => {
    try {
        const { userId } = req;
        const { itemId } = req.params;

        const result = await firestoreService.deleteItem(userId, itemId);

        res.json({
            success: true,
            data: result
        });
    } catch (error) {
        console.error('Delete item error:', error);
        res.status(500).json({
            error: 'Internal Server Error',
            message: error.message
        });
    }
});

/**
 * PATCH /api/drive/item/:itemId/status
 * Update sync status of an item
 */
router.patch('/item/:itemId/status', authenticateUser, async (req, res) => {
    try {
        const { userId } = req;
        const { itemId } = req.params;
        const { status } = req.body;

        if (!status) {
            return res.status(400).json({
                error: 'Bad Request',
                message: 'Status is required'
            });
        }

        const result = await firestoreService.updateSyncStatus(userId, itemId, status);

        res.json({
            success: true,
            data: result
        });
    } catch (error) {
        console.error('Update status error:', error);
        res.status(500).json({
            error: 'Internal Server Error',
            message: error.message
        });
    }
});

/**
 * GET /api/drive/stats
 * Get sync statistics for the user
 */
router.get('/stats', authenticateUser, async (req, res) => {
    try {
        const { userId } = req;
        const stats = await firestoreService.getSyncStats(userId);

        res.json({
            success: true,
            data: stats
        });
    } catch (error) {
        console.error('Get stats error:', error);
        res.status(500).json({
            error: 'Internal Server Error',
            message: error.message
        });
    }
});

export default router;
