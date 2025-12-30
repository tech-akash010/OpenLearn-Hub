/**
 * Firestore Service
 * Handles all Firestore database operations for drive metadata
 */

import { getFirestore } from '../config/firebase.config.js';

/**
 * Sync drive item metadata to Firestore
 * @param {string} userId - User ID
 * @param {Object} metadata - Drive item metadata
 * @returns {Promise<Object>} Sync result
 */
export async function syncMetadata(userId, metadata) {
    try {
        const db = getFirestore();

        // Reference: users/{userId}/driveItems/{itemId}
        const docRef = db.collection('users').doc(userId).collection('driveItems').doc(metadata.id);

        // Save metadata
        await docRef.set({
            ...metadata,
            syncedAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        }, { merge: true });

        console.log(`✅ Metadata synced: ${metadata.id} for user ${userId}`);

        return {
            success: true,
            itemId: metadata.id
        };
    } catch (error) {
        console.error('❌ Metadata sync failed:', error);
        throw new Error(`Metadata sync failed: ${error.message}`);
    }
}

/**
 * List all drive items for a user
 */
export async function listUserItems(userId) {
    try {
        const db = getFirestore();
        const snapshot = await db.collection('users').doc(userId).collection('driveItems').get();

        const items = [];
        snapshot.forEach(doc => {
            items.push({
                id: doc.id,
                ...doc.data()
            });
        });

        return items;
    } catch (error) {
        console.error('❌ List items failed:', error);
        throw new Error(`List items failed: ${error.message}`);
    }
}

/**
 * Get a specific drive item
 */
export async function getItem(userId, itemId) {
    try {
        const db = getFirestore();
        const doc = await db.collection('users').doc(userId).collection('driveItems').doc(itemId).get();

        if (!doc.exists) {
            throw new Error('Item not found');
        }

        return {
            id: doc.id,
            ...doc.data()
        };
    } catch (error) {
        console.error('❌ Get item failed:', error);
        throw new Error(`Get item failed: ${error.message}`);
    }
}

/**
 * Delete a drive item
 */
export async function deleteItem(userId, itemId) {
    try {
        const db = getFirestore();
        await db.collection('users').doc(userId).collection('driveItems').doc(itemId).delete();

        console.log(`✅ Item deleted: ${itemId}`);

        return { success: true };
    } catch (error) {
        console.error('❌ Delete item failed:', error);
        throw new Error(`Delete item failed: ${error.message}`);
    }
}

/**
 * Update sync status of an item
 */
export async function updateSyncStatus(userId, itemId, status) {
    try {
        const db = getFirestore();
        await db.collection('users').doc(userId).collection('driveItems').doc(itemId).update({
            syncStatus: status,
            updatedAt: new Date().toISOString()
        });

        return { success: true };
    } catch (error) {
        console.error('❌ Update sync status failed:', error);
        throw new Error(`Update sync status failed: ${error.message}`);
    }
}

/**
 * Batch sync multiple items
 */
export async function batchSyncMetadata(userId, items) {
    try {
        const db = getFirestore();
        const batch = db.batch();

        items.forEach(item => {
            const docRef = db.collection('users').doc(userId).collection('driveItems').doc(item.id);
            batch.set(docRef, {
                ...item,
                syncedAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            }, { merge: true });
        });

        await batch.commit();

        console.log(`✅ Batch synced ${items.length} items for user ${userId}`);

        return {
            success: true,
            count: items.length
        };
    } catch (error) {
        console.error('❌ Batch sync failed:', error);
        throw new Error(`Batch sync failed: ${error.message}`);
    }
}

/**
 * Get sync statistics for a user
 */
export async function getSyncStats(userId) {
    try {
        const db = getFirestore();
        const snapshot = await db.collection('users').doc(userId).collection('driveItems').get();

        const stats = {
            total: snapshot.size,
            uploaded: 0,
            downloaded: 0,
            synced: 0,
            pending: 0,
            failed: 0
        };

        snapshot.forEach(doc => {
            const data = doc.data();
            if (data.source === 'Uploaded') stats.uploaded++;
            if (data.source === 'Downloaded') stats.downloaded++;
            if (data.syncStatus === 'synced') stats.synced++;
            if (data.syncStatus === 'pending') stats.pending++;
            if (data.syncStatus === 'failed') stats.failed++;
        });

        return stats;
    } catch (error) {
        console.error('❌ Get sync stats failed:', error);
        throw new Error(`Get sync stats failed: ${error.message}`);
    }
}
