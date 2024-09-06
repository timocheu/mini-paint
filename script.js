// Tools
const canvas = document.querySelector('.canvas');
const pixel = document.createElement('div');
pixel.classList.add('tile');

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

// Initialize pixels on canvas
createTile();

btn_Rainbow.addEventListener('click', enableEffect)
btn_Erase.addEventListener('click', enableEffect)
btn_Reset.addEventListener('click', () => {
    const tiles = document.querySelectorAll('.tile');
    tiles.forEach(tile => tile.style.backgroundColor = "");
})

// Listen for changes then adjust grid
range.addEventListener('input', createTile)
function createTile() {
    let newValue = range.value;
    size.textContent = `${newValue} x ${newValue}`;
    canvas.setAttribute('style', `grid-template:repeat(${newValue}, 1fr)/ repeat(${newValue}, 1fr);`)

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

    if (btn_Grid.classList.contains('toggle')) {
        setTimeout(() => {
            const tiles = document.querySelectorAll('.tile')
            tiles.forEach(tile => tile.classList.add('grid'));
        }, 2000);
    }
}


canvas.addEventListener('mousedown', () => {
    let write = true;

    // Rainbow
    let rainbow;
    let rainbowHueCounter = 0;
    
    // Erase
    let erase;

    if (btn_Erase.classList.contains('toggle')) {
        erase = true;
    }

    if (btn_Rainbow.classList.contains('toggle')) {
        rainbow = true;
    }

    canvas.addEventListener('mouseover', (e) => {
        if (write) {
            if (rainbow) {
                e.target.style.backgroundColor = `hsl(${rainbowHueCounter}, 100%, 40%)`;
                // rate of change of rainbow
                rainbowHueCounter += 8;
            } else if (erase) {
                e.target.style.backgroundColor = "";
            } else {
                e.target.style.backgroundColor = `${color.value}`;
            }

        }
    })

    canvas.addEventListener('mouseup', () => {
        write = false;
    }) 
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

btn_Grid.addEventListener('click', () => {
    const tiles = document.querySelectorAll('.tile');
    if (btn_Grid.classList.contains('toggle')) {
        tiles.forEach(tile => tile.classList.remove('grid'))
        btn_Grid.classList.remove('toggle')
    } else {
        tiles.forEach(tile => tile.classList.add('grid'))
        btn_Grid.classList.add('toggle')
    }
})
