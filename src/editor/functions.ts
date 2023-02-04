declare function openNewTab(
	url: string,
	incognito: boolean,
	newWindow: boolean,
	focus: boolean
): void;

declare function closeTab(callback: (tab: chrome.tabs.Tab) => boolean): void;
