let size = prompt("Size eg.(16 = 16x16 grid)");

let canvas = document.querySelector(".canvas");

let attribute = `repeat(${size}, 1fr)`;

canvas.style.gridTemplateColumns = attribute;

const availableVerticalSpace = window.innerHeight;
const availableHorizontalSpace = window.innerWidth;

// Compare the available spaces and set the appropriate CSS property
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

let eraseMode = false;

function grid() {
  let pixels = document.querySelectorAll(".pixel");

  let toggle = document.querySelector("#toggle");

  if (toggle.textContent === "grid_on") {
    pixels.forEach(function (pixel) {
      pixel.style.borderStyle = "none";
    });

    toggle.textContent = "grid_off";
  } else {
    pixels.forEach(function (pixel) {
      pixel.style.borderStyle = "solid";
    });

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

  canvas.addEventListener('mousedown', function () {
    isDrawing = true;
  });

  canvas.addEventListener('mouseup', function () {
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
}

function paint (pixel, color) {
  pixel.style.backgroundColor = color;
}

draw();

function eraser () {
  let eraseButton = document.querySelector('#eraser');

  if (eraseMode === false) {
    eraseButton.style.backgroundColor = "rgba(16, 185, 129, 0.25)";
    eraseButton.style.color = "rgba(16, 185, 129)";

    eraseButton.addEventListener('mouseover', function () {
      eraseButton.style.backgroundColor = "rgba(16, 185, 129, 0.5)";
    });

    eraseButton.addEventListener('mouseout', function () {
      eraseButton.style.backgroundColor = "rgba(16, 185, 129, 0.25)";
    });

    eraseMode = true;
  } else {
    eraseButton.style.backgroundColor = "rgba(217, 119, 6, 0.25)";
    
    eraseButton.addEventListener('mouseover', function () {
      eraseButton.style.backgroundColor = "rgba(217, 119, 6, 0.5)";
    });
    
    eraseButton.addEventListener('mouseout', function () {
      eraseButton.style.backgroundColor = "rgba(217, 119, 6, 0.25)";
    });

    eraseButton.style.color = "rgba(217, 119, 6)";
    eraseMode = false;
  }
}

let colorPicker = document.querySelector('#color');

colorPicker.addEventListener('input', function (event) {
  event.target.style.backgroundColor = event.target.value;
});