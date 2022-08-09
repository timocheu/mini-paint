const btn = document.querySelector('[data-btn="set"]');
const reset = document.querySelector('[data-btn="reset"]');
const div = document.createElement('div');
const container = document.querySelector('.container');

div.classList.add('tile')

btn.addEventListener('click', (e) => {
    console.log(e);
    let pixel = prompt("set pixel size:");
    createTile(pixel);
})

reset.addEventListener('click', () => {
    const tiles = document.querySelectorAll('.tile');
    tiles.forEach(tile => tile.style.backgroundColor = 'white');
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
    const tiles = document.querySelectorAll('.tile');
    tiles.forEach(tile => tile.addEventListener('mouseover', (e) => {
        e.target.style.backgroundColor = 'black';
    }))
}


