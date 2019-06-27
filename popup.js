const text = document.body.querySelector('h1')

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
					circle.initPos(response)
				}
			);
		}
	);
}

const rotate = value => {
	const deg = value

	chrome.tabs.query(
		{
			active: true,
			currentWindow: true
		},
		function(tabs) {
			text.style.transform = `rotate(${ deg }deg`
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

// https://github.com/djoga98/Circular-Slider
const circle = new circularSlider({
  container: document.body,
  color: "transparent",
  range: [0, 360],
  step: 10,
  radius: 80,
  text: "",
  callback: rotate
});
circle.handleInput();

window.onload = init
