console.log("test");

const x = 2;
const y = 2;

if(x === y){
    console.log("success");
}
else{
    console.log("fail");
}

const btn = document.querySelector("button");
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

document.addEventListener("DOMContentLoaded", () => {
    canvas.width = document.documentElement.clientWidth;
    canvas.height = document.documentElement.clientHeight;
})

function random(number){
    return Math.floor(Math.random() * number);
}

function random2(number){
    return(Math.random() * number);
}

function draw(){
    //console.log("test");

    ctx.clearRect(0,0,canvas.width, canvas.height);
    for(let i = 0; i<100; i++){
        ctx.beginPath();
        let red = random(255);
        let green = random(255);
        let blue = random(255);
        let alpha = random2(1);
        let radius = random(90);
        let color = "rgba("+red+","+green+","+blue+","+alpha+")";
        if(i<50){
            ctx.fillStyle = color;
        }
        if(i>=50){
            ctx.fillStyle = "rgba(0,0,255,0.5)";
        }
        ctx.arc(random(canvas.width), random(canvas.height), random(radius), 0, 2 * Math.PI);
        ctx.fill();

        document.body.style.background = color;
        window.addEventListener("load",function() { changeBackground(color) });
    }
}

btn.addEventListener("click", draw);



