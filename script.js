const defaultActiveColor = "white";
let activeColor = defaultActiveColor;
document.addEventListener('DOMContentLoaded', () => {
    createColorPalette();
    setColorPaletteEventListeners();
    setupColorPartsEventListeners();
    setupResetButton();
});

function setupColorPartsEventListeners() {
    const svgParts = document.querySelectorAll('svg path[fill="#D9D9D9"]');
    svgParts.forEach((part) => {
        part.style.fill = 'white';
        part.addEventListener('click', (_) => {
            if (activeColor) {
                part.style.fill = activeColor;
            }
        });
    });
    const svgParts2 = document.querySelectorAll('svg circle');
    svgParts2.forEach((part, index) => {
        if (index === 0) return;
        part.style.fill = 'white';
        part.addEventListener('click', (_) => {
            if (activeColor) {
                part.style.fill = activeColor;
            }
        });
    });
}

const colors = [
    '#FF0000', // Red
    '#00FF00', // Green
    '#0000FF', // Blue
    '#FFFF00', // Yellow
    '#00FFFF', // Cyan
    '#FF00FF', // Magenta
    '#000000', // Black
    '#FFFFFF', // White
    '#FFA500', // Orange
    '#800080'  // Purple
];

function createColorPalette() {
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
    const activeColorDiv = document.getElementById('active-color');

    colorPalette.addEventListener('click', (event) => {
        if (event.target.classList.contains('color-option')) {
            activeColor = event.target.getAttribute('data-color');
            activeColorDiv.style.backgroundColor = activeColor;
        }
    });
}

function setActiveColorDiv() {
    const activeColorDiv = document.getElementById('active-color');
    activeColorDiv.style.backgroundColor = activeColor;
}


function setupResetButton() {
    const resetButton = document.getElementById('reset-btn');
    const activeColorDiv = document.getElementById('active-color');

    resetButton.addEventListener('click', () => {
        const svgParts = document.querySelectorAll('svg path[fill="#D9D9D9"]');
        svgParts.forEach((part) => {
            part.style.fill = 'white';
            part.addEventListener('click', (_) => {
                if (activeColor) {
                    part.style.fill = activeColor;
                }
            });
        });
        const svgStars = document.querySelectorAll('svg path[class="star"]');
        svgStars.forEach((part) => {
            part.style.fill = 'white';
            part.addEventListener('click', (_) => {
                if (activeColor) {
                    part.style.fill = activeColor;
                }
            });
        });
        const svgParts2 = document.querySelectorAll('svg circle');
        svgParts2.forEach((part, index) => {
            if (index === 0) return;
            part.style.fill = 'white';
            part.addEventListener('click', (_) => {
                if (activeColor) {
                    part.style.fill = activeColor;
                }
            });
        });
    });
}


function printSVG() {
    const svgElement = document.getElementById('svg-container').querySelector('svg');
    const svgData = new XMLSerializer().serializeToString(svgElement);
    const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const svgUrl = URL.createObjectURL(svgBlob);

    const printWindow = window.open('', '_blank');
    printWindow.document.open();
    printWindow.document.write(`
        <html>
        <head>
            <title>Lincoln FC Logo</title>
        </head>
        <body>
            <img src="${svgUrl}" onload="window.print(); window.close();" />
        </body>
        </html>
    `);
    printWindow.document.close();
}

function exportSVG() {
    const svgElement = document.getElementById('svg-container').querySelector('svg');
    const svgData = new XMLSerializer().serializeToString(svgElement);
    const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const svgUrl = URL.createObjectURL(svgBlob);

    const downloadLink = document.createElement('a');
    downloadLink.href = svgUrl;
    downloadLink.download = 'lincoln-logo.svg';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
}