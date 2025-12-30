/**
 * Firebase Admin SDK Configuration
 * Initializes Firebase Admin using base64 encoded service account from .env
 */

import admin from 'firebase-admin';

let firebaseApp = null;
let firestore = null;

/**
 * Initialize Firebase Admin SDK
 */
export function initializeFirebase() {
    try {
        // Decode base64 service account
        const base64ServiceAccount = process.env.FIREBASE_SERVICE_ACCOUNT_BASE64;
        if (!base64ServiceAccount) {
            throw new Error('FIREBASE_SERVICE_ACCOUNT_BASE64 is not set in environment variables');
        }

        const serviceAccount = JSON.parse(
            Buffer.from(base64ServiceAccount, 'base64').toString('utf-8')
        );

        // Initialize Firebase Admin
        firebaseApp = admin.initializeApp({
            credential: admin.credential.cert(serviceAccount)
        });

        firestore = admin.firestore();

        console.log('✅ Firebase Admin SDK initialized successfully');
        console.log(`📦 Firestore Database ready`);

        return { app: firebaseApp, db: firestore };
    } catch (error) {
        console.error('❌ Failed to initialize Firebase:', error.message);
        throw error;
    }
}

/**
 * Get Firestore instance
 */
export function getFirestore() {
    if (!firestore) {
        throw new Error('Firebase not initialized. Call initializeFirebase() first.');
    }
    return firestore;
}

/**
 * Get Firebase Admin app instance
 */
export function getFirebaseApp() {
    if (!firebaseApp) {
        throw new Error('Firebase not initialized. Call initializeFirebase() first.');
    }
    return firebaseApp;
}
