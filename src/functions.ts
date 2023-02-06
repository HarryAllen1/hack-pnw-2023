let defaultURL = 'https://www.google.com';

export const openNewTab = (
	url = defaultURL,
	incognito = false,
	newWindow = false,
	focus = true
) => {
	if (newWindow) {
		chrome.windows.create({ url: url, focused: focus, incognito: incognito });
	} else {
		chrome.tabs.create({ url: url, active: focus });
	}
};
export const closeTabs = (callback: (tab: chrome.tabs.Tab) => boolean) => {
	chrome.tabs.query({}, (tabs) => {
		tabs.forEach((tab) => {
			if (callback(tab)) {
				tab.id ? chrome.tabs.remove(tab.id) : null;
			}
		});
	});
};

export const muteTabs = (callback: (tab: chrome.tabs.Tab) => boolean) => {
	chrome.tabs.query({}, (tabs) => {
		tabs.forEach((tab) => {
			if (callback(tab)) {
				tab.id ? chrome.tabs.update(tab.id, { muted: true }) : null;
			}
		});
	});
};

export const unmuteTabs = (callback: (tab: chrome.tabs.Tab) => boolean) => {
	chrome.tabs.query({}, (tabs) => {
		tabs.forEach((tab) => {
			if (callback(tab)) {
				tab.id ? chrome.tabs.update(tab.id, { muted: false }) : null;
			}
		});
	});
};

export const muteTab = () => {
	muteTabs((tab) => tab.active);
};

export const unmuteTab = () => {
	unmuteTabs((tab) => tab.active);
};

export const duplicateTab = () => {
	chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
		if (tabs[0]) {
			tabs[0].id ? chrome.tabs.duplicate(tabs[0].id) : null;
		}
	});
};

export const openFavorites = () => {
	openNewTab('chrome://bookmarks');
};

export const openDownloads = () => {
	openNewTab('chrome://downloads');
};

export const openHistory = () => {
	openNewTab('chrome://history');
};

export const openExtensions = () => {
	openNewTab('chrome://extensions');
};

export const openSettings = () => {
	openNewTab('chrome://settings');
};

export const openHelp = () => {
	openNewTab('chrome://help');
};

export const clearBrowsingData = (timePeriod: number) => {
	chrome.browsingData.remove(
		{
			since: timePeriod,
		},
		{
			appcache: true,
			cache: true,
			cookies: true,
			downloads: true,
			fileSystems: true,
			formData: true,
			history: true,
			indexedDB: true,
			localStorage: true,
			serverBoundCertificates: true,
			serviceWorkers: true,
			webSQL: true,
		}
	);
};

export const clearCookies = (timePeriod: number) => {
	chrome.browsingData.remove(
		{
			since: timePeriod,
		},
		{
			cookies: true,
		}
	);
};

export const clearCookiesOnPage = () => {
	chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
		if (tabs[0]) {
			chrome.browsingData.remove(
				{
					originTypes: {
						unprotectedWeb: true,
					},
				},
				{
					cookies: true,
				}
			);
		}
	});
};

export const clearHistory = (timePeriod: number) => {
	chrome.browsingData.remove(
		{
			since: timePeriod,
		},
		{
			history: true,
		}
	);
};

export const clearCache = (timePeriod: number) => {
	chrome.browsingData.remove(
		{
			since: timePeriod,
		},
		{
			cache: true,
		}
	);
};

export const clearPasswords = (timePeriod: number) => {
	chrome.browsingData.remove(
		{
			since: timePeriod,
		},
		{
			passwords: true,
		}
	);
};

export const clearFormData = (timePeriod: number) => {
	chrome.browsingData.remove(
		{
			since: timePeriod,
		},
		{
			formData: true,
		}
	);
};

export const scrollToTop = () => {
	chrome.tabs.executeScript({
		code: 'window.scrollTo({ top: 0, behavior: "smooth" });',
	});
};

export const scrollToBottom = () => {
	chrome.tabs.executeScript({
		code: 'window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });',
	});
};

export const scrollDown = (amount = 100) => {
	chrome.tabs.executeScript({
		code: `window.scrollBy(0, ${amount});`,
	});
};

export const scrollUp = (amount = 100) => {
	chrome.tabs.executeScript({
		code: `window.scrollBy(0, -${amount});`,
	});
};

export const scrollLeft = (amount = 100) => {
	chrome.tabs.executeScript({
		code: `window.scrollBy(-${amount}, 0);`,
	});
};

export const scrollRight = (amount = 100) => {
	chrome.tabs.executeScript({
		code: `window.scrollBy(${amount}, 0);`,
	});
};

export const zoomIn = (amount = 0.1) => {
	chrome.tabs.getZoom((zoomFactor) => {
		chrome.tabs.setZoom(zoomFactor + amount);
	});
};

export const zoomOut = (amount = 0.1) => {
	chrome.tabs.getZoom((zoomFactor) => {
		chrome.tabs.setZoom(zoomFactor - amount);
	});
};

export const zoomReset = () => {
	chrome.tabs.setZoom(1);
};

export const setZoom = (amount: number) => {
	chrome.tabs.setZoom(amount);
};

export const waitForTabToLoad = (callback: () => void) => {
	chrome.tabs.onUpdated.addListener(function listener(tabId, changeInfo) {
		if (changeInfo.status === 'complete') {
			chrome.tabs.onUpdated.removeListener(listener);
			callback();
		}
	});
};

export const waitSeconds = (seconds: number) => {
	return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
};

export const waitMilliseconds = (milliseconds: number) => {
	return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

export const waitUntilElementExists = (selector: string) => {
	return new Promise<void>((resolve) => {
		const interval = setInterval(() => {
			if (document.querySelector(selector)) {
				clearInterval(interval);
				resolve();
			}
		}, 100);
	});
};

export const clickOn = (selector: string) => {
	const element = document.querySelector(selector);
	if (element) {
		(element as HTMLElement).click();
	}
};

export const previousTab = () => {
	chrome.tabs.query({ currentWindow: true }, (tabs) => {
		if (tabs[0]) {
			const activeTabIndex = tabs.findIndex((tab) => tab.active);
			const previousTabIndex = activeTabIndex - 1;
			const previousTab = tabs[previousTabIndex];
			if (previousTab) {
				previousTab.id
					? chrome.tabs.update(previousTab.id, { active: true })
					: null;
			}
		}
	});
};

export const nextTab = () => {
	chrome.tabs.query({ currentWindow: true }, (tabs) => {
		if (tabs[0]) {
			const activeTabIndex = tabs.findIndex((tab) => tab.active);
			const nextTabIndex = activeTabIndex + 1;
			const nextTab = tabs[nextTabIndex];
			if (nextTab) {
				nextTab.id ? chrome.tabs.update(nextTab.id, { active: true }) : null;
			}
		}
	});
};

export const previousPage = () => {
	chrome.tabs.executeScript({
		code: 'history.back();',
	});
};

export const nextPage = () => {
	chrome.tabs.executeScript({
		code: 'history.forward();',
	});
};

export const reloadPage = () => {
	chrome.tabs.reload();
};

export const reloadPageBypassingCache = () => {
	chrome.tabs.reload({ bypassCache: true });
};

export const replaceTextInPage = (find: string, replace: string) => {
	chrome.tabs.executeScript({
		code: `document.body.innerHTML = document.body.innerHTML.replace(/${find}/g, '${replace}');`,
	});
};

export const downloadPage = () => {
	chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
		if (tabs[0]) {
			chrome.downloads.download({
				url: tabs[0].url ? tabs[0].url : '',
			});
		}
	});
};

export const downloadImage = () => {
	chrome.tabs.executeScript(
		{
			code: `document.querySelector('img').src;`,
		},
		(results) => {
			if (results) {
				chrome.downloads.download({
					url: results[0],
				});
			}
		}
	);
};

export const postMessageToActiveTab = (message: any) => {
	chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
		if (tabs[0]) {
			chrome.tabs.sendMessage(tabs[0].id ? tabs[0].id : 0, message);
		}
	});
};

export const switchToTabByIndex = (tabId: number) => {
	chrome.tabs.update(tabId, { active: true });
};

export const switchToTab = (callback: (tab: chrome.tabs.Tab) => boolean) => {
	chrome.tabs.query({ currentWindow: true }, (tabs) => {
		const tab = tabs.find(callback);
		if (tab) {
			tab.id ? chrome.tabs.update(tab.id, { active: true }) : null;
		}
	});
};

export const switchToTabByTitle = (title: string) => {
	switchToTab((tab) => tab.title === title);
};

export const switchToTabByUrlContains = (url: string) => {
	switchToTab((tab) => (tab.url ? tab.url.includes(url) : false));
};

export const startReadingAloud = (element = document.body.innerText) => {
	chrome.tts.speak(element);
};

export const stopReadingAloud = () => {
	chrome.tts.stop();
};

export const reopenClosedTab = (numberOfTabs = 1) => {
	chrome.sessions.getRecentlyClosed(
		{ maxResults: numberOfTabs },
		(sessions) => {
			sessions.forEach((session) => {
				if (session.tab) {
					chrome.sessions.restore(session.tab.sessionId);
				}
			});
		}
	);
};

export const invertColor = () => {
	chrome.tabs.executeScript({
		code: `document.body.style.filter = 'hue-rotate(180deg)';`,
	});
};

export const randomColor = () => {
	const randomColor = Math.floor(Math.random() * 16777215).toString(16);
	chrome.tabs.executeScript({
		code: `document.body.style.filter = 'hue-rotate(${randomColor}deg)';`,
	});
};

export const scrollToElement = (selector: string) => {
	chrome.tabs.executeScript({
		code: `document.querySelector('${selector}').scrollIntoView();`,
	});
};

export const getTabUrl = () => {
	chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
		if (tabs[0]) {
			return tabs[0].url;
		}
	});
};

export const getTabTitle = () => {
	chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
		if (tabs[0]) {
			return tabs[0].title;
		}
	});
};

export const getTabId = () => {
	chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
		if (tabs[0]) {
			return tabs[0].id;
		}
	});
};

export const getNumberOfTabs = () => {
	chrome.tabs.query({ currentWindow: true }, (tabs) => {
		return tabs.length;
	});
};

export const getNumberOfWindows = () => {
	chrome.windows.getAll({ populate: true }, (windows) => {
		return windows.length;
	});
};

export const getNumberOfBookmarks = () => {
	chrome.bookmarks.getTree((bookmarks) => {
		return bookmarks.length;
	});
};

export const getNumberOfHistoryItems = () => {
	chrome.history.search({ text: '' }, (historyItems) => {
		return historyItems.length;
	});
};

export const getNumberOfInProgressDownloads = () => {
	chrome.downloads.search({ state: 'in_progress' }, (downloads) => {
		return downloads.length;
	});
};
