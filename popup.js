const text = document.body.querySelector('.text')

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
					circle.input.value = response
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
  radius: 50,
  text: "",
  callback: rotate
});
circle.handleInput();

// circle.input.addEventListener('input', rotate)
window.onload = init
