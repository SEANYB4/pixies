const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let gridSize = 20;
ctx.strokeStyle = 'gray';


const canvasWidth = canvas.width;
const canvasHeight = canvas.height;

let selectedColor = 'black';
let backgroundImage = new Image();


let pixels = [];


// image upload

let imageUpload = document.getElementById('imageUpload');
imageUpload.addEventListener('change', handleImageUpload, false);


function handleImageUpload(event) {

    let file = event.target.files[0];


    if (file) {

        let reader = new FileReader();
        reader.onload = () => {
            backgroundImage = new Image();
            backgroundImage.onload = () => {
                ctx.globalAlpha = 0.5;
                ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
                ctx.globalAlpha = 1;
            }
            backgroundImage.src = reader.result;
        }
        reader.readAsDataURL(file);
    }
}



// color picker

let colorPicker = document.getElementById('colorPicker');
colorPicker.addEventListener('change', (event) => {
    selectedColor = event.target.value;

})


// grid size picker

let gridSizePicker = document.getElementById('gridSizePicker');
gridSizePicker.addEventListener('change', (event) => {

    // gridSize = event.target.value;
})



// GRID


const drawGrid =  () => {

    // Draw vertical lines
    for (var x = 0; x <= canvasWidth; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvasHeight);
        ctx.stroke();
    }

    // Draw horizontal lines
    for(var y = 0; y <= canvasHeight; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvasWidth, y);
        ctx.stroke();
    }


}







// event listeners

// DRAW

canvas.addEventListener('click', (event) => {

    if (event.altKey) {

        return
    }

    let rect = canvas.getBoundingClientRect();
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;

    // snap coordinates to grid
    let gridX = 0;
    let gridY = 0;

    for (let i = 0; i < canvasWidth; i+=gridSize) {
        if(x >= i && x <= (i+gridSize)) {
            gridX = i;
        }
    }

    for (let i = 0; i < canvasHeight; i+=gridSize) {
        if(y >= i && y <= (i+gridSize)) {
            gridY = i;
        }
    }
    


    // Add pixel to global array

    pixels.push({
        x: gridX,
        y: gridY,
        color: selectedColor
    })



    // Draw the pixel
    ctx.fillStyle = selectedColor;
    ctx.fillRect(gridX, gridY, gridSize, gridSize);


});


// ERASE

canvas.addEventListener('click', (event) => {


    if (event.altKey) {

        console.log(pixels);
        pixels.pop();
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);

        ctx.globalAlpha = 0.5;
        ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
        ctx.globalAlpha = 1;


        drawGrid();
        pixels.forEach((pixel) => {
            ctx.fillStyle = pixel.color;
            ctx.fillRect(pixel.x, pixel.y, gridSize, gridSize);
        })
    }


})



drawGrid();