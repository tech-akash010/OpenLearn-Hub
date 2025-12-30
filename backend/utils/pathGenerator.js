/**
 * Path Generator Utility
 * Generates structured Firebase Storage paths and sanitizes filenames
 */

/**
 * Sanitize a string for use in file paths
 * Removes special characters and replaces spaces with underscores
 */
export function sanitizePathSegment(segment) {
    return segment
        .replace(/[^a-zA-Z0-9\s\-_.]/g, '') // Remove special chars except space, dash, underscore, dot
        .replace(/\s+/g, '_') // Replace spaces with underscores
        .replace(/_+/g, '_') // Replace multiple underscores with single
        .replace(/^_|_$/g, ''); // Remove leading/trailing underscores
}

/**
 * Generate Firebase Storage path for a file
 * Format: users/{userId}/{subjectName}/{topicName}/{subtopicName}/{filename}
 */
export function generateStoragePath(userId, metadata) {
    const { subjectName, topicName, subtopicName, filename } = metadata;

    const sanitizedSubject = sanitizePathSegment(subjectName);
    const sanitizedTopic = sanitizePathSegment(topicName);
    const sanitizedSubtopic = sanitizePathSegment(subtopicName);
    const sanitizedFilename = sanitizePathSegment(filename);

    return `users/${userId}/${sanitizedSubject}/${sanitizedTopic}/${sanitizedSubtopic}/${sanitizedFilename}`;
}

/**
 * Generate a structured filename based on metadata
 * Format: Subject_Topic_Subtopic_Title.ext
 */
export function generateStructuredFilename(metadata) {
    const { subjectName, topicName, subtopicName, title, extension = 'pdf' } = metadata;

    const parts = [
        sanitizePathSegment(subjectName),
        sanitizePathSegment(topicName),
        sanitizePathSegment(subtopicName),
        sanitizePathSegment(title)
    ].filter(Boolean);

    return `${parts.join('_')}.${extension}`;
}

/**
 * Extract file extension from filename
 */
export function getFileExtension(filename) {
    const lastDot = filename.lastIndexOf('.');
    return lastDot !== -1 ? filename.substring(lastDot + 1) : 'pdf';
}
