console.log("The extension is up and running");

var images = document.getElementsByTagName('img')

for (elt of images){
console.log(browser)
if(typeof browser === "undefined"){
 var browser = chrome
}
   elt.src = `${browser.runtime.getURL("pp.jpg")}`
   elt.alt = 'an alt text'
}