/**
 * Sanitizes user input text by escaping special HTML characters
 * to prevent Cross-Site Scripting (XSS) attacks.
 */

// Map of HTML characters to their corresponding safe entities
const HTML_ESCAPES = {
  "&": "&",
  "<": "<",
  ">": ">",
  '"': '"',
  "'": "'",
  "/": "/",
  "`": "`",
  "=": "=",
};

const ESCAPE_REGEX = /[&<>"'`=/]/g;

/**
 * Escapes special characters in a string for use in HTML.
 *
 * @param {unknown} input - The input to sanitize.
 * @returns {string} The sanitized string, or an empty string if input is invalid/empty.
 */
export function sanitizeInput(input) {
  if (typeof input !== "string") {
    if (input === null || input === undefined) return "";
    input = String(input);
  }

  return input.replace(ESCAPE_REGEX, (char) => HTML_ESCAPES[char]);
}

/**
 * Unescapes HTML entities back to their raw characters (useful for editing stored data).
 *
 * @param {unknown} input - The escaped string to restore.
 * @returns {string} The unescaped string.
 */
export function unsanitizeInput(input) {
  if (typeof input !== "string") return "";

  return input
    .replace(/&/g, "&")
    .replace(/</g, "<")
    .replace(/>/g, ">")
    .replace(/"/g, '"')
    .replace(/'/g, "'")
    .replace(/\//g, "/")
    .replace(/`/g, "`")
    .replace(/=/g, "=");
}
