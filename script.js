let size = prompt("Size eg.(16 = 16x16 grid)");

let canvas = document.querySelector('.canvas');

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
    let pixel = document.createElement('div');

    pixel.classList.add('pixel');

    canvas.appendChild(pixel);
}