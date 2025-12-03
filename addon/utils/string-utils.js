/**
 * Converts a camelCase or other string to kebab-case (dasherized)
 * @param {string} str - The string to dasherize
 * @returns {string} The dasherized string
 */
export function dasherize(str) {
  return str
    .replace(/([a-z\d])([A-Z])/g, '$1-$2')
    .replace(/([A-Z]+)([A-Z][a-z\d]+)/g, '$1-$2')
    .toLowerCase();
}

/**
 * Capitalizes the first letter of a string
 * @param {string} str - The string to capitalize
 * @returns {string} The capitalized string
 */
export function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
