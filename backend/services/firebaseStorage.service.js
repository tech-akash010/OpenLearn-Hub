/**
 * Firebase Storage Service
 * Handles all Firebase Storage operations
 */

import { getStorageBucket } from '../config/firebase.config.js';
import { generateStoragePath, getFileExtension } from '../utils/pathGenerator.js';

/**
 * Upload a file to Firebase Storage
 * @param {string} userId - User ID
 * @param {Object} fileData - File data (buffer or stream)
 * @param {Object} metadata - File metadata (subjectName, topicName, subtopicName, title, filename)
 * @returns {Promise<Object>} Upload result with file path and download URL
 */
export async function uploadFile(userId, fileData, metadata) {
    try {
        const bucket = getStorageBucket();

        // Generate storage path
        const storagePath = generateStoragePath(userId, metadata);
        const file = bucket.file(storagePath);

        // Upload file
        await file.save(fileData, {
            metadata: {
                contentType: metadata.mimeType || 'application/pdf',
                metadata: {
                    userId,
                    subjectName: metadata.subjectName,
                    topicName: metadata.topicName,
                    subtopicName: metadata.subtopicName,
                    title: metadata.title,
                    uploadedAt: new Date().toISOString(),
                    source: metadata.source || 'unknown'
                }
            }
        });

        // Generate signed URL (valid for 7 days)
        const [downloadUrl] = await file.getSignedUrl({
            action: 'read',
            expires: Date.now() + 7 * 24 * 60 * 60 * 1000 // 7 days
        });

        console.log(`✅ File uploaded: ${storagePath}`);

        return {
            success: true,
            storagePath,
            downloadUrl,
            filename: metadata.filename
        };
    } catch (error) {
        console.error('❌ File upload failed:', error);
        throw new Error(`File upload failed: ${error.message}`);
    }
}

/**
 * Save metadata to Firebase Storage (for sync without actual file upload)
 * Creates a metadata JSON file in the user's folder
 */
export async function syncMetadata(userId, metadata) {
    try {
        const bucket = getStorageBucket();

        // Create metadata file path
        const metadataPath = `users/${userId}/_metadata/${metadata.id}.json`;
        const file = bucket.file(metadataPath);

        // Save metadata as JSON
        await file.save(JSON.stringify(metadata, null, 2), {
            metadata: {
                contentType: 'application/json'
            }
        });

        console.log(`✅ Metadata synced: ${metadataPath}`);

        return {
            success: true,
            metadataPath
        };
    } catch (error) {
        console.error('❌ Metadata sync failed:', error);
        throw new Error(`Metadata sync failed: ${error.message}`);
    }
}

/**
 * List all files for a user
 */
export async function listUserFiles(userId) {
    try {
        const bucket = getStorageBucket();
        const [files] = await bucket.getFiles({
            prefix: `users/${userId}/`,
            delimiter: '/'
        });

        const fileList = await Promise.all(
            files
                .filter(file => !file.name.includes('_metadata/')) // Exclude metadata files
                .map(async (file) => {
                    const [metadata] = await file.getMetadata();
                    const [exists] = await file.exists();

                    return {
                        name: file.name,
                        size: metadata.size,
                        contentType: metadata.contentType,
                        created: metadata.timeCreated,
                        updated: metadata.updated,
                        customMetadata: metadata.metadata || {}
                    };
                })
        );

        return fileList;
    } catch (error) {
        console.error('❌ List files failed:', error);
        throw new Error(`List files failed: ${error.message}`);
    }
}

/**
 * Get download URL for a file
 */
export async function getDownloadUrl(userId, filePath) {
    try {
        const bucket = getStorageBucket();
        const file = bucket.file(`users/${userId}/${filePath}`);

        const [exists] = await file.exists();
        if (!exists) {
            throw new Error('File not found');
        }

        // Generate signed URL (valid for 1 hour)
        const [url] = await file.getSignedUrl({
            action: 'read',
            expires: Date.now() + 60 * 60 * 1000 // 1 hour
        });

        return url;
    } catch (error) {
        console.error('❌ Get download URL failed:', error);
        throw new Error(`Get download URL failed: ${error.message}`);
    }
}

/**
 * Delete a file from storage
 */
export async function deleteFile(userId, filePath) {
    try {
        const bucket = getStorageBucket();
        const file = bucket.file(`users/${userId}/${filePath}`);

        await file.delete();
        console.log(`✅ File deleted: ${filePath}`);

        return { success: true };
    } catch (error) {
        console.error('❌ Delete file failed:', error);
        throw new Error(`Delete file failed: ${error.message}`);
    }
}

/**
 * Check if user owns a file (based on upload metadata)
 */
export async function isFileOwner(userId, filePath) {
    try {
        const bucket = getStorageBucket();
        const file = bucket.file(`users/${userId}/${filePath}`);

        const [metadata] = await file.getMetadata();
        const uploaderId = metadata.metadata?.userId;

        return uploaderId === userId;
    } catch (error) {
        return false;
    }
}
