//check if the string is only contain characters and does not contain any numbers

const isOnlyString = (str) => {
    // Regular expression to check if the string contains only letters (a-z, A-Z) and spaces
    const regex = /^[a-zA-Z\s]+$/;

    // Test the string against the regex and return the result
    return regex.test(str);
}

module.exports = {isOnlyString}