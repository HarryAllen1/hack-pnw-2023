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
export declare function muteTab(): void;
export declare function unmuteTab(): void;
export declare function duplicateTab(): void;
export declare function openFavorites(): void;
export declare function openDownloads(): void;
export declare function openHistory(): void;
export declare function openExtensions(): void;
export declare function openSettings(): void;
export declare function openHelp(): void;
export declare function clearBrowsingData(timePeriod: number): void;
export declare function clearCookies(timePeriod: number): void;
export declare function clearCookiesOnPage(): void;
export declare function clearHistory(timePeriod: number): void;
export declare function clearCache(timePeriod: number): void;
export declare function clearPasswords(timePeriod: number): void;
export declare function clearFormData(timePeriod: number): void;
export declare function scrollToTop(): void;
export declare function scrollToBottom(): void;
export declare function scrollDown(amount?: number): void;
export declare function scrollUp(amount?: number): void;
export declare function scrollLeft(amount?: number): void;
export declare function scrollRight(amount?: number): void;
export declare function zoomIn(amount?: number): void;
export declare function zoomOut(amount?: number): void;
export declare function zoomReset(): void;
export declare function setZoom(amount: number): void;
export declare function waitForTabToLoad(callback: () => void): void;
export declare function waitSeconds(seconds: number): Promise<unknown>;
export declare function waitMilliseconds(
	milliseconds: number
): Promise<unknown>;
export declare function waitUntilElementExists(selector: string): Promise<void>;
export declare function clickOn(selector: string): void;
export declare function previousTab(): void;
export declare function nextTab(): void;
export declare function previousPage(): void;
export declare function nextPage(): void;
export declare function reloadPage(): void;
export declare function reloadPageBypassingCache(): void;
export declare function replaceTextInPage(find: string, replace: string): void;
export declare function downloadPage(): void;
export declare function downloadImage(): void;
export declare function postMessageToActiveTab(message: any): void;
export declare function switchToTabByIndex(tabId: number): void;
export declare const switchToTab: (
	callback: (tab: chrome.tabs.Tab) => boolean
) => void;
export declare function switchToTabByTitle(title: string): void;
export declare function switchToTabByUrlContains(url: string): void;
export declare function startReadingAloud(element?: string): void;
export declare function stopReadingAloud(): void;
export declare function reopenClosedTab(numberOfTabs?: number): void;
export declare function invertColor(): void;
export declare function randomColor(): void;
export declare function scrollToElement(selector: string): void;
