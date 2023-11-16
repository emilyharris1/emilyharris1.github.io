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



const newBtn = document.querySelector('#js-new-quote'). addEventListener('click', getQuestion);
const newBtn2 = document.querySelector('#js-tweet'). addEventListener('click', displayPunchline);
const body = document.querySelector('body');

const questionTxt = document.querySelector('#js-quote-text');
let punchlineTxt = document.querySelector('#js-answer-text');
let punchline = '';
const endpoint = 'https://official-joke-api.appspot.com/random_joke';
// const element = document.querySelector('.demo');
document.body.style.background = color;

async function getQuestion(){
    try{
        const response = await fetch(endpoint);
        if(!response.ok){
            throw Error(response.statusText);
        }
        const json = await response.json();
        if(json['type'] = 'programming'){
            let color = "rgba(0,0,255,0.5)";
            // sample.style.color = 'red';
        }else{
            // element.style.backgroundColor = 'red';
            let color = "rgba(0,0,255,0.5)";
            window.addEventListener("load",function() { changeBackground(color) });
        }
        displayQuestion(json['setup']);
        punchline = json['punchline'];
        punchlineTxt.textContent = '';
    }
    catch(err){
        console.log(err);
        alert('Failed');
    }
}

function displayQuestion(setup){
    questionTxt.textContent = setup;
}

function displayPunchline(){
    punchlineTxt.textContent = punchline;
}

getQuestion();