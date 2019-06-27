function circularSlider(options) {
    var mouseDown = false;
    var CIRCUMFERENCE = 2 * Math.PI * (options.radius - 6);

    var sliderContainer = document.createElement("div");
    sliderContainer.setAttribute("class", "sliderContainer");

    var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("class", "progress");
    svg.setAttribute("width", options.radius * 2);
    svg.setAttribute("height", options.radius * 2);
    svg.setAttribute('xmlns', "http://www.w3.org/2000/svg");
    svg.setAttribute("viewBox", `0 0 ${options.radius * 2} ${options.radius * 2}`);

    var progressMeter = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    progressMeter.setAttribute("class", "progress__meter");
    progressMeter.setAttribute("cx", options.radius);
    progressMeter.setAttribute("cy", options.radius);
    progressMeter.setAttribute("r", options.radius - 6);
    progressMeter.setAttribute("stroke-width", 8);
		progressMeter.setAttribute('fill', 'transparent')

    var progressValue = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    progressValue.setAttribute("class", "progress__value");
    progressValue.setAttribute("cx", options.radius);
    progressValue.setAttribute("cy", options.radius);
    progressValue.setAttribute("r", options.radius - 6);
    progressValue.setAttribute("stroke-width", 5);
		progressValue.setAttribute('fill', 'transparent')
    progressValue.style.stroke = options.color;

    var dial = document.createElement('div');
    dial.setAttribute('class', 'dial');

    var input = document.createElement("input");
    input.setAttribute("type", "range");
    input.setAttribute("id", "control");
    input.setAttribute("name", "points");
    input.setAttribute("min", options.range[0]);
    input.setAttribute("max", options.range[1]);
    input.setAttribute("step", options.step);
    input.setAttribute("value", "0");
		input.style.display = 'none'
    input.addEventListener("input", (event) =>  {
        this.progress(event.target.valueAsNumber);
    })
	
		this.input = input

    svg.appendChild(progressMeter);
    // svg.appendChild(progressValue);

    sliderContainer.appendChild(svg);
    sliderContainer.appendChild(dial);
    sliderContainer.appendChild(input);

    options.container.appendChild(sliderContainer);


    this.handleInput = () => {
        document.addEventListener("mouseup", (e) => mouseDown = false)
        document.addEventListener("touchend", (e) => mouseDown = false)
        sliderContainer.addEventListener("mousedown", (e) => mouseDown = true)
        sliderContainer.addEventListener("touchstart", (e) => mouseDown = true)

        progressMeter.addEventListener("click", this.update);
        progressValue.addEventListener("click", this.update);

        document.addEventListener("mousemove", this.update);
        document.addEventListener("touchmove", this.update, {
            passive: false
        });
    }
     
    this.update = (e) => {
        if (e.type != 'click') {
            if (!mouseDown || options.range[1] == 0)
                return;
            this.move(e);
        } else {
            this.move(e);
        }
    }
     
    this.move = (e, init) => {
				let pos;

				if(e) {
        	if (e.type == 'mouseup' || e.type == 'mousedown' || e.type == 'mousemove' || e.type == 'click') {
						pos = this.posFromPos(
							{ x: e.pageX, y: e.pageY }
						)
        	} else if (e.type == 'touchend' || e.type == 'touchstart' || e.type == 'touchmove') {
        	  e.preventDefault();
						pos = this.posFromPos(
							{ x: e.touches[0].clientX, y: e.touches[0].clientY }
						)
        	}
				}

				if(init) {
					pos = this.posFromVal(init)
				}

				if(!pos) return
				// if(pos.value % options.step !== 0) return

        if(pos) {
					dial.style.transform = "translate(" + pos.x + "," + pos.y + ")";

					options.callback(pos.value)
					this.input.value = pos.value
				}
		}

		this.posFromVal = value => {
			const deg = value // only works on range[1] === 360
			
      var x = Math.ceil((options.radius - 5) * Math.sin(deg * Math.PI / 180)) + options.radius + "px";
      var y = Math.ceil((options.radius - 5) * -Math.cos(deg * Math.PI / 180)) + options.radius + "px";

			return { x, y, value }

		}

		this.posFromPos = pos => {
			var coords = {
          x: pos.x - sliderContainer.offsetLeft,
          y: pos.y - sliderContainer.offsetTop
      };

      var atan = Math.atan2(coords.x - options.radius, coords.y - options.radius);
      var deg = Math.ceil(-atan / (Math.PI / 180) + 180);
			const rounded = Math.round(deg / options.step) * options.step
      var x = Math.ceil((options.radius - 5) * Math.sin(rounded * Math.PI / 180)) + options.radius + "px";
      var y = Math.ceil((options.radius - 5) * -Math.cos(rounded * Math.PI / 180)) + options.radius + "px";
      var value = Math.ceil(rounded * options.range[1] / 360);

			return {x, y, value}
		}

		this.initPos = value => this.move(null, value)

    progressValue.style.strokeDasharray = CIRCUMFERENCE;
    var xx = Math.ceil((options.radius - 5) * Math.sin(1 * Math.PI / 180)) + options.radius + "px";
    var yy = Math.ceil((options.radius - 5) * -Math.cos(1 * Math.PI / 180)) + options.radius + "px";
    dial.style.transform = "translate(" + xx + "," + yy + ")";
}

