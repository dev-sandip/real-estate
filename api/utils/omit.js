/**
 * Creates a new object with the specified keys omitted.
 *
 * @param obj - The object from which to omit keys.
 * @param keys - An array of keys to omit from the object.
 * @returns A new object with the specified keys omitted.
 */
const omit = (obj, keys) => {
    const newObj = { ...obj };
    keys.forEach((key) => delete newObj[key]);
    return newObj;
};
export default omit;
