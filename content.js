let degree = 0

const el = document.createElement('div')
el.id = 'pirouette'

Object.assign(el.style, {
	// transition: 'transform 2s cubic-bezier(0, 1, 0, 1)',
	position: 'fixed',
	width: '100vw',
	height: '100vh',
	overflow: 'auto',
	left: '0',
	top: '0',
})

const init = () => {
	if(document.querySelector('#pirouette')) return

	el.style.backgroundColor = window.getComputedStyle(document.body).backgroundColor || 'white'
	
	el.append(...document.body.children)
	document.body.append(el)
}

const update = deg => {
	el.style.transform = `rotate(${ deg }deg)`
	degree = deg
}

chrome.runtime.onMessage.addListener(
	function(message, sender, sendResponse) {
		switch(message.type) {
			case 'init':
				init()
				sendResponse(degree)
				break;
			case 'update':
				update(message.code)
				break;
		}
	}
);


