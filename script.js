document.addEventListener('DOMContentLoaded', () => {
    const colors = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF', '#FFA500', '#800080', '#A52A2A', '#808080'];
    const colorPalette = document.getElementById('colorPalette');
    const circleElement = document.getElementById('circleElement');
    const textElement = document.getElementById('textElement');

    // Generate color options dynamically
    colors.forEach(color => {
        const colorOption = document.createElement('div');
        colorOption.className = 'color-option';
        colorOption.setAttribute('data-color', color);
        colorOption.style.backgroundColor = color;
        colorPalette.appendChild(colorOption);
    });

    // Add event listeners to the color options
    colorPalette.addEventListener('click', (event) => {
        if (event.target.classList.contains('color-option')) {
            const color = event.target.getAttribute('data-color');
            circleElement.setAttribute('fill', color);
            textElement.setAttribute('fill', color);
        }
    });
});