document.getElementById("getURL").addEventListener("click", getURL);

async function getURL() {
    let tabs = await chrome.tabs.query({ active: true, currentWindow: true });
    let activeTab = tabs[0];
    let url = activeTab["url"];
    document.getElementById("text").innerText = url;
}
