function setCookie(cookieName, cookieDomain, cookieUrl, cookieVal) {
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
    if (cookie['domain'] == "www.starcowparis.com") cookie['domain'] = ".www.starcowparis.com"
    setCookie(cookie['name'], cookie['domain'], cookie['url'], cookie['value']);
}

function delCookie(cookie) {
    if(cookie['domain'].includes("paypal")) return;
    chrome.cookies.getAll({domain: cookie['domain']}, function(cookies) {
        for(var i=0; i<cookies.length;i++) {
            if (cookies[i].domain.startsWith(".")) {
                url = "www"+cookies[i].domain;
            } else if (cookies[i].domain.startsWith("www")) {
                url = "https://"+cookies[i].domain;
            } else {
                url = cookies[i].domain;
            }
            chrome.cookies.remove({url:  + cookies[i].path, name: cookies[i].name});
        }
    });
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
                delCookie(cookie)
            }

            for (var cookie of cookies) {
                parseCookie(cookie)
            }



            document.write('<body style="background-color: #0a1c2e"><center><h1 style="color: green">Cookies set, redirecting to ' + redirect + '</h1></center></body>');
            //update tab with redirect param url
            chrome.tabs.query({
                currentWindow: true,
                active: true
            }, function (tab) {
                chrome.tabs.update(tab.id, {
                    url: redirect
                });
            });
        }
    });
}

window.onload = init;
