import { customAlphabet } from 'nanoid';

// Create a custom alphabet for readable IDs (no confusing characters)
const nanoid = customAlphabet('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz', 8);

/**
 * Generate a unique ID for database entities
 * @param {string} prefix - The entity type prefix (e.g., 'post', 'user', 'circle')
 * @param {string} format - Either 'sequential' for numbered IDs or 'random' for nanoid
 * @returns {string} Generated ID
 */
export function generateId(prefix, format = 'random') {
    if (format === 'sequential') {
        // For sequential IDs like post_001, circle_002, etc.
        // This would require checking the database for the highest number
        // For now, we'll use a timestamp-based approach for uniqueness
        const timestamp = Date.now().toString().slice(-6);
        return `${prefix}_${timestamp}`;
    } else {
        // For random IDs like post_a1b2c3d4
        return `${prefix}_${nanoid()}`;
    }
}

/**
 * Generate a simple numeric ID for compatibility with existing data
 * @param {string} prefix - The entity type prefix
 * @returns {string} Generated ID in format prefix_XXX
 */
export function generateSimpleId(prefix) {
    // Generate a random 3-digit number for simplicity
    const randomNum = Math.floor(Math.random() * 900) + 100; // 100-999
    return `${prefix}_${randomNum}`;
}
