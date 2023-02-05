chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({ color: '#3aa757' }, () => {
    console.log('The color is green.')
    })
    });
    
    console.log("this is running");
    hotkeys('ctrl+shift+alt+g', function (event, handler) {
    console.log('g', event, handler)});