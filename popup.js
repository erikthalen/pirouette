const button = document.body.querySelector('#button')

const containerStyle = {
	transform: 'translate(-50%, -50%)',
	position: 'fixed',
	top: '50%',
	left: '50%',
	width: '100vw',
	height: '100vh',
	overflow: 'auto',
	transformOrigin: 'left top'
}

const callback = tabBody => {
	tabBody.style.opacity = 0.5
	window.addEventListener("message", function(event) {
	  // We only accept messages from ourselves
	  if (event.source != window)
	    return;
	
	  if (event.data.type && (event.data.type == "FROM_PAGE")) {
	    console.log("Content script received: " + event.data.text);
	    port.postMessage(event.data.text);
	  }
	}, false);
}

const rotate = event => {
	document.body.style.background = 'red'
	const rotate = 20

	// window.postMessage({ type: "FROM_PAGE", text: "Hello from the webpage!" }, "*");
	chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
		chrome.tabs.executeScript(
			tabs[0].id,
			{
				file: 'inject.js',
			},
			// callback
		);
	});


}


button.addEventListener('click', rotate)
