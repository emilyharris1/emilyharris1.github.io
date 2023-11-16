const btn = document.querySelector("button");
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

function random(number){
    return Math.floor(Math.random() * number);
}

function draw(){
    ctx.clearRect(0,0,canvas.width, canvas.height);
    let red = random(255);
    let color = "rgb("+red+"+0+0)";
    document.body.style.background = color;
    window.addEventListener("load",function() { changeBackground(color) });
}

btn.addEventListener("click", draw);



