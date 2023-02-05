export declare const openNewTab: (
	url?: string,
	incognito?: boolean,
	newWindow?: boolean,
	focus?: boolean
) => void;
export declare const closeTabs: (
	callback: (tab: chrome.tabs.Tab) => boolean
) => void;
export declare const muteTabs: (
	callback: (tab: chrome.tabs.Tab) => boolean
) => void;
export declare const unmuteTabs: (
	callback: (tab: chrome.tabs.Tab) => boolean
) => void;
export declare const muteTab: () => void;
export declare const unmuteTab: () => void;
export declare const duplicateTab: () => void;
export declare const openFavorites: () => void;
export declare const openDownloads: () => void;
export declare const openHistory: () => void;
export declare const openExtensions: () => void;
export declare const openSettings: () => void;
export declare const openHelp: () => void;
export declare const clearBrowsingData: (timePeriod: number) => void;
export declare const clearCookies: (timePeriod: number) => void;
export declare const clearCookiesOnPage: () => void;
export declare const clearHistory: (timePeriod: number) => void;
export declare const clearCache: (timePeriod: number) => void;
export declare const clearPasswords: (timePeriod: number) => void;
export declare const clearFormData: (timePeriod: number) => void;
export declare const scrollToTop: () => void;
export declare const scrollToBottom: () => void;
export declare const scrollDown: (amount?: number) => void;
export declare const scrollUp: (amount?: number) => void;
export declare const scrollLeft: (amount?: number) => void;
export declare const scrollRight: (amount?: number) => void;
export declare const zoomIn: (amount?: number) => void;
export declare const zoomOut: (amount?: number) => void;
export declare const zoomReset: () => void;
export declare const setZoom: (amount: number) => void;
export declare const waitForTabToLoad: (callback: () => void) => void;
export declare const waitSeconds: (seconds: number) => Promise<unknown>;
export declare const waitMilliseconds: (
	milliseconds: number
) => Promise<unknown>;
export declare const waitUntilElementExists: (
	selector: string
) => Promise<void>;
export declare const clickOn: (selector: string) => void;
export declare const previousTab: () => void;
export declare const nextTab: () => void;
export declare const previousPage: () => void;
export declare const nextPage: () => void;
export declare const reloadPage: () => void;
export declare const reloadPageBypassingCache: () => void;
export declare const replaceTextInPage: (find: string, replace: string) => void;
export declare const downloadPage: () => void;
export declare const downloadImage: () => void;
export declare const postMessageToActiveTab: (message: string) => void;
export declare const switchToTabByIndex: (tabId: number) => void;
export declare const switchToTab: (
	callback: (tab: chrome.tabs.Tab) => boolean
) => void;
export declare const switchToTabByTitle: (title: string) => void;
export declare const switchToTabByUrlContains: (url: string) => void;
export declare const startReadingAloud: (element?: string) => void;
export declare const stopReadingAloud: () => void;
export declare const reopenClosedTab: (numberOfTabs?: number) => void;
export declare const invertColor: () => void;
export declare const randomColor: () => void;
export declare const scrollToElement: (selector: string) => void;
export declare const getTabUrl: () => void;
export declare const getTabTitle: () => void;
export declare const getTabId: () => void;
export declare const getNumberOfTabs: () => void;
export declare const getNumberOfWindows: () => void;
export declare const getNumberOfBookmarks: () => void;
export declare const getNumberOfHistoryItems: () => void;
export declare const getNumberOfInProgressDownloads: () => void;
