// This script act as a service worker alike
// For Chromium based browser
if (typeof browser === "undefined") {
    var browser = chrome;
}

const openTab = () => {
    var newTab = browser.tabs.create({
        url: "https://x.com/home",
        active: true,
    });
};

browser.browserAction.onClicked.addListener(openTab);
