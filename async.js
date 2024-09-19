const fs =require("fs");

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function OneSecPerChar(word, i = 0){
    if(!word.length)
        return 0;
    if (i<word.length)
        setTimeout((word,i)=>{
            console.log(word[i]);
            OneSecPerChar(word, i + 1)
            },1000,word,i)
}

function OneSecPerCharTheOriginal(word){
    if(!word.length)
        return 0;
    for(let i = 0; i < word.length; i++)
        setTimeout(() => {
            console.log(word[i])
        }, i * 1000);
}

let stock = "123456789"

//OneSecPerChar(stock)
//OneSecPerCharTheOriginal(stock)

const ac = new AbortController();
const signal = ac.signal;

signal.addEventListener('abort', () => {
    console.log('Time Out');
  }, { once: true });



async function askQuestion(question){
    return new Promise(resolve => {
        rl.question(question, { signal }, (answer) => {
          rl.pause()
          resolve(answer);
        });
    });
}

async function guess(toGuess){
    let guess = parseInt(await askQuestion("Your guess:"));
    if (toGuess === guess)
        return true;
    else if (toGuess > guess){
        console.log("Too low");
        return false;
    }
    else{
        console.log("Too High");
        return false;
    }
}

async function Gaming(){
    let toGuess = Math.floor(Math.random() * 11)
    let time = true
    let guessRight = false;
    let timeID = setTimeout(() => {
     time = false;
     ac.abort()
     // console.log("\nYou guess wrong, the number was " + toGuess)
    }, 5000);
    while(time === true && guessRight === false){
        guessRight = await guess(toGuess)
        console.log(time)
    }
    if (time){
        clearTimeout(timeID);
        rl.close()
    }
    rl.close()
    console.log(guessRight)
    if(guessRight === true)
        console.log("You guess right, the number was " + toGuess)
    else
        console.log("You guess wrong, the number was " + toGuess)
}

async function MainMenu(){
    if(await askQuestion("Type anything to start, 0 to leave\n") === "0")
        return;
    await Gaming();
    console.log("test")
}

MainMenu();