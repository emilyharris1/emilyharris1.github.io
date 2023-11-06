const storyText = "It was a chilly Halloween night at 43 degrees farenheit. This year you dressed up as :inserta:. For the first time ever, you decided to enter your town's haunted house alongside your best friend :insertb:. You slowly creak open the door and enter the dimly lit hallway. As you start to walk forward, you feel something brush against your back. You whip around to discover a person dressed as :insertc: standing right behind you. You scream and drag :insertb: along with you to the next room. Here, an old lady tells you to pick one of the potions lined up in front of you to drink from. You pick the :insertd: colored potion that tastes like :inserte:. The next thing you know, you and :insertb: are back at your house each holding a bag full of 15 pounds of candy. How did we get here your friend asks. I have no idea you respond. All I know is I can't wait to go back to that haunted house again!";
const inserta = ["Jake from State Farm", "Pedro Pascal", "Bob Ross", "the Muffin Man"];
const insertb = ["Dwayne “The Rock” Johnson", "Steve", "Billy Bob Josephine", "former USSR leader Mikhail Gorbachev"];
const insertc = ["you", "Elvis", "the giant baby from Spirited Away", "a grape", "Aaron Burr, Sir"];
const insertd = ["puce", "vermillion", "dolphin pink", "goose turd green", "baby food brown", "cotton candy pink"];
const inserte = ["your favorite food", "your least favorite food", "spoiled milk", "copper"];


const customCandy = document.getElementById('customcandy');
const randomize = document.querySelector('.randomize');
const story = document.querySelector('.story');

function randomValueFromArray(array){
  const random = Math.floor(Math.random()*array.length);
  return array[random];
}

randomize.addEventListener('click', result);

function result() {
    let newStory = storyText;
    const aItem = randomValueFromArray(inserta);
    const bItem = randomValueFromArray(insertb);
    const cItem = randomValueFromArray(insertc);
    const dItem = randomValueFromArray(insertd);
    const eItem = randomValueFromArray(inserte);

    newStory = newStory.replace(":inserta:", aItem);
    newStory = newStory.replaceAll(":insertb:", bItem);
    newStory = newStory.replace(":insertc:", cItem);
    newStory = newStory.replace(":insertd:", dItem);
    newStory = newStory.replace(":inserte:", eItem);

    if(customCandy.value !== '') {
        const candy = customCandy.value;
        newStory = newStory.replace("candy", candy);
    }

    if(document.getElementById("uk").checked) {
        const weight = Math.round(15/14) + " stone";
        const temperature =  Math.round((43-32) * (5/9)) + " degrees celsius";
        newStory = newStory.replace("15 pounds", weight);
        newStory = newStory.replace("43 degrees farenheit", temperature);
    }

    story.textContent = newStory;
    story.style.visibility = "visible";
}

