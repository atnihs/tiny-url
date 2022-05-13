const URL_Regex = new RegExp("^(http|https)://", "i");

function getURL(url: any) {
  let checkURL = URL_Regex.test(url);
  return checkURL ? checkURL : "https://" + url;
}

function hashRandomURL() {
  let randomString = Math.random().toString(32).substring(2, 8);
  return randomString;
}

export function shortUrl(url: any) {
  let generateURL = getURL(url);
  return hashRandomURL();
}
