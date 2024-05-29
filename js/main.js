console.log("The extension is up and running");
var images = document.getElementsByTagName("img");

for (element of images) {
    // For Chromium based browser
    if (typeof browser === "undefined") {
        var browser = chrome;
    }
    element.src = `${browser.runtime.getURL("../Assets/pp.jpg")}`;
    element.alt = "pp hehe boi";
}
