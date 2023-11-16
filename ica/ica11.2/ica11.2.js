const btn = document.querySelector("button");
const canvas = document.querySelector("body");

function random(number){
    return Math.floor(Math.random() * number);
}

function draw(){
    let red = random(255);
    let color = "rgb("+red+"+0+0)";
    canvas.style.backgroundColor = color;
    window.addEventListener("load",function() {changeBackground(color)});
}

btn.addEventListener("click", draw);