const btn = document.querySelector("button");
const canvas = document.querySelector("body");

function random(number){
    return Math.floor(Math.random() * number);
}

function draw(){
    let green = random(255);
    let color = "rgb(0+"+green+"+0)";
    canvas.style.backgroundColor = color;
    window.addEventListener("load",function() {changeBackground(color)});
}

btn.addEventListener("click", draw);


const newBtn = document.querySelector('#js-new-quote'). addEventListener('click', getQuestion);
const newBtn2 = document.querySelector('#js-tweet'). addEventListener('click', displayPunchline);
const body = document.querySelector('body');

const dogImg = document.querySelector('#js-dog-img');
//document.getElementById("textContent");

const questionTxt = document.querySelector('#js-quote-text');
let punchlineTxt = document.querySelector('#js-answer-text');
let punchline = '';
const endpoint = 'https://official-joke-api.appspot.com/random_joke';
const endpoint2 = 'https://dog.ceo/api/breeds/image/random';

document.body.style.background = color;

async function getQuestion(){
    try{
        const response = await fetch(endpoint);
        if(!response.ok){
            throw Error(response.statusText);
        }
        const json = await response.json();
        displayQuestion(json['setup']);
        punchline = json['punchline'];
        punchlineTxt.textContent = '';
    }
    catch(err){
        console.log(err);
        alert('Failed');
    }
    // try{
    //     const response2 = await fetch(endpoint2);
    //     if(!response2.ok){
    //         throw Error(response2.statusText);
    //     }
    //     const json2 = await response2.json2();
    //     displayQuestion(json2['message']);
    // }
    // catch(err){
    //     console.log(err);
    //     alert('Failed');
    // }
}

function displayQuestion(setup){
    questionTxt.textContent = setup;
    //dogImg.imgContent = message;
}

function displayPunchline(){
    punchlineTxt.textContent = punchline;
}

getQuestion();