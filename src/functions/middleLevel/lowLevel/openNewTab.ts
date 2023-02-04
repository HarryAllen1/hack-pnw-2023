let defaulturl = "https://www.google.com";

export default function openNewTab(url = defaulturl, incognito = false, newWindow = false, focus = true) {
    if (incognito) {
        url = "chrome://incognito/" + url;
    }
    if (newWindow) {
        chrome.windows.create({ url: url, focused: focus });
    }
    else {
        chrome.tabs.create({ url: url, active: focus });
    }
}