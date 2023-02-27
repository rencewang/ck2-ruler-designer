const traitIcons = ['icon1.png', 'icon2.png', 'icon3.png'];

const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

function loadIcons(icons) {
  const iconPromises = icons.map((icon) => {
    return new Promise((resolve) => {
      const image = new Image();
      image.onload = () => resolve(image);
      image.src = icon;
    });
  });
  return Promise.all(iconPromises);
}

function drawIcon(icon, x, y) {
  context.drawImage(icon, x, y, 50, 50);
}

function clearCanvas() {
  context.clearRect(0, 0, canvas.width, canvas.height);
}

function redrawCanvas(traitIcons, selectedTraits) {
  clearCanvas();
  const x = 25;
  let y = 25;
  for (const trait of selectedTraits) {
    const iconIndex = traitIcons.indexOf(`icon${trait}.png`);
    if (iconIndex !== -1) {
      const icon = loadedIcons[iconIndex];
      drawIcon(icon, x, y);
      y += 60;
    }
  }
}

let loadedIcons;
loadIcons(traitIcons).then((icons) => {
  loadedIcons = icons;
});

// Add event listeners to your multi-select inputs here
// For example:
const traitSelector = document.querySelector('.trait-selector');
traitSelector.addEventListener('change', (event) => {
  const selectedTraits = Array.from(
    event.target.selectedOptions,
    (option) => option.value
  );
  redrawCanvas(traitIcons, selectedTraits);
});
