const defaultActiveColor = "white";
let activeColor = defaultActiveColor;
document.addEventListener('DOMContentLoaded', () => {
    createColorPalette();
    createColorInputSelector();
    setColorPaletteEventListeners();
    setupColorPartsEventListeners();
    setupResetButton();
    setupThemeEventListener();
});


function setupThemeEventListener() {
    const themeSwitch = document.getElementById('theme-switch');
    const body = document.body;
    themeSwitch.innerText = body.classList.contains('dark-mode') ? 'Light Mode' : 'Dark Mode';
    themeSwitch.style.backgroundColor = body.classList.contains('dark-mode') ? 'white' : 'black';
    themeSwitch.style.color = body.classList.contains('dark-mode') ? 'black' : 'white';
    themeSwitch.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        themeSwitch.innerText = body.classList.contains('dark-mode') ? 'Light Mode' : 'Dark Mode';
        themeSwitch.style.backgroundColor = body.classList.contains('dark-mode') ? 'white' : 'black';
        themeSwitch.style.color = body.classList.contains('dark-mode') ? 'black' : 'white';
    });

}

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

const initialColor = '#FF0000'; // Initial color (Red)

function createColorInputSelector() {
    const initialColor = '#FF0000'; // Initial color (Red)
    const colorInputSelector = document.getElementById('colorInputSelector');

    // Clear any previous content inside the colorInputSelector
    colorInputSelector.innerHTML = '';

    // Create a hidden color input element
    const colorInput = document.createElement('input');
    colorInput.type = 'color';
    colorInput.style.display = 'none';
    document.body.appendChild(colorInput);

    // Create a single color option
    const colorOption = document.createElement('div');
    colorOption.className = 'color-option';
    colorOption.setAttribute('data-color', initialColor);
    colorOption.style.backgroundColor = initialColor;
    colorInputSelector.appendChild(colorOption);

    // Add event listener to the color option
    colorOption.addEventListener('click', () => {
        // Set the current color as the value of the color input
        colorInput.value = colorOption.getAttribute('data-color');
        // Trigger the color input to open
        colorInput.click();
    });

    // Add event listener to the color input to handle color changes
    colorInput.addEventListener('input', (event) => {
        const newColor = event.target.value;
        colorOption.style.backgroundColor = newColor;
        colorOption.setAttribute('data-color', newColor);
        // Blur the color input to close the color picker
        colorInput.blur();
        activeColor = newColor;
    });
}

function setColorPaletteEventListeners() {
    const activeColorDiv = document.getElementById('active-color');
    const colorPalette = document.getElementById('colorPalette');
    const colorInputSelector = document.getElementById('colorInputSelector');

    colorPalette.addEventListener('click', (event) => {
        if (event.target.classList.contains('color-option')) {
            activeColor = event.target.getAttribute('data-color');
            activeColorDiv.style.backgroundColor = activeColor;
        }
    });

    colorInputSelector.addEventListener('click', (event) => {
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
        activeColorDiv.style.backgroundColor = defaultActiveColor;
        activeColor = defaultActiveColor;
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
        createColorInputSelector();
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