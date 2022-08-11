const btn = document.querySelector('[data-btn="set"]');
const reset = document.querySelector('[data-btn="reset"]');
const rainbowBtn = document.querySelector('[data-btn="rainbow"]');
const eraserBtn = document.querySelector('[data-btn="erase"]');
const gridBtn = document.querySelector('[data-btn="grid"]')
const div = document.createElement('div');
const container = document.querySelector('.container');
const range = document.querySelector('input[type="range"]');
const value = document.querySelector('.value');
div.classList.add('tile')

let writing;
let rainbow = false;
let erase = false;  
let defaultGrid = true;
let grid = false;

if (defaultGrid) {
    for (i = 0; i < (16 * 16); i++) {
        container.appendChild(div.cloneNode(true))
    }
}

reset.addEventListener('click', () => {
    const tiles = document.querySelectorAll('.tile');
    tiles.forEach(tile => tile.style.backgroundColor = 'white')
})

function createTile() {
    let newValue = range.value;
    value.textContent = `${newValue} x ${newValue}`;
    container.setAttribute('style', `grid-template:repeat(${newValue}, 1fr)/ repeat(${newValue}, 1fr);`)
    container.innerHTML = "";
    if (grid) div.classList.add('grid')
    for (let i = 0; i < (newValue * newValue); i++) {
        container.appendChild(div.cloneNode(true))
    }
}

function random(max) {
    return Math.floor(Math.random() * max);
}

container.addEventListener('mousedown', (e) => {
    writing = true;
    if (writing && rainbow) {
        e.target.style.backgroundColor = `hsl(${random(360)}, 100%, ${random(100)}%)`;
    } else if (writing && erase) {
        e.target.style.backgroundColor = 'white';
    } else if (writing) {
        e.target.style.backgroundColor = 'black';
    }
    // hover
    const tiles = document.querySelectorAll('.tile');
    tiles.forEach(tile => tile.addEventListener('mouseover', (e) => {
        if (writing && rainbow) {
            e.target.style.backgroundColor = `hsl(${random(360)}, 100%, ${random(100)}%)`;
        } else if (writing && erase) {
            e.target.style.backgroundColor = 'white';
        } else if (writing) {
            e.target.style.backgroundColor = 'black';
        }
    }));
})


rainbowBtn.addEventListener('click', () => {
    if (!rainbow) {
        rainbow = true;
        rainbowBtn.classList.add('toggle')
        if (erase) {
            erase = false;
            eraserBtn.classList.remove('toggle')
        }
    } else if (rainbow) {
        rainbow = false;
        rainbowBtn.classList.remove('toggle')
    }
})

eraserBtn.addEventListener('click', () => {
    if (!erase) {
        erase = true;
        eraserBtn.classList.add('toggle')
        if (rainbow) {
            rainbow = false;
            rainbowBtn.classList.remove('toggle')
        }
    } else if (erase) {
        erase = false;
        eraserBtn.classList.remove('toggle')
    }
})
container.addEventListener('mouseup', (e) => {
    writing = false;
})

gridBtn.addEventListener('click', function (e) {
    const tiles = document.querySelectorAll('.tile');
    if (!grid) {
        grid = true;
        tiles.forEach(tile => tile.classList.add('grid'))
        gridBtn.classList.add('toggle')
    } else if (grid) {
        grid = false;
        tiles.forEach(tile => tile.classList.remove('grid'))
        gridBtn.classList.remove('toggle')
    }
})

range.addEventListener('input', createTile)