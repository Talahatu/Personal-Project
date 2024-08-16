// This script act as a service worker
console.log("extension background process is running...");

chrome.runtime.onMessage.addListener((message, sender) => {
    console.log("Message: ");
    console.log(message);
});
