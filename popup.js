// https://github.com/djoga98/Circular-Slider
const input = new circularSlider({
  container: document.body,
  color: "transparent",
  range: [0, 360],
  step: 10,
  radius: 50,
  text: "circleInput"
});
input.handleInput();

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
	console.log(event.target.value)
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
if(input) input.addEventListener('input', rotate)
