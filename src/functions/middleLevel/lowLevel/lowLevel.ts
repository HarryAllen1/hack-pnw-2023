//this is a low level function. It cannot call any other functions
export default function lowLevelFunction1() {
	console.log('this is a low level function.');
}

let defaulturl = 'https://www.google.com';

export const openNewTab = (
	url = defaulturl,
	incognito = false,
	newWindow = false,
	focus = true
) => {
	if (incognito) {
		url = 'chrome://incognito/' + url;
	}
	if (newWindow) {
		chrome.windows.create({ url: url, focused: focus });
	} else {
		chrome.tabs.create({ url: url, active: focus });
	}
};

export const closeTab = (callback: (tab: chrome.tabs.Tab) => boolean) => {
	chrome.tabs.query({}, (tabs) => {
		tabs.forEach((tab) => {
			if (callback(tab)) {
				chrome.tabs.remove(tab.id ? tab.id : -1);
			}
		});
	});
};
