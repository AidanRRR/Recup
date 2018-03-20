function getCookie(url, name) {
    var getToken = new Promise((resolve, reject) => {
        chrome.cookies.get({ "url": url, "name": name }, resolve);
    });
    return getToken;
};