const div = document.createElement('div');
const container = document.querySelector('.container');
div.classList.add('tile')

for (let i = 0; i < (16 * 16); i++) {
    container.appendChild(div.cloneNode(true))
}

const tiles = document.querySelectorAll('.tile');
tiles.forEach(tile => tile.addEventListener('mouseover', (e) => {
    e.target.style.backgroundColor = 'black';
}))