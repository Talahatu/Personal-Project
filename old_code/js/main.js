// This script run once everytime the extension is enabled by user
console.log("The extension is up and running...");
var images = document.getElementsByTagName("img");

for (element of images) {
    element.src = `${chrome.runtime.getURL("../assets/pp.jpg")}`;
    element.alt = "pp hehe boi";
}
