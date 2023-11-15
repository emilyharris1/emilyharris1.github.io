const newBtn = document.querySelector('#js-new-quote'). addEventListener('click', getQuote);
const newBtn2 = document.querySelector('#js-tweet'). addEventListener('click', displayAnswer);
const questionTxt = document.querySelector('#js-quote-text');
let answerTxt = document.querySelector('#js-answer-text');
let answer = '';
const endpoint = 'https://trivia.cyberwisp.com/getrandomchristmasquestion';

async function getQuote(){
    //console.log('Test');
    try{
        const response = await fetch(endpoint);
        if(!response.ok){
            throw Error(response.statusText);
        }
        const json = await response.json();
        displayQuote(json['question']);
        answer = json['answer'];
        answerTxt.textContent = '';
        //console.log(json);
    }
    catch(err){
        console.log(err);
        alert('Failed');
    }
}

function displayQuote(question){
    questionTxt.textContent = question;
}

function displayAnswer(){
    answerTxt.textContent = answer;
}

getQuote();



