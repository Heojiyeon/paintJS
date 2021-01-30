const canvas = document.getElementById("jsCanvas");
const controls = document.querySelector(".controls");
const colors = document.getElementsByClassName("jsColor");
const btns = document.querySelector(".controls__btn");
const fillBtn = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

const ctx = canvas.getContext("2d");


canvas.width = 500;
canvas.height = 500;

ctx.lineWidth = 2.5;
ctx.strokeStyle = "#2c2c2c";

let painting = false;

function handleFillBtn() {
    let region = new Path2D();
    const crntColor = ctx.strokeStyle;
    ctx.fillStyle = crntColor;
    ctx.fill(region);
}

function handleChangeBrushSize(event) {
    const crntSize = event.target.value;
    ctx.lineWidth = crntSize;
}

function handleChangeColor(event) {
    const bkColor = event.target.style.backgroundColor;
    ctx.strokeStyle = bkColor;
    console.log(ctx.strokeStyle);
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

function init() {
    if(canvas) {
        canvas.addEventListener("mousemove", onMouseMove);
        canvas.addEventListener("mouseup", stopPainting);
        canvas.addEventListener("mousedown", onMouseDown);
        canvas.addEventListener("mouseleave", stopPainting);
    }

    Array.from(colors).forEach(color => 
        color.addEventListener("click", handleChangeColor));

    controls.addEventListener("input", handleChangeBrushSize);
    fillBtn.addEventListener("click", handleFillBtn);
}
init();

