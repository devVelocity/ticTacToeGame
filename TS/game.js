// References
/// <reference path="ui.ts"/>
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
var crossClicked = [];
var circleClicked = [];
var elementsVarV2 = document.getElementsByClassName("uninteracted-button");
var playerTurn = 1;
var player2Turn = 0;
var turn = 1;
var p1symb = "circle";
var p2symb = "cross";
var turnsElapsedTotal = 0;
var turnsElapsedCurrent = 0;
var AIMode = true;
var gameOngoing = true;
var player1win = false;
var player2win = false;
var winningConditions = [
    [1, 2, 3],
    [3, 2, 1],
    [2, 5, 8],
    [8, 5, 2],
    [3, 6, 9],
    [9, 3, 6],
    [7, 4, 1],
    [4, 5, 6],
    [6, 5, 4],
    [7, 8, 9],
    [9, 8, 7],
    [1, 5, 9],
    [9, 5, 1],
    [3, 5, 7],
    [7, 5, 3],
];
// NOTES
// AI NEEDS BEEFING IN ORDER TO DETECT WHEN THE OTHER PLAYER IS ABOUT TO WIN
var possiblePlacements = 9;
var occupiedPlacements = [];
function lockBoxes() {
    for (var i = 0; i < elementsVarV2.length; i++) {
        var grabBox = elementsVarV2[i];
        grabBox.disabled = true;
    }
}
function unlockBoxes() {
    for (var i = 0; i < elementsVarV2.length; i++) {
        var grabBox = elementsVarV2[i];
        if (grabBox.classList.contains("uninteracted-button")) {
            grabBox.disabled = false;
        }
    }
}
var winningRule = [];
function winCheck() {
    if (gameOngoing === true) {
        for (var i = 0; i < winningConditions.length; i++) {
            var count = 0;
            for (var v = 0; v < winningConditions[i].length; v++) {
                var findBox = document.getElementById("b_" + winningConditions[i][v]);
                if (findBox.classList.contains("circle-button")) {
                    count++;
                    if (count === 3) {
                        winningRule = i;
                        // console.log(`%c ${winningRule} `, `Winning Rule`);
                        if (p1symb == "circle") {
                            player1win = true;
                            setTimeout("endGame(\"1\")", 1000);
                            gameOngoing = false;
                        }
                        else {
                            player2win = true;
                            setTimeout("endGame(\"2\")", 1000);
                            gameOngoing = false;
                        }
                        pWin();
                    }
                }
            }
        }
        for (var i = 0; i < winningConditions.length; i++) {
            var count = 0;
            for (var v = 0; v < winningConditions[i].length; v++) {
                var findBox = document.getElementById("b_" + winningConditions[i][v]);
                if (findBox.classList.contains("cross-button")) {
                    count++;
                    if (count === 3) {
                        winningRule = i;
                        // console.log(`%c ${winningRule} ', Winning Rule`);
                        if (p1symb == "cross") {
                            player1win = true;
                            setTimeout("endGame(\"1\")", 1000);
                            gameOngoing = false;
                        }
                        else {
                            player2win = true;
                            setTimeout("endGame(\"2\")", 1000);
                            gameOngoing = false;
                        }
                        pWin();
                    }
                }
            }
        }
        console.log(occupiedPlacements.length);
        if (occupiedPlacements.length === 9 && player1win === false && player2win === false) {
            gameOngoing = false;
            // console.log("No Winner");
            statsWinsUpdate(0, 0, 1);
            setTimeout("endGame(\"3\")", 1000);
        }
    }
}
function pWin() {
    gameOngoing = false;
    // console.log(`%c Received ${winningRule}`,`color:green`)
    if (player1win === true) {
        console.log("%c Player 1 Win", 'color: orange');
    }
    else if (player2win === true) {
        console.log("%c Player 2 Win", 'color: orange');
    }
    for (var i = 1; i <= possiblePlacements; i++) {
        var combined = "b_" + i;
        var grabElement = document.getElementById(combined);
        if (winningConditions[winningRule].includes(i)) {
            grabElement.classList.replace("circle-button", "circle-win");
            grabElement.classList.replace("cross-button", "cross-win");
        }
        else {
            grabElement.style.opacity = "0.3";
            grabElement.classList.replace("uninteracted-button", "dead-button");
        }
    }
}
function singePlayerChanger() {
    unlockBoxes();
}
function turnChange() {
    if (gameOngoing === true) {
        turnsElapsedTotal++;
        turnsElapsedCurrent++;
        statsUpdate();
        winCheck();
        if (AIMode === false) {
            setTimeout(singePlayerChanger, 500);
        }
        if (turn === 0) {
            turn = 1;
        }
        else if (turn === 1) {
            turn = 0;
        }
        if (turn == player2Turn && AIMode === true) {
            computerPlacement();
        }
    }
}
function buttonClicked(numberClicked) {
    if (gameOngoing === true) {
        var numberConverted = parseInt(numberClicked);
        if (occupiedPlacements.includes(numberConverted)) {
        }
        else {
            if (turn === playerTurn) {
                var findSquare = document.getElementById("b_" + numberConverted);
                if (p1symb === "circle") {
                    findSquare.classList.replace("uninteracted-button", "circle-button");
                    findSquare.disabled = true;
                    circleClicked.push(parseInt(numberClicked));
                    occupiedPlacements.push(parseInt(numberClicked));
                }
                else {
                    findSquare.classList.replace("uninteracted-button", "cross-button");
                    findSquare.disabled = true;
                    crossClicked.push(parseInt(numberClicked));
                    occupiedPlacements.push(parseInt(numberClicked));
                }
            }
            else if (turn === player2Turn && AIMode === false) {
                var findSquare = document.getElementById("b_" + numberConverted);
                if (p2symb === "circle") {
                    findSquare.classList.replace("uninteracted-button", "circle-button");
                    findSquare.disabled = true;
                    circleClicked.push(parseInt(numberClicked));
                    occupiedPlacements.push(parseInt(numberClicked));
                }
                else {
                    findSquare.classList.replace("uninteracted-button", "cross-button");
                    findSquare.disabled = true;
                    crossClicked.push(parseInt(numberClicked));
                    occupiedPlacements.push(parseInt(numberClicked));
                }
            }
            else {
                console.log("Not Players Turn");
            }
            lockBoxes();
            setTimeout(turnChange, 600);
        }
    }
}
var boxCounter = 0;
var blankArray = [];
var findingPlacements = null;
function autoPlacements() {
    var findPossibleBoxes = findPossibleAutoPlacements();
    console.log(findPossibleBoxes);
    // console.log(data1);
    // console.log(data2)
    var maxDataCounter = 0;
    if (findPossibleBoxes !== null && findPossibleBoxes !== undefined) {
        if (p2symb === "circle") {
            findPossibleBoxes.classList.replace("uninteracted-button", "circle-button");
        }
        else {
            findPossibleBoxes.classList.replace("uninteracted-button", "cross-button");
        }
        return true;
    }
    else {
        return null;
    }
}
function checkWinArray2(args) {
    for (var i = 0; i < args.length; i++) {
        var findBox = document.getElementById("b_" + args[i]);
        if (findBox.classList.contains("uninteracted-button")) {
            var boxNum = findBox.id;
            var splitBox = boxNum.split("b_");
            occupiedPlacements.push(splitBox[1]);
            return findBox;
        }
    }
}
var alreadyUsedArray = false;
function checkWinArray(args) {
    var unintButtons = 0;
    var otherButtons = 0;
    for (var i = 0; i < args.length; i++) {
        var checkItem = document.getElementById("b_" + args[i]);
        if (checkItem.classList.contains("uninteracted-button")) {
            unintButtons++;
        }
        else if (checkItem.classList.contains(p1symb + "-button")) {
            otherButtons++;
            if (otherButtons === 2) {
                console.log("%c Win check needed", "color: BLUE");
                return checkWinArray2(args);
            }
        }
    }
    return null;
}
function findPossibleAutoPlacements() {
    for (var i = 0; i < winningConditions.length; i++) {
        var winAmount = checkWinArray(winningConditions[i]);
        if (winAmount === null || winAmount === undefined) {
        }
        else {
            console.log(winAmount);
            return winAmount;
        }
    }
    return null;
}
function computerPlacement() {
    if (gameOngoing === true) {
        if (turn === player2Turn) {
            lockBoxes();
            var findAuto = autoPlacements();
            console.log("%c " + findAuto, "color: red;font-size-18px");
            if (findAuto === null) {
                var randomNumber = 0;
                var randomNumber = Math.floor((Math.random() * possiblePlacements) + 1);
                var computerChoice = randomNumber;
                if (occupiedPlacements.includes(randomNumber) === true) {
                    if (occupiedPlacements.length != 9) {
                        // console.log("Returning")
                        computerPlacement();
                        return;
                    }
                }
                else {
                    var selectBox = document.getElementById("b_" + computerChoice);
                    if (p2symb === "circle") {
                        selectBox.classList.replace("uninteracted-button", "circle-button");
                        occupiedPlacements.push(computerChoice);
                        selectBox.disabled = true;
                    }
                    else {
                        selectBox.classList.replace("uninteracted-button", "cross-button");
                        occupiedPlacements.push(computerChoice);
                        selectBox.disabled = true;
                    }
                    turnChange();
                    setTimeout(unlockBoxes, 500);
                    // console.log(computerChoice);
                }
            }
            else {
                turnChange();
                setTimeout(unlockBoxes, 500);
            }
        }
    }
}
computerPlacement();
function resetPlacements() {
    var doc1 = document.querySelectorAll(".cross-button");
    var doc2 = document.querySelectorAll(".circle-button");
    var doc3 = document.querySelectorAll(".cross-win");
    var doc4 = document.querySelectorAll(".circle-win");
    var doc5 = document.querySelectorAll(".dead-button");
    doc1.forEach(function (e) {
        e.className = 'uninteracted-button';
        e.disabled = false;
        e.style.opacity = "1";
    });
    doc2.forEach(function (e) {
        e.className = 'uninteracted-button';
        e.disabled = false;
        e.style.opacity = "1";
    });
    doc3.forEach(function (e) {
        e.className = 'uninteracted-button';
        e.disabled = false;
        e.style.opacity = "1";
    });
    doc4.forEach(function (e) {
        e.className = 'uninteracted-button';
        e.disabled = false;
        e.style.opacity = "1";
    });
    doc5.forEach(function (e) {
        e.className = 'uninteracted-button';
        e.disabled = false;
        e.style.opacity = "1";
    });
}
function startGame() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, resetPlacements()];
                case 1:
                    _a.sent();
                    turnsElapsedCurrent = 0;
                    statsUpdate();
                    gameOngoing = true;
                    player1win = false;
                    player2win = false;
                    occupiedPlacements = [];
                    turn = 1;
                    return [2 /*return*/];
            }
        });
    });
}
;
