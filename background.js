if(typeof browser === "undefined"){
 var browser = chrome
}
const openTab=()=>{
    console.log("Clicked!")
    var newTab = browser.tabs.create({
        url:'https://x.com/home',
        active:true
    })
}

browser.browserAction.onClicked.addListener(openTab)