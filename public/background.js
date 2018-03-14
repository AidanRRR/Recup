function getAuthenticatedUser(url, name) {
    var getUser = new Promise((resolve, reject) => {
        chrome.cookies.get({ "url": url, "name": name }, resolve);
    });
    return getUser;
};