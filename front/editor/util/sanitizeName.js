/**
 * Strip whitespace and special characters from a string to make it compatible with filenames and variable names.
 */
export default s => s.toLowerCase().replace(/[^a-z0-9_\-]/gi, '_')