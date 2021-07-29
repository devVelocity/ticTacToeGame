// References
/// <reference path="game.ts"/>
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var mainScreenBox = document.getElementById("main-screen-box");
var mainScreenSelection = document.getElementById("main-screen-selection");
var mainScreenSettings = document.getElementById("main-screen-settings");
var outerContainer = document.getElementById("main-screen-outer-container");
var innerContainer = document.getElementById("main-screen-inner-container");
var endingScreen = document.getElementById("main-screen-ending-screen");
var isInMenu = true;
var settingsDisplayed = false;
function timeoutShowBox() {
    mainScreenSettings.style.transform = "translateX(0%)";
    mainScreenSettings.style.pointerEvents = "all";
}
function mainMenuShow() {
    innerContainer.style.transform = "translateX(0%)";
}
function showSettings() {
    if (settingsDisplayed == false) {
        innerContainer.style.transform = "translateX(-200%)";
        innerContainer.style.pointerEvents = "none";
        settingsDisplayed = true;
        setTimeout(timeoutShowBox, 500);
    }
    else {
        settingsDisplayed = false;
        mainScreenSettings.style.transform = "translateX(100%)";
        mainScreenSettings.style.pointerEvents = "none";
        innerContainer.style.pointerEvents = "all";
        setTimeout(mainMenuShow, 500);
    }
}
function sliderClick(args) {
    if (args.dataset.toggle === "false") {
        args.dataset.toggle = "true";
        args.classList.replace("slider-input-container", "slider-input-container-active");
    }
    else {
        args.dataset.toggle = "false";
        args.classList.replace("slider-input-container-active", "slider-input-container");
    }
}
var aimodeToggleCheckbox = document.getElementById("aimode-checkbox");
aimodeToggleCheckbox.addEventListener('click', function (e) {
    if (aimodeToggleCheckbox.dataset.toggle === "true") {
        AIMode = true;
        console.log(AIMode);
    }
    else {
        AIMode = false;
        console.log(AIMode);
    }
});
var mainScreenSettingsHTML = document.getElementById("main-screen-settings");
function menuChange(args) {
    console.log(isInMenu);
    if (args === true) {
        isInMenu = true;
        outerContainer.style.overflowY = "hidden";
        outerContainer.style.overflowX = "hidden";
        document.body.style.overflowY = "hidden";
        mainScreenSettingsHTML.style.overflowY = "scroll";
        mainScreenSettingsHTML.style.overflowX = "hidden";
    }
    else {
        isInMenu = false;
        outerContainer.style.overflowY = "hidden";
        outerContainer.style.overflowX = "hidden";
        document.body.style.overflowY = "auto";
        document.body.style.overflowX = "hidden";
    }
}
function selection() {
    mainScreenSelection.style.pointerEvents = "all";
    mainScreenBox.style.pointerEvents = "none";
    mainScreenSelection.style.display = "flex";
    mainScreenBox.style.opacity = "0";
    mainScreenSelection.style.opacity = "1";
}
function selectionBack() {
    mainScreenBox.style.display = "flex";
    mainScreenBox.style.pointerEvents = "all";
    mainScreenSelection.style.pointerEvents = "none";
    mainScreenBox.style.opacity = "1";
    mainScreenSelection.style.opacity = "0";
}
function hideSelectionBox() {
    resetPlacements();
}
function selectPlayer(args) {
    startGame();
    if (args === 1) {
        p1symb = "circle";
        p2symb = "cross";
    }
    else if (args === 2) {
        p1symb = "cross";
        p2symb = "circle";
    }
    mainScreenSelection.style.opacity = "0";
    mainScreenSelection.style.pointerEvents = "none";
    outerContainer.style.opacity = "0";
    outerContainer.style.pointerEvents = "none";
    innerContainer.style.pointerEvents = "none";
}
function endScreen(args) {
    endingScreen.style.opacity = "1";
    endingScreen.style.pointerEvents = "all";
    var text = document.getElementById("ending-winner-display");
    text.innerHTML = args;
    menuChange(true);
    outerContainer.style.opacity = "1";
    outerContainer.style.pointerEvents = "all";
}
function endGame(args) {
    if (AIMode === true) {
        if (args === "1") {
            statsWinsUpdate(1, 0, 0);
            var endMessage = "You Win!";
            endScreen(endMessage);
        }
        else if (args === "2") {
            statsWinsUpdate(0, 1, 0);
            var endMessage = "Computer Wins!";
            endScreen(endMessage);
        }
    }
    else {
        if (args === "1") {
            statsWinsUpdate(1, 0, 0);
            var endMessage = "Player 1 Wins!";
            endScreen(endMessage);
        }
        else if (args == "2") {
            statsWinsUpdate(0, 1, 0);
            var endMessage = "Player 2 Wins!";
            endScreen(endMessage);
        }
    }
    if (args === "3") {
        statsWinsUpdate(0, 0, 1);
        var endMessage = "No Winner!";
        endScreen(endMessage);
    }
    // menuChange(true);
    // mainScreenContainer.style.opacity = "1";
    // mainScreenContainer.style.pointerEvents = "all";
}
menuChange(true);
function playAgain() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, startGame()];
                case 1:
                    _a.sent();
                    menuChange(false);
                    endingScreen.style.opacity = "0";
                    endingScreen.style.pointerEvents = "none";
                    outerContainer.style.opacity = "0";
                    outerContainer.style.pointerEvents = "none";
                    return [2 /*return*/];
            }
        });
    });
}
function backToMenu() {
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
var turnsElapsedTotalInfo = document.getElementById("turns-elapsed-total-info");
function statsWinsUpdate(p1, p2, noWin) {
    var grabExistingP1 = p1winStats.innerHTML;
    var newScoreP1 = parseInt(grabExistingP1) + p1;
    p1winStats.innerHTML = String(newScoreP1);
    var grabExistingP2 = p2winStats.innerHTML;
    var newScoreP2 = parseInt(grabExistingP2) + p2;
    p2winStats.innerHTML = String(newScoreP2);
    var grabExistingNoWin = noWinStats.innerHTML;
    var newScoreNoWin = parseInt(grabExistingNoWin) + noWin;
    noWinStats.innerHTML = String(newScoreNoWin);
}
function statsUpdate() {
    turnsElapsedLastRoundInfo.innerHTML = String(turnsElapsedCurrent);
    turnsElapsedTotalInfo.innerHTML = String(turnsElapsedTotal);
}
