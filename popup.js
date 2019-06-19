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

console.log(circularSlider)


// https://github.com/djoga98/Circular-Slider
const slider1 = new circularSlider({
    container: document.querySelector('.slider'),
    color: "#663A69",
    range: [100, 1000],
    step: 1,
    radius: 250,
    text: "Transportation"
});
slider1.handleInput();


window.onload = init
input.addEventListener('input', rotate)
