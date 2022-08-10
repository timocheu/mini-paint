const btn = document.querySelector('[data-btn="set"]');
const reset = document.querySelector('[data-btn="reset"]');
const rainbowBtn = document.querySelector('[data-btn="rainbow"');
const eraserBtn = document.querySelector('[data-btn="erase"');
const div = document.createElement('div');
const container = document.querySelector('.container');
div.classList.add('tile')

let writing;
let rainbow = false;
let erase = false;
let defaultGrid = true;

if (defaultGrid) {
    for (i = 0; i < (16 * 16); i++) {
        container.appendChild(div.cloneNode(true))
    }
}


btn.addEventListener('click', (e) => {
    let pixel = prompt("set pixel size:");
    createTile(pixel);
})

reset.addEventListener('click', () => {
    const tiles = document.querySelectorAll('.tile');
    tiles.forEach(tile => tile.style.backgroundColor = 'white')
})

function createTile(n) {
    if (n > 100) {
        return alert("max pixel is 100");
    } else if (n == null) {
        return;
    }
    container.setAttribute('style', `grid-template:repeat(${n}, 1fr)/ repeat(${n}, 1fr);`)
    for (let i = 0; i < (n * n); i++) {
        container.appendChild(div.cloneNode(true))
    }
}

function random(max) {
    return Math.floor(Math.random() * max);
}

container.addEventListener('mousedown', () => {
    writing = true;
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




