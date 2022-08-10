const btn = document.querySelector('[data-btn="set"]');
const reset = document.querySelector('[data-btn="reset"]');
const rainbowBtn = document.querySelector('[data-btn="rainbow"');
const div = document.createElement('div');
const container = document.querySelector('.container');

let writing;
let rainbow = false;
div.classList.add('tile')

btn.addEventListener('click', (e) => {
    let pixel = prompt("set pixel size:");
    createTile(pixel);
})

reset.addEventListener('click', () => {
    const tiles = document.querySelectorAll('.tile');
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
            e.target.style.backgroundColor = `hsl(${random(360)}, ${random(100)}%, ${random(100)}%)`;
        } else if (writing) {
            e.target.style.backgroundColor = 'black';
        }
    }));
})


rainbowBtn.addEventListener('click', () => {
    if (!rainbow) {
        rainbow = true;
    } else if (rainbow) {
        rainbow = false;
    }
})

container.addEventListener('mouseup', (e) => {
    writing = false;
})




