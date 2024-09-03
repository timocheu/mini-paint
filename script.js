// Buttons
const btn_Reset = document.querySelector('[btn_data="reset"]');
const btn_Rainbow = document.querySelector('[btn_data="rainbow"]');
const btn_Erase = document.querySelector('[btn_data="erase"]');
const btn_Grid = document.querySelector('[btn_data="grid"]')
// Config
const range = document.querySelector('input[type="range"]');
const color = document.querySelector('input[type="color"]');
// Display config
const size = document.querySelector('.size');

const canvas = document.querySelector('.canvas');

const pixel = document.createElement('div');

pixel.classList.add('tile')

let writing;
let rainbow = false;
let erase = false;  
let grid = false;
let newColor;

btn_Rainbow.addEventListener('click', enableEffect)
btn_Erase.addEventListener('click', enableEffect)
btn_Reset.addEventListener('click', () => {
    const tiles = document.querySelectorAll('.tile');
    tiles.forEach(tile => tile.style.backgroundColor = 'white')
})

for (i = 0; i < (16 * 16); i++) {
    canvas.appendChild(pixel.cloneNode(true))
}

// Listen for changes then adjust grid
range.addEventListener('input', createTile)
function createTile() {
    let newValue = range.value;
    size.textContent = `${newValue} x ${newValue}`;
    canvas.setAttribute('style', `grid-template:repeat(${newValue}, 1fr)/ repeat(${newValue}, 1fr);`)

    // Add grid outline
    if (grid == true) pixel.classList.add('grid');

    // difference between the square of newValue 
    // and total amount of current nodes of canvas
    let resizeGrid = (newValue ** 2) - canvas.children.length;
    for (let i = 0; i < Math.abs(resizeGrid); i++)
    {
        if (resizeGrid > 0) {
            canvas.append(pixel.cloneNode())
        } else {
            canvas.removeChild(canvas.lastElementChild)
        }
    }
}

function random(max) {
    return Math.floor(Math.random() * max);
}

// TODO:
// Fix rainbow(random) to precise rainbow
// Consider Refactor 
canvas.addEventListener('mousedown', (e) => {
    let newColor = color.value;
    writing = true;
    if (writing && rainbow) {
        e.target.style.backgroundColor = `hsl(${random(360)}, 100%, ${random(100)}%)`;
    } else if (writing && erase) {
        e.target.style.backgroundColor = 'white';
    } else if (writing) {
        e.target.style.backgroundColor = `${newColor}`;
    }
    // hover
    const tiles = document.querySelectorAll('.tile');
    tiles.forEach(tile => tile.addEventListener('mouseover', (e) => {
        if (writing && rainbow) {
            e.target.style.backgroundColor = `hsl(${random(360)}, 100%, ${random(100)}%)`;
        } else if (writing && erase) {
            e.target.style.backgroundColor = 'white';
        } else if (writing) {
            e.target.style.backgroundColor = `${newColor}`;
        }
    }));
})


function enableEffect(event) {
    let effect = event.currentTarget.attributes.effect.value;
    if (effect == "erase") {
        if (btn_Erase.classList.contains("toggle")) {
            btn_Erase.classList.remove("toggle")
            return;
        }

        btn_Erase.classList.add("toggle")
        btn_Rainbow.classList.remove("toggle")
    }

    if (effect == "rainbow") {
        if (btn_Rainbow.classList.contains("toggle")) {
            btn_Erase.classList.remove("toggle")
            return;
        }

        btn_Rainbow.classList.add("toggle")
        btn_Erase.classList.remove("toggle")
    }
}

canvas.addEventListener('mouseup', () => {
    writing = false;
})

btn_Grid.addEventListener('click', () => {
    const tiles = document.querySelectorAll('.tile');
    if (!grid) {
        grid = true;
        tiles.forEach(tile => tile.classList.add('grid'))
        btn_Grid.classList.add('toggle')
    } else if (grid) {
        grid = false;
        tiles.forEach(tile => tile.classList.remove('grid'))
        btn_Grid.classList.remove('toggle')
    }
})
