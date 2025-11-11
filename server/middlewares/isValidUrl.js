const isValidURL = (url) => {
    // Regular expression to validate the URL
    const urlPattern = /^(https?:\/\/)?(www\.)?([a-zA-Z0-9-]+\.[a-zA-Z]{2,})(\/[^\s]*)?$/;
    return urlPattern.test(url);
}

module.exports = {isValidURL}