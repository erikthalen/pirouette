var port = chrome.runtime.connect();

document.body.style.background = 'blue'
console.log(document.body, port, 'ran')

port.postMessage(document.body)
