const input = document.body.querySelector('input')

const init = () => {
	chrome.tabs.query(
		{
			active: true,
			currentWindow: true
		},
		function(tabs) {
			chrome.tabs.sendMessage(
				tabs[0].id,
				{
					type: 'init',
				},
				function(response) {
					console.log(response)
					input.value = response
				}
			);
		}
	);
}

const rotate = event => {
	const deg = event.target.value

	chrome.tabs.query(
		{
			active: true,
			currentWindow: true
		},
		function(tabs) {
			chrome.tabs.sendMessage(
				tabs[0].id,
				{
					type: 'update',
					code: `${ deg }`
				},
			);
		}
	);
}


window.onload = init
input.addEventListener('input', rotate)
