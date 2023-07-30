let sizeBox = document.querySelector('#size');

sizeBox.value = 4;

let canvas = document.querySelector(".canvas");

let gridStatus;

function render (size) {
  canvas.innerHTML = "";

  size = Math.floor(size);

  if (size > 64) {
    size = 64;
    alert("Size cannot be higher than 64! Grid size set to 64");
    sizeBox.value = 64;
  }
  
  let attribute = `repeat(${size}, 1fr)`;
  
  canvas.style.gridTemplateColumns = attribute;
  
  const availableVerticalSpace = window.innerHeight;
  const availableHorizontalSpace = window.innerWidth;
  
  if (availableVerticalSpace < availableHorizontalSpace) {
    canvas.style.height = "100%";
    canvas.style.width = "auto";
  } else {
    canvas.style.width = "100%";
    canvas.style.height = "auto";
  }
  
  size = size * size;
  
  for (let i = 1; i <= size; i++) {
    let pixel = document.createElement("div");
  
    pixel.classList.add("pixel");
  
    canvas.appendChild(pixel);
  }

  draw();

  grid();
  if (gridStatus === false) {
    grid();
  }
}

let eraseMode = false;

function grid() {
  let pixels = document.querySelectorAll(".pixel");

  let toggle = document.querySelector("#toggle");

  if (toggle.textContent === "grid_on") {
    pixels.forEach(function (pixel) {
      pixel.style.borderStyle = "none";
    });

    gridStatus = false;
    toggle.textContent = "grid_off";
  } else {
    pixels.forEach(function (pixel) {
      pixel.style.borderStyle = "solid";
    });

    gridStatus = true;
    toggle.textContent = "grid_on";
  }
}

function clear() {
  let pixels = document.querySelectorAll(".pixel");

  pixels.forEach(function (pixel) {
    pixel.style.backgroundColor = "#FFFFFF";
  });
}

let clearButton = document.querySelector('#clear');

clearButton.addEventListener('click', clear);

function draw () {
  let pixels = document.querySelectorAll(".pixel");

  let isDrawing;

  window.addEventListener('mousedown', function (event) {
    event.preventDefault();
    isDrawing = true;
  });

  window.addEventListener('mouseup', function () {
    isDrawing = false;
  });

  Array.from(pixels).forEach(function (pixel) {
    pixel.addEventListener('mousemove', function (event) {
      if (isDrawing) {
        if (eraseMode) {
          paint(event.target, "white");
        } else {
          let color = document.querySelector('#color').value;
          paint(event.target, color);
        }
      }
    });
  });

  Array.from(pixels).forEach(function (pixel) {
    pixel.addEventListener('click', function (event) {
      if (eraseMode) {
        paint(event.target, "white");
      } else {
        let color = document.querySelector('#color').value;
        paint(event.target, color);
      }
    });
  });
}

function paint (pixel, color) {
  pixel.style.backgroundColor = color;
}

function eraser (id) {
  let eraseButton = document.querySelector('#eraser');

  isDrawing = false;

  if (eraseMode === true || id === "color") {
    eraseButton.style.backgroundColor = "rgba(217, 119, 6, 0.25)";
    
    eraseButton.addEventListener('mouseover', function () {
      eraseButton.style.backgroundColor = "rgba(217, 119, 6, 0.5)";
    });
    
    eraseButton.addEventListener('mouseout', function () {
      eraseButton.style.backgroundColor = "rgba(217, 119, 6, 0.25)";
    });

    eraseButton.style.color = "rgba(217, 119, 6)";
    eraseMode = false;
  } else if (eraseMode === false) {
    eraseButton.style.backgroundColor = "rgba(16, 185, 129, 0.25)";
    eraseButton.style.color = "rgba(16, 185, 129)";

    eraseButton.addEventListener('mouseover', function () {
      eraseButton.style.backgroundColor = "rgba(16, 185, 129, 0.5)";
    });

    eraseButton.addEventListener('mouseout', function () {
      eraseButton.style.backgroundColor = "rgba(16, 185, 129, 0.25)";
    });

    eraseMode = true;
  }
}

let colorPicker = document.querySelector('#color');

colorPicker.addEventListener('input', function (event) {
  event.target.style.backgroundColor = event.target.value;
});

render(4);