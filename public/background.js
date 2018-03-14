function getCookies(domain, name, callback) {
    chrome.cookies.get({ "url": domain, "name": name }, function (cookie) {
        if (callback) {
            callback(cookie.value);
        }
    });
}

getCookies("https://timesheets.cronos.be/", "timesheetapp_user_authenticateduser", function (id) {
    console.log(id);
});

function askHello() {
    return "Hello";
};

getAuthenticatedUser = (url, name) => {
    // getCookies("https://timesheets.cronos.be/", "timesheetapp_user_authenticateduser", function (id) {
    //     console.log('hi');
    //     console.log(id);
    //     return id;
    // })

    chrome.cookies.get({ "url": url, "name": name }, function (cookie) {
        if (callback) {
            callback(cookie.value);
        }
    });
};