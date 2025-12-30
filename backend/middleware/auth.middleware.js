/**
 * Authentication Middleware
 * Validates user authentication and extracts user ID from requests
 */

/**
 * Simple auth middleware that extracts userId from request headers
 * This matches the existing frontend auth system
 */
export function authenticateUser(req, res, next) {
    const userId = req.headers['x-user-id'];

    if (!userId) {
        return res.status(401).json({
            error: 'Unauthorized',
            message: 'User ID is required. Please login.'
        });
    }

    // Attach userId to request for use in routes
    req.userId = userId;
    next();
}

/**
 * Validate required fields in request body
 */
export function validateRequestBody(requiredFields) {
    return (req, res, next) => {
        const missing = requiredFields.filter(field => !req.body[field]);

        if (missing.length > 0) {
            return res.status(400).json({
                error: 'Bad Request',
                message: `Missing required fields: ${missing.join(', ')}`
            });
        }

        next();
    };
}
