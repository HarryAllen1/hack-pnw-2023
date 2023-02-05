// @ts-check

import hotkeys from 'hotkeys-js';

hotkeys('f5', function(event, handler){
  // Prevent the default refresh event under WINDOWS system
  event.preventDefault()
  alert('you pressed F5!')
});


chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({ color: '#3aa757' }, () => {
        console.log('The color is green.')
    })
})