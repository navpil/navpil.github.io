var RULE_PRESETS = {
    SEPOYS: {
        name:  "SEPOYS",
        BOARD_TYPE: "SEPOYS",
        horizontal0FortressMovementAllowed: true,
        horizontal1FortressMovementAllowed: true,
        horizontal2FortressMovementAllowed: true,
        captureMandatory: true,
        initialPosition: SEPOYS_INITIAL_POSITION
    },
    ASALTO: {
        name:  "ASALTO",
        BOARD_TYPE: "ASALTO",
        backwardFortressMovementAllowed: true,
        captureMandatory: true,
        initialPosition: ASALTO_INITIAL_POSITION
    },
    SHEEP: {
        name:  "SHEEP",
        BOARD_TYPE: "ASALTO",
        horizontalMovementAllowed: true,
        captureMandatory: true,
        initialPosition: SHEEP_INITIAL_POSITION
    },
    GEESE: {
        name:  "GEESE",
        BOARD_TYPE: "GEESE",
        freeGeeseMovementAllowed: true,
        initialPosition: GEESE_INITIAL_POSITION
    },
    RHOMBUS: {
        name:  "RHOMBUS",
        BOARD_TYPE: "RHOMBUS",
        horizontalMovementAllowed: true,
        initialPosition: RHOMBUS_INITIAL_POSITION
    },
    HARE: {
        name:  "HARE",
        BOARD_TYPE: "HARE",
        freeGeeseMovementAllowed: true,
        initialPosition: HARE_INITIAL_POSITION,
    },
};

var backwardFortressMovementAllowed = true;
var horizontal0FortressMovementAllowed = true;
var horizontal1FortressMovementAllowed = false;
var horizontal2FortressMovementAllowed = false;

var freeGeeseMovementAllowed;
var horizontalMovementAllowed;
var captureMandatory;
var GAME_BOARD_TYPE;
var globalRulePreset;

var board;
var fortress;
var bm;

var position;
var clickedState;
var foxMove;

var aiWorker;

var restartGame = function () {
    initPreset(globalRulePreset);
}

var stopGame = function() {
    if (aiWorker) {
        aiWorker.terminate();
    }
    timeouts.clearAllTimeouts();
}

var continueGame = function() {
    timeouts.clearAllTimeouts();
    initAiWorker();
    clickedState = {
       "state": "WAIT"
    }
    triggerBoardClicked();
}

var initPreset = function(rulePreset) {
    timeouts.clearAllTimeouts();
    globalRulePreset = rulePreset;
    horizontalMovementAllowed = !!rulePreset.horizontalMovementAllowed;
    freeGeeseMovementAllowed = !!rulePreset.freeGeeseMovementAllowed;
    GAME_BOARD_TYPE = rulePreset.BOARD_TYPE;

    backwardFortressMovementAllowed = !!rulePreset.backwardFortressMovementAllowed;
    horizontal0FortressMovementAllowed = !!rulePreset.horizontal0FortressMovementAllowed;
    horizontal1FortressMovementAllowed = !!rulePreset.horizontal1FortressMovementAllowed;
    horizontal2FortressMovementAllowed = !!rulePreset.horizontal2FortressMovementAllowed;

    board = createBoard();
    position = createPosition(rulePreset);
    fortress = (function() {
        var b = createBoard();
        var fort = [];
        for (var i = 0; i < b.length; i++) {
            for (var j = 0; j < b[i].length; j++) {
                if (b[i][j] === 1) {
                    fort.push({i:i, j:j});
                }
            }
        }
        if (fort.length > 0) {
            LOST_GEESE_COUNT = fort.length - 1
        } else {
            LOST_GEESE_COUNT = (GAME_BOARD_TYPE === "GEESE" || GAME_BOARD_TYPE === "ASALTO" || GAME_BOARD_TYPE === "HARE") ? 7 : 10;
        }
        return fort;
    })();
    repaintBoard(board, position);
    clickedState = {
       "state": "WAIT"
    }
    foxMove = !!rulePreset.foxMovesFirst;
    captureMandatory = !!rulePreset.captureMandatory;
    setClickedState("WAIT");
    if (rulePreset.name === "SHEEP") {
        document.getElementById("board").classList.add("sheep");
    } else {
        document.getElementById("board").classList.remove("sheep");
    }

    //To simulate move if both are computer players
    timeouts.registerTimeout(0, setTimeout(function() {
        triggerBoardClicked();
    }, 0));

    bm = new BoardMemory({
        size: 90,
        repetitionIsGeeseLoss: repetitionIsGeeseLoss
    });

    huffing.clear();
    initAiWorker();

}

var initAiWorker = function() {
    if (window.Worker) {
        if (aiWorker) {
            aiWorker.terminate();
        }
        aiWorker = new Worker("ai.js");
        aiWorker.postMessage({
            type: "INIT",
            parameters: {
                GAME_BOARD_TYPE:GAME_BOARD_TYPE,
                board:board,
                freeGeeseMovementAllowed:freeGeeseMovementAllowed,
                horizontalMovementAllowed:horizontalMovementAllowed,
                backwardFortressMovementAllowed:backwardFortressMovementAllowed,
                horizontal0FortressMovementAllowed:horizontal0FortressMovementAllowed,
                horizontal1FortressMovementAllowed:horizontal1FortressMovementAllowed,
                horizontal2FortressMovementAllowed:horizontal2FortressMovementAllowed,
                fortWinningCondition:fortWinningCondition,
                repetitionIsGeeseLoss:repetitionIsGeeseLoss,
                DEPTH: DEPTH,
                BREADTH: BREADTH,
                fortress: fortress
            }
        })
    }
}

var repetitionIsGeeseLoss = false;

var pcForFox = true;
var pcForGeese = false;

var LOST_GEESE_COUNT = 8;
var initialFoxCount = 0;

var ALL_CAPTURES_MANDATORY = true;
var DEPTH = 3;
var BREADTH = 100;

var MOVEMENT_SPEED = 500;

var developerOption = false;
if (developerOption) {
    repetitionIsGeeseLoss = true;
    pcForFox = true;
    pcForGeese = true;
    DEPTH = 3;
    BREADTH = 100;
    MOVEMENT_SPEED = 5;
}

var fortWinningCondition = FORT_WINNING_CONDITION.TRAPPED_FOX;

//TODO: add i18n and UA language

//TODO: write the rules

//TODO: winning with filling the fortress with any piece does not make much sense, because a fox can still hit the goose

var createBoard = function(elemId, gameBoardType) {
    var boardId = elemId ? elemId : "canvas";
    var bp = new BoardPainter(
        elemId ? elemId : "canvas",
        elemId ? "position-choosing-surrounding" : "board-holder",
        elemId ? "positionchoosingboard" : "board");
    var gbt = gameBoardType ? gameBoardType : GAME_BOARD_TYPE;
    if (gbt === "SEPOYS") {
        bp.drawSepoyBoard();
        return SEPOYS_BOARD;
    } else if (gbt === "GEESE") {
        bp.drawGeeseBoard(false);
        return GEESE_BOARD;
    } else if (gbt === "ASALTO") {
        bp.drawGeeseBoard(true);
        return ASALTO_BOARD;
    } else if (gbt === "RHOMBUS") {
        bp.drawRhombusBoard();
        return RHOMBUS_BOARD;
    } else {
        bp.drawHareBoard();
        return HARE_BOARD;
    }
}

var createPosition = function(rulePreset) {
    position = copyOfPosition(rulePreset.initialPosition);
    var _foxCount = 0;
    for(var i = 0; i < position.length; i++) {
        var row = position[i];
        for (var j = 0; j < row.length; j++) {
            if (position[i][j] === FOX) {
                _foxCount++;
            }
        }
    }
    /*window.*/initialFoxCount = _foxCount;
    return position;
}

var stopCapturing = function() {
    foxMove = !foxMove;
    deselectPiece(clickedState.i, clickedState.j);

    if (captureMandatory && huffing.hasHuffs()) {
        setClickedState("HUFFING");
        huffing.selectHuffs();
    } else {
        setClickedState("WAIT");
    }

    triggerBoardClicked();

}

var huffing = {
    pieces: [],
    populate: function() {
        huffing.pieces = [];
        for(var i = 0; i < position.length; i++) {
            var row = position[i];
            for (var j = 0; j < row.length; j++) {
                if (position[i][j] === FOX) {
                    if (captureAvailable(i, j)) {
                        huffing.pieces.push({i: i, j: j});
                    }
                }
            }
        }
    },
    resetTo: function(i, j) {
        huffing.pieces = [{
            i: i,
            j: j
        }];
    },
    clear: function() {
        huffing.pieces = [];
    },
    hasHuffs: function() {
        return huffing.pieces.length > 0;
    },
    selectHuffs: function() {
        for (var i = 0; i < huffing.pieces.length; i++) {
            var piece = huffing.pieces[i];
            selectHuff(piece.i, piece.j);
        }
    },
    containsHuff: function(i, j) {
        for (var c = 0; c < huffing.pieces.length; c++) {
            var piece = huffing.pieces[c];
            if (piece.i === i && piece.j === j) {
                return true;
            }
        }
        return false;
    },
    registerMove: function(from, to) {
        for (var i = 0; i < huffing.pieces.length; i++) {
            var piece = huffing.pieces[i];
            if (piece.i === from.i && piece.j === from.j) {
                piece.i = to.i;
                piece.j = to.j;
                return;
            }
        }
    }
}

var selectLastMove = function(i, j) {
    document.getElementById("pos-" + i +"-" + j).classList.add("last-moved");
}
var selectHuff = function(i, j) {
    document.getElementById("pos-" + i +"-" + j).classList.add("huff");
}
var selectPiece = function(i, j) {
    document.getElementById("pos-" + i +"-" + j).classList.add("selected");
}
var deselectPiece = function(i, j) {
    document.getElementById("pos-" + i +"-" + j).classList.remove("selected");
}

var triggerBoardClicked = function() {
    boardclicked(-1, -1);
}

var boardclicked = function(i, j) {
    if (clickedState.state == "PC" || clickedState.state === "FOXES-WON" || clickedState.state === "GEESE-WON") {
        //we should not trigger other movements
        return;
    }
    var geezeLostDueToRepetition = false;
    if (i === j && i === -1) {
        //This is a bogus click
    } else if (clickedState.state == "WAIT") {
        if ((foxMove && position[i][j] == FOX) || (!foxMove && position[i][j] == GOOSE)) {
            setClickedState("MOVE");
            clickedState.i = i;
            clickedState.j = j;
            document.getElementById("pos-" + i +"-" + j).classList.add("selected");
        }
        if (foxMove) {
            huffing.populate();
        } else {
            huffing.clear();
        }
    } else if (clickedState.state ==="CAPTURING") {
        if (position[i][j] === GOOSE) {
            if (!ALL_CAPTURES_MANDATORY) {
                foxMove = false;
                deselectPiece(clickedState.i, clickedState.j);
                setClickedState("MOVE");
                clickedState.i = i;
                clickedState.j = j;
                document.getElementById("pos-" + i +"-" + j).classList.add("selected");
            } else {
                info("Please finish your capture");
            }
        } else {
            var availableMove = moveAvailable(clickedState, i, j, foxMove, position);
            if (availableMove.type === "CAPTURE") {
                //remove goose from the intermediate position
                position[clickedState.i + (i - clickedState.i)/2][clickedState.j + (j - clickedState.j)/2] = 0;
            } else {
                //non-capturing moves are not allowed here
                return;
            }
            position[i][j] = position[clickedState.i][clickedState.j];
            position[clickedState.i][clickedState.j] = 0;
            repaintBoard(board, position);

            if (captureAvailable(i, j)) {
                setClickedState("CAPTURING");
                huffing.resetTo(i, j);
                selectPiece(i, j);
                clickedState.i = i;
                clickedState.j = j;
            } else {
                huffing.clear();
                setClickedState("WAIT");
                foxMove = !foxMove;
            }
        }
    } else if (clickedState.state === "MOVE") {
        //clicked on another goose
        if (position[i][j] == position[clickedState.i][clickedState.j]) {
            document.getElementById("pos-" + clickedState.i +"-" + clickedState.j).classList.remove("selected");
            clickedState.i = i;
            clickedState.j = j;
            document.getElementById("pos-" + i +"-" + j).classList.add("selected");
        }

        //clicked on empty available space
        var availableMove = moveAvailable(clickedState, i, j, foxMove, position);
        if (availableMove) {
            if (availableMove.type === "CAPTURE") {
                //remove goose from the intermediate position
                position[clickedState.i + (i - clickedState.i)/2][clickedState.j + (j - clickedState.j)/2] = 0;
                huffing.clear();
            } else {
                huffing.registerMove({i:clickedState.i, j:clickedState.j}, {i:i, j:j});
            }
            position[i][j] = position[clickedState.i][clickedState.j];
            position[clickedState.i][clickedState.j] = 0;
            repaintBoard(board, position);

            if (availableMove.type === "CAPTURE" && captureAvailable(i, j)) {
                setClickedState("CAPTURING");
                selectPiece(i, j);
                if (ALL_CAPTURES_MANDATORY) {
                    huffing.resetTo(i, j);
                }
                clickedState.i = i;
                clickedState.j = j;
            } else if (captureMandatory && huffing.hasHuffs()) {
                setClickedState("HUFFING");
                huffing.selectHuffs();
                foxMove = false;
            } else {
                setClickedState("WAIT");
                foxMove = !foxMove;
                geezeLostDueToRepetition = bm.execute(position);
            }
        }
    } else if (clickedState.state === "HUFFING") {
        if (huffing.containsHuff(i, j)) {
            position[i][j] = 0;
            initialFoxCount--;
            repaintBoard(board, position);
            setClickedState("WAIT");
        }
    }
    if (checkWinningCondition(geezeLostDueToRepetition && foxMove)) {
        return;
    }
    if (foxMove && pcForFox) {
        setClickedState("PC");
        info("Computer moves the fox, please wait");
        timeouts.registerTimeout(1, setTimeout(function() {
            aiFindBestMove();
        }, 0));
    } else if (!foxMove && pcForGeese) {
        setClickedState("PC");
        var movementTimeout = 0;
        info("Computer moves the goose, please wait");
        if (captureMandatory && huffing.hasHuffs()) {
            info("You've missed the huff");
            initialFoxCount--;
            movementTimeout = 4*MOVEMENT_SPEED;
            timeouts.registerTimeout(2, setTimeout(function() {
                huffing.selectHuffs();
//                repaintBoard(board, position);
            }, 0));
            timeouts.registerTimeout(3, setTimeout(function() {
                shuffle(huffing.pieces);
                var piece = huffing.pieces[0];
                position[piece.i][piece.j] = 0;
                huffing.clear();
                repaintBoard(board, position);
                if (initialFoxCount > 0) {
                    info("Computer moves the goose, please wait");
                }
            }, 2*MOVEMENT_SPEED));
        }
        timeouts.registerTimeout(4, setTimeout(function() {
            //Special case when computer move starts with huffing and it was the last fox
            if (initialFoxCount === 0) {
                setClickedState("GEESE-WON");
            } else {
                aiFindBestMove();
            }
        }, movementTimeout));
    }
}


var aiFindBestMove = function() {
    if (window.Worker) {
        var bmParams = bm.getParams();
        aiWorker.postMessage({
            type: "CALCULATE-MOVE",
            parameters: {
                position: position,
                foxMove: foxMove,
                bmQueue: bmParams.queue,
                bmMap: bmParams.map
            }
        });
        aiWorker.onmessage = function(msg) {
            executeFullMove(msg.data.move);
        };
    } else {
        var move = findBestMove(DEPTH, BREADTH);
        executeFullMove(move.move);
    }
}

/**
if any of the player wins, it returns true, otherwise - returns false
*/
var checkWinningCondition = function(geezeLostDueToRepetition) {
    if (geezeLostDueToRepetition) {
        setClickedState("FOXES-WON");
        return true;
    }
    var whoWon = getWhoWon();
    if (whoWon) {
        setClickedState(whoWon);
        return true;
    }
    return false;
}

var getWhoWon = function () {
    if (fortress.length > 0 && geeseOccupiedFortress()) {
        return "GEESE-WON";
    }
    if (tooFewGeese()) {
        return "FOXES-WON";
    }
    if (getAllPossibleMoves().length === 0) {
        if (foxMove) {
            return "GEESE-WON";
        } else {
            return "FOXES-WON";
        }
    }
    return null;
}

var executeFullMove = function(move) {
//    console.log("Executing move [" + move.type + "] from (" + move.from.i + ", " + move.from.j + ") to (" + move.to.i + ", " + move.to.j + ")");
    if (move.type === "CAPTURE") {
        position[move.from.i + (move.to.i - move.from.i)/2][move.from.j + (move.to.j - move.from.j)/2] = 0;
    }
    position[move.to.i][move.to.j] = position[move.from.i][move.from.j];
    position[move.from.i][move.from.j] = 0;
    repaintBoard(board, position);
    selectLastMove(move.to.i, move.to.j);

    var repaintFunctions = [];

    if (move.type === "CAPTURE") {
        if (move.nextCaptures && move.nextCaptures) {
            for (var nc in move.nextCaptures) {
                repaintFunctions.push(createRepaintFunction(move.nextCaptures[nc]));
            }
        }
        var lastMove = (move.nextCaptures && move.nextCaptures.length > 0) ? move.nextCaptures[move.nextCaptures.length-1].to : move.to;
        repaintFunctions.push(createContinueCapturingFunction(lastMove));
        var tm = MOVEMENT_SPEED;
        timeouts.startArrayRegistering();
        for (var f in repaintFunctions) {
            timeouts.registerArray(setTimeout(repaintFunctions[f], tm));
            tm += MOVEMENT_SPEED;
        }
    } else {
        foxMove = !foxMove;
        timeouts.registerTimeout(5, setTimeout(function() {
            finishMove(move.to.i, move.to.j);
        }, pcForGeese && pcForFox ? MOVEMENT_SPEED : 0));
    }

}

var createRepaintFunction = function(nextMove) {
    return function() {
        drawCaptureExecution(nextMove);
    }
}

var drawCaptureExecution = function(nextMove) {
    position[nextMove.from.i + (nextMove.to.i - nextMove.from.i)/2][nextMove.from.j + (nextMove.to.j - nextMove.from.j)/2] = 0;
    position[nextMove.to.i][nextMove.to.j] = position[nextMove.from.i][nextMove.from.j];
    position[nextMove.from.i][nextMove.from.j] = 0;
    repaintBoard(board, position);
    selectLastMove(nextMove.to.i, nextMove.to.j);
}

var createContinueCapturingFunction = function(lastMove) {
    return function() {
        var allCaptures = getAllCaptures(lastMove.i, lastMove.j);
        if (allCaptures.length > 0) {
            shuffle(allCaptures);
            var capture = allCaptures[0];
            var captureMove = {
                type: "CAPTURE",
                from: {i: lastMove.i, j: lastMove.j},
                to: {i: capture.i, j: capture.j}
            }
            drawCaptureExecution(captureMove);
            timeouts.registerTimeout(6, setTimeout(createContinueCapturingFunction(capture), MOVEMENT_SPEED));
        } else {
            foxMove = !foxMove;
            timeouts.registerTimeout(7, setTimeout(function() {
                finishMove(lastMove.i, lastMove.j);
            }, 0));
        }
    }
}

var finishMove = function(i, j) {
    setClickedState("WAIT");
    var geezeLost = bm.execute(position);
    checkWinningCondition(foxMove && geezeLost);
    triggerBoardClicked();
    selectLastMove(i, j);
}

var info = function(text) {
    document.getElementById("info").innerHTML = i18n.text(text);
}

var repaintBoard = function(board, position, elemId) {
    var boardId = elemId ? elemId : "board";
    var s = "";
    var width = 64;
    for (var i = 0; i < position.length; i++) {
       var row = position[i];
       for (var j = 0; j < position.length; j++) {
           var clazz = 'square';
           if (row[j] === FOX) {
              clazz = 'piece fox';
           } else if (row[j] === GOOSE) {
              clazz = 'piece goose';
           }
           var style = " style='position: absolute; top: " + width*i + "; left: " + width*j + "' "
           s = s + "<div id='pos-" + i + "-" + j + "' "+ style + " class='" + clazz + "' onclick='" +boardId + "clicked(" + i + "," + j + ")'>"  + "</div> ";
       }
    }
    document.getElementById(boardId).innerHTML = s;
}

var setClickedState = function(state) {
    var stopCaptureElem = document.getElementById("stop-capture");
    stopCaptureElem.classList.add("hidden");
    clickedState.state = state;
    if (state === "WAIT") info("Select piece");
    if (state === "MOVE") info("Select move");
    if (state === "CAPTURING") {
        info("Continue capturing");
        stopCaptureElem.classList.remove("hidden");
    }
    if (state === "HUFFING") info("Select huff");
    if (state === "GEESE-WON") info("Geese won!");
    if (state === "FOXES-WON") info("Foxes won!");
}

function getQueryVariable(variable)
{
       var query = window.location.search.substring(1);
       var vars = query.split("&");
       for (var i=0;i<vars.length;i++) {
               var pair = vars[i].split("=");
               if(pair[0] == variable){return pair[1];}
       }
       return(false);
}

var presetFromQuery = getQueryVariable("preset");

var i18n = new I18n({
    lang: getQueryVariable("lang")
})

if (presetFromQuery && RULE_PRESETS[presetFromQuery] && RULE_PRESETS[presetFromQuery].BOARD_TYPE) {
    initPreset(RULE_PRESETS[presetFromQuery]);
} else {
    initPreset(RULE_PRESETS.SEPOYS);
}


i18n.initView();

var switchLanguageElement = document.getElementById("switch-language");
var aboutElement = document.getElementById("about-link");

if (getQueryVariable("lang") === "ua") {
    switchLanguageElement.href = "index.html?lang=en" + (presetFromQuery ? ("&preset=" + presetFromQuery) : "");
    switchLanguageElement.innerHTML = "English version"
    aboutElement.href = "about-ua.html";
    aboutElement.innerHTML = "Про гру";
} else {
    switchLanguageElement.href = "index.html?lang=ua" + (presetFromQuery ? ("&preset=" + presetFromQuery) : "");
    switchLanguageElement.innerHTML = "Українська версія"
    aboutElement.href = "about-en.html";
    aboutElement.innerHTML = "About game";
}
