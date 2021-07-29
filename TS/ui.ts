// References
/// <reference path="game.ts"/>

const mainScreenBox = document.getElementById("main-screen-box");
const mainScreenSelection = document.getElementById("main-screen-selection")
const mainScreenSettings = document.getElementById("main-screen-settings");
const outerContainer = document.getElementById("main-screen-outer-container");
const innerContainer = document.getElementById("main-screen-inner-container");
const endingScreen = document.getElementById("main-screen-ending-screen");

var isInMenu = true;

let settingsDisplayed:boolean = false;

function timeoutShowBox(){
    mainScreenSettings.style.transform = "translateX(0%)"
    mainScreenSettings.style.pointerEvents = "all";
}


function mainMenuShow(){
    innerContainer.style.transform = "translateX(0%)"
}

function showSettings(){
    if(settingsDisplayed == false){
        innerContainer.style.transform = "translateX(-200%)";
        innerContainer.style.pointerEvents = "none";
        settingsDisplayed = true;
        setTimeout(timeoutShowBox, 500);
    }else{
        settingsDisplayed = false;
        mainScreenSettings.style.transform = "translateX(100%)";
        mainScreenSettings.style.pointerEvents = "none";
        innerContainer.style.pointerEvents = "all";
        setTimeout(mainMenuShow, 500)
    }
}

function sliderClick(args){
    if(args.dataset.toggle === "false"){
        args.dataset.toggle = "true";
        args.classList.replace("slider-input-container","slider-input-container-active");
    }else{
        args.dataset.toggle = "false";
        args.classList.replace("slider-input-container-active","slider-input-container");
    }
}

const aimodeToggleCheckbox = document.getElementById("aimode-checkbox");

aimodeToggleCheckbox.addEventListener('click', function(e){
    if(aimodeToggleCheckbox.dataset.toggle === "true"){
        AIMode = true;
        console.log(AIMode)
    }else{
        AIMode = false;
        console.log(AIMode)
    }
});

const mainScreenSettingsHTML = document.getElementById("main-screen-settings");

function menuChange(args){
    console.log(isInMenu);
    if(args === true){
        isInMenu = true;
        outerContainer.style.overflowY = "hidden";
        outerContainer.style.overflowX = "hidden"
        document.body.style.overflowY = "hidden";
        mainScreenSettingsHTML.style.overflowY = "scroll";
        mainScreenSettingsHTML.style.overflowX = "hidden";
    }else{
        isInMenu = false;
        outerContainer.style.overflowY = "hidden";
        outerContainer.style.overflowX = "hidden";
        document.body.style.overflowY = "auto";
        document.body.style.overflowX = "hidden";
    }
}


function selection(){
    mainScreenSelection.style.pointerEvents = "all";
    mainScreenBox.style.pointerEvents = "none";
    mainScreenSelection.style.display = "flex";
    mainScreenBox.style.opacity = "0";
    mainScreenSelection.style.opacity = "1";

        
}

function selectionBack(){
    mainScreenBox.style.display = "flex";
    mainScreenBox.style.pointerEvents = "all";
    mainScreenSelection.style.pointerEvents = "none";
    mainScreenBox.style.opacity = "1";
    mainScreenSelection.style.opacity = "0";
}

function hideSelectionBox(){
    resetPlacements();
}

function selectPlayer(args){
    startGame();
    if(args === 1){
        p1symb = "circle";
        p2symb = "cross";
    }else if(args === 2){
        p1symb = "cross";
        p2symb = "circle";
    }
    
    mainScreenSelection.style.opacity = "0";
    mainScreenSelection.style.pointerEvents = "none";
    outerContainer.style.opacity = "0";
    outerContainer.style.pointerEvents = "none";
    innerContainer.style.pointerEvents = "none";
}

function endScreen(args){
    endingScreen.style.opacity = "1";
    endingScreen.style.pointerEvents = "all";
    const text = document.getElementById("ending-winner-display");
    text.innerHTML = args;
    menuChange(true);
    outerContainer.style.opacity = "1";
    outerContainer.style.pointerEvents = "all"
}


function endGame(args){
    if(AIMode === true){
        if(args==="1"){
            statsWinsUpdate(1,0,0);
            const endMessage = "You Win!";
            endScreen(endMessage);
        }else if(args==="2"){
            statsWinsUpdate(0,1,0);
            const endMessage = "Computer Wins!";
            endScreen(endMessage);
        }
    }else{
        if(args==="1"){
            statsWinsUpdate(1,0,0);
            const endMessage = "Player 1 Wins!";
            endScreen(endMessage);
        }else if(args=="2"){
            statsWinsUpdate(0,1,0);
            const endMessage = "Player 2 Wins!";
            endScreen(endMessage);
        }
    }
    if(args==="3"){
        statsWinsUpdate(0,0,1);
        const endMessage = "No Winner!"
        endScreen(endMessage)

    }
    // menuChange(true);
    // mainScreenContainer.style.opacity = "1";
    // mainScreenContainer.style.pointerEvents = "all";
}

menuChange(true);



async function playAgain(){
    await startGame();
    menuChange(false);
    endingScreen.style.opacity = "0";
    endingScreen.style.pointerEvents = "none";
    outerContainer.style.opacity = "0";
    outerContainer.style.pointerEvents = "none"

}

function backToMenu(){
    resetPlacements();
    endingScreen.style.opacity = "0";
    endingScreen.style.pointerEvents = "none";
    mainScreenBox.style.opacity = "1";
    mainScreenBox.style.pointerEvents = "all";
}

var p1winStats = document.getElementById("player-1-wins");
var p2winStats = document.getElementById("player-2-wins");
var noWinStats = document.getElementById("no-winners-info");
var turnsElapsedLastRoundInfo = document.getElementById("turns-elapsed-last-round-info");
var turnsElapsedTotalInfo = document.getElementById("turns-elapsed-total-info")

function statsWinsUpdate(p1,p2,noWin){
    let grabExistingP1 = p1winStats.innerHTML;
    let newScoreP1 = parseInt(grabExistingP1) + p1;
    p1winStats.innerHTML = String(newScoreP1);

    let grabExistingP2 = p2winStats.innerHTML;
    let newScoreP2 = parseInt(grabExistingP2) + p2;
    p2winStats.innerHTML = String(newScoreP2);

    let grabExistingNoWin = noWinStats.innerHTML;
    let newScoreNoWin = parseInt(grabExistingNoWin) + noWin;
    noWinStats.innerHTML = String(newScoreNoWin);

    


}

function statsUpdate(){
    turnsElapsedLastRoundInfo.innerHTML = String(turnsElapsedCurrent);
    turnsElapsedTotalInfo.innerHTML = String(turnsElapsedTotal);
}







