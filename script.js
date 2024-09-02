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

const container = document.querySelector('.container');

const div = document.createElement('div');
div.classList.add('tile')

let writing;
let rainbow = false;
let erase = false;  
let defaultGrid = true;
let grid = false;
let newColor;

if (defaultGrid) {
    for (i = 0; i < (16 * 16); i++) {
        container.appendChild(div.cloneNode(true))
    }
}

// Reset the grid
btn_Reset.addEventListener('click', () => {
    const tiles = document.querySelectorAll('.tile');
    tiles.forEach(tile => tile.style.backgroundColor = 'white')
})

// Listen for changes then adjust grid
range.addEventListener('input', createTile)
function createTile() {
    let newValue = range.value;
    size.textContent = `${newValue} x ${newValue}`;
    container.setAttribute('style', `grid-template:repeat(${newValue}, 1fr)/ repeat(${newValue}, 1fr);`)

    // Add grid outline
    if (grid == true) div.classList.add('grid');

    // difference between the square of newValue 
    // and total amount of current nodes of container
    let resizeGrid = (newValue ** 2) - container.children.length;
    for (let i = 0; i < Math.abs(resizeGrid); i++)
    {
        if (resizeGrid > 0) {
            container.append(div.cloneNode())
        } else {
            container.removeChild(container.lastElementChild)
        }
    }
}

function random(max) {
    return Math.floor(Math.random() * max);
}

// TODO:
// Fix rainbow(random) to precise rainbow
container.addEventListener('mousedown', (e) => {
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

btn_Rainbow.addEventListener('click', enableEffect)
btn_Erase.addEventListener('click', enableEffect)

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
        console.log("Hello");
        if (btn_Rainbow.classList.contains("toggle")) {
            btn_Erase.classList.remove("toggle")
            return;
        }

        btn_Rainbow.classList.add("toggle")
        btn_Erase.classList.remove("toggle")
    }
}

// TODO:
// Refactor this
// btn_Rainbow.addEventListener('click', () => {
//     if (!rainbow) {
//         rainbow = true;
//         btn_Rainbow.classList.add('toggle')
//         if (erase) {
//             erase = false;
//             btn_Erase.classList.remove('toggle')
//         }
//     } else if (rainbow) {
//         rainbow = false;
//         btn_Rainbow.classList.remove('toggle')
//     }
// })

// // TODO:
// // Refactor
// btn_Erase.addEventListener('click', () => {
//     if (!erase) {
//         erase = true;
//         btn_Erase.classList.add('toggle')
//         if (rainbow) {
//             rainbow = false;
//             btn_Rainbow.classList.remove('toggle')
//         }
//     } else if (erase) {
//         erase = false;
//         btn_Erase.classList.remove('toggle')
//     }
// })
container.addEventListener('mouseup', () => {
    writing = false;
})

btn_Grid.addEventListener('click', function () {
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
