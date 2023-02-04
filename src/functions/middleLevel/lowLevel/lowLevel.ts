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


export const closeTabs = (callback: (tab: chrome.tabs.Tab) => boolean) => {
    chrome.tabs.query({}, (tabs) => {
        tabs.forEach((tab) => {
            if (callback(tab)) {
                tab.id ? chrome.tabs.remove(tab.id) : null;
            }
        });
    }
)}

export const muteTabs = (callback: (tab: chrome.tabs.Tab) => boolean) => {
    chrome.tabs.query({}, (tabs) => {
        tabs.forEach((tab) => {
            if (callback(tab)) {
                tab.id ? chrome.tabs.update(tab.id, { muted: true }) : null;
            }
        });
    }
)}

export const unmuteTabs = (callback: (tab: chrome.tabs.Tab) => boolean) => {
    chrome.tabs.query({}, (tabs) => {
        tabs.forEach((tab) => {
            if (callback(tab)) {
                tab.id ? chrome.tabs.update(tab.id, { muted: false }) : null;
            }
        });
    }
)}

export function muteTab() {
    muteTabs((tab) => tab.active);
}

export function unmuteTab() {
    unmuteTabs((tab) => tab.active);
}

export function duplicateTab() {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs[0]) {
            tabs[0].id ? chrome.tabs.duplicate(tabs[0].id) : null;
        }
    });
}

export function openFavorites() {
    openNewTab('chrome://bookmarks');
}

export function openDownloads() {
    openNewTab('chrome://downloads');
}

export function openHistory() {
    openNewTab('chrome://history');
}

export function openExtensions() {
    openNewTab('chrome://extensions');
}

export function openSettings() {
    openNewTab('chrome://settings');
}

export function openHelp() {
    openNewTab('chrome://help');
}

export function clearBrowsingData(timePeriod: number){
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
}

export function clearCookies(timePeriod: number) {
    chrome.browsingData.remove(
        {
            since: timePeriod,
        },
        {
            cookies: true,
        }
    );
}

export function clearCookiesOnPage() {
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
}


export function clearHistory(timePeriod: number) {
    chrome.browsingData.remove(
        {
            since: timePeriod,
        },
        {
            history: true,
        }
    );
}

export function clearCache(timePeriod: number) {
    chrome.browsingData.remove(
        {
            since: timePeriod,
        },
        {
            cache: true,
        }
    );
}

export function clearPasswords(timePeriod: number) {
    chrome.browsingData.remove(
        {
            since: timePeriod,
        },
        {
            passwords: true,
        }
    );
}

export function clearFormData(timePeriod: number) {
    chrome.browsingData.remove(
        {
            since: timePeriod,
        },
        {
            formData: true,
        }
    );
}

export function scrollToTop() {
    chrome.tabs.executeScript({
        code: 'window.scrollTo({ top: 0, behavior: "smooth" });',
    });
}

export function scrollToBottom() {
    chrome.tabs.executeScript({
        code: 'window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });',
    });
}

export function scrollDown(amount = 100) {
    chrome.tabs.executeScript({
        code: `window.scrollBy(0, ${amount});`,
    });
}

export function scrollUp(amount = 100) {
    chrome.tabs.executeScript({
        code: `window.scrollBy(0, -${amount});`,
    });
}

export function scrollLeft(amount = 100) {
    chrome.tabs.executeScript({
        code: `window.scrollBy(-${amount}, 0);`,
    });
}

export function scrollRight(amount = 100) {
    chrome.tabs.executeScript({
        code: `window.scrollBy(${amount}, 0);`,
    });
}

export function zoomIn(amount = 0.1) {
    chrome.tabs.getZoom((zoomFactor) => {
        chrome.tabs.setZoom(zoomFactor + amount);
    });
}

export function zoomOut(amount = 0.1) {
    chrome.tabs.getZoom((zoomFactor) => {
        chrome.tabs.setZoom(zoomFactor - amount);
    });
}

export function zoomReset() {
    chrome.tabs.setZoom(1);
}

export function setZoom(amount: number) {
    chrome.tabs.setZoom(amount);
}

export function waitForTabToLoad(callback: () => void) {
    chrome.tabs.onUpdated.addListener(function listener(tabId, changeInfo) {
        if (changeInfo.status === 'complete') {
            chrome.tabs.onUpdated.removeListener(listener);
            callback();
        }
    });
}

export function waitSeconds(seconds: number) {
    return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
}

export function waitMilliseconds(milliseconds: number) {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

export function waitUntilElementExists(selector: string) {
    return new Promise<void>((resolve) => {
        const interval = setInterval(() => {
            if (document.querySelector(selector)) {
                clearInterval(interval);
                resolve();
            }
        }, 100);
    });
}

export function clickOn(selector: string) {
    const element = document.querySelector(selector);
    if (element) {
        (element as HTMLElement).click();
    }
}

export function previousTab() {
    chrome.tabs.query({ currentWindow: true }, (tabs) => {
        if (tabs[0]) {
            const activeTabIndex = tabs.findIndex((tab) => tab.active);
            const previousTabIndex = activeTabIndex - 1;
            const previousTab = tabs[previousTabIndex];
            if (previousTab) {
                previousTab.id ? chrome.tabs.update(previousTab.id, { active: true }) : null;
            }
        }
    });
}

export function nextTab() {
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
}

export function previousPage() {
    chrome.tabs.executeScript({
        code: 'history.back();',
    });
}

export function nextPage() {
    chrome.tabs.executeScript({
        code: 'history.forward();',
    });
}















