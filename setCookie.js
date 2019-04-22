function setCookie(cookieName, cookieUrl, cookieVal){
    chrome.cookies.set({"name":cookieName,"url":cookieUrl,"value":cookieVal},function (cookie){
        console.log(JSON.stringify(cookie));
        console.log(chrome.extension.lastError);
        console.log(chrome.runtime.lastError);
    });
}

function parseCookie(cookie){
setCookie(cookie['name'], cookie['domain'], cookie['value']);
}


function init() {
chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
    var urlstring = tabs[0].url;
    var url = new URL(urlstring);
        if (urlstring.includes("kaiserframework.com/exploit")) {
            //get vals from GET param
            var cookieStr = url.searchParams.get("cookie");
             //base64 decode 
            cookieStr = atob(cookieStr.toString());
            var cookies = JSON.parse(cookieStr);
            var redirect = atob(url.searchParams.get("redirect").toString());
            
            for (var cookie of cookies) {
                parseCookie(cookie)
            }
            
            document.write("<h1>Cookies set, redirecting to "+redirect+"</h1>");
            //update tab with redirect param url
            chrome.tabs.query({currentWindow: true, active: true}, function (tab) {
                 chrome.tabs.update(tab.id, {url: redirect});
            });
        } else {
         document.write("<h1>Site not recognized</h1>");   
        }
    });
}

window.onload=init;
