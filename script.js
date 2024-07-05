let activeColor = "#000";
document.addEventListener('DOMContentLoaded', () => {
    createColorPalette();
    setColorPaletteEventListeners();
    setupImageEventListeners();
});

function setupImageEventListeners() {
    const svgParts = document.querySelectorAll('svg g');
    svgParts.forEach((part, index) => {
        if (index === 0) return;
        part.style.fill = 'white';
        part.addEventListener('click', (_) => {
            if (activeColor) {
                part.style.fill = activeColor;
            }
        });
    });
}


function createColorPalette() {
    const colors = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF', '#FFA500', '#800080', '#A52A2A', '#808080'];
    const colorPalette = document.getElementById('colorPalette');

    colors.forEach(color => {
        const colorOption = document.createElement('div');
        colorOption.className = 'color-option';
        colorOption.setAttribute('data-color', color);
        colorOption.style.backgroundColor = color;
        colorPalette.appendChild(colorOption);
    });
}


function setColorPaletteEventListeners() {
    colorPalette.addEventListener('click', (event) => {
        if (event.target.classList.contains('color-option')) {
            activeColor = event.target.getAttribute('data-color');
        }
    });
}