const canvas = document.getElementById("jsCanvas");
const controls = document.querySelector(".controls");
const colors = document.getElementsByClassName("jsColor");
const btns = document.querySelector(".controls__btn");
const fillBtn = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

const ctx = canvas.getContext("2d");

const INITIAL_SIZE = 500;
const INITIAL_COLOR = "2c2c2c";

canvas.width = INITIAL_SIZE;
canvas.height = INITIAL_SIZE;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, INITIAL_SIZE, INITIAL_SIZE);
ctx.lineWidth = 2.5;
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;

let painting = false;
let filling = false;

function changeFillColor() {
    if(filling) {
        ctx.fillRect(0, 0, INITIAL_SIZE, INITIAL_SIZE);
    }  
}

function handleModeChange() {
    if (filling === true) {
        filling = false;
        fillBtn.innerText = "FILL";
    } else {
        filling = true;
        fillBtn.innerText = "PAINT";
        ctx.fillStyle = ctx.strokeStyle;
    }
}
    


function handleChangeBrushSize(event) {
    const crntSize = event.target.value;
    ctx.lineWidth = crntSize;
}

function handleChangeColor(event) {
    const bkColor = event.target.style.backgroundColor;
    ctx.strokeStyle = bkColor;
    ctx.fillStyle = bkColor;
}

function stopPainting() {
    painting = false;
}

function onMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY;

    if(!painting) {
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else {
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}

function onMouseDown(event) {
    painting = true;
}

function handleCM(event) {
    event.preventDefault();
}
function handleSaveBtn() {
    const image = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = image;
    link.download = "saveThisImage";
    link.click();

}

function init() {
    if(canvas) {
        canvas.addEventListener("mousemove", onMouseMove);
        canvas.addEventListener("mouseup", stopPainting);
        canvas.addEventListener("mousedown", onMouseDown);
        canvas.addEventListener("mouseleave", stopPainting);
        canvas.addEventListener("click", changeFillColor);
        canvas.addEventListener("contextmenu", handleCM);
    }

    Array.from(colors).forEach(color => 
        color.addEventListener("click", handleChangeColor));

    controls.addEventListener("input", handleChangeBrushSize);
    fillBtn.addEventListener("click", handleModeChange);
    saveBtn.addEventListener("click", handleSaveBtn);
}
init();

