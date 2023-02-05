// @ts-check

importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js')

if (workbox) {
    console.log('Workbox is loaded')
    workbox.precaching.precacheAndRoute([])
} else {
    console.log('Workbox could not be loaded. No Offline support')
}

// Path: public\manifest.json
{
    "short_name": "React App",
    "name": "Create React App Sample",
    "icons": [
        {
            "src": "favicon.ico",
            "sizes": "64x64 32x32 24x24 16x16",
            "type": "image/x-icon"
        }
    ],
    "start_url": ".",
    "display": "standalone",
    "theme_color": "#000000",
    "background_color": "#ffffff"
}

// Path: public\index.html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8" />
        <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta

name="description"
            content="Web site created using create-react-app"
        />
        <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
        <!--
        manifest.json provides metadata used when your web app is installed on a user's mobile device or desktop.
        See https://developers.google.com/web/fundamentals/web-app-manifest/
    -->
        <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
        <!--
        Notice the use of %PUBLIC_URL% in the tags above.
        It will be replaced with the URL of the `public` folder during the build.
        Only files inside the `public` folder can be referenced from the HTML.
        
        Unlike "/favicon.ico" or "favicon.ico", "%PUBLIC_URL%/favicon.ico" will
        work correctly both with client-side routing and a non-root public URL.
        Learn how to configure a non-root public URL by running `npm run build`.
    -->
        <title>React App</title>
    </head>
    <body>
        <noscript>You need to enable JavaScript to run this app.</noscript>
        <div id="root"></div>
        <!--
        This HTML file is a template.
        If you open it directly in the browser, you will see an empty page.

        You can add webfonts, meta tags, or analytics to this file.
        The build step will place the bundled scripts into the <body> tag.

        To begin the development, run `npm start` or `yarn start`.
        To create a production bundle, use `npm run build` or `yarn build`.
    -->
    </body>
</html>

// Path: public\favicon.ico
// Path: public\logo192.png
// Path: public\logo512.png
// Path: public\robots.txt
// Path: public\asset-manifest.json

// Path: src\index.js
import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'

ReactDOM.render(<App />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()

// Path: src\serviceWorker.js



chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({ color: '#3aa757' }, () => {
        console.log('The color is green.')
    })
})

