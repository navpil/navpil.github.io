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

var restartGame = function () {
    initPreset(globalRulePreset);
}

var continueGame = function() {
    timeouts.clearAllTimeouts();
    clickedState = {
       "state": "WAIT"
    }
    boardclicked(0,0);
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
            LOST_GEESE_COUNT = (GAME_BOARD_TYPE === "GEESE" || GAME_BOARD_TYPE === "ASALTO") ? 7 : 10;
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
        boardclicked(0, 0);
    }, 0));

    bm = new BoardMemory({
        size: 90,
        repetitionIsGeeseLoss: repetitionIsGeeseLoss
    });
}

var repetitionIsGeeseLoss = false;

var pcForFox = true;
var pcForGeese = false;

var LOST_GEESE_COUNT = 8;
var initialFoxCount = 0;

var ALL_CAPTURES_MANDATORY = true;
var DEPTH = 4;
var BREADTH = 50;

var MOVEMENT_SPEED = 500;

//0 - geese filled the fort, 1 - trapped fox and geese filled the fort, 2 - fort is filled
var FORT_WINNING_CONDITION = {
   GEESE_FILLED: 1,
   TRAPPED_FOX: 2,
   FORT_FILLED: 3
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
    } else {
        bp.drawRhombusBoard();
        return RHOMBUS_BOARD;
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

var copyOfPosition = function(initialPosition) {
    var copyOfPos = [];
    for(var i = 0; i < initialPosition.length; i++) {
        var row = initialPosition[i];
        var copyOfRow = [];
        for (var j = 0; j < row.length; j++) {
            copyOfRow.push(row[j]);
        }
        copyOfPos.push(copyOfRow);
    }
    return copyOfPos;
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


var strong = function(i, j) {
    return GAME_BOARD_TYPE === "RHOMBUS" ? (i + j) % 2 === 1 : (i + j) % 2 == 0;
}

var validBoardPosition = function(i, j, b) {
    brd = b ? b : board;
    return i >= 0 && i < brd.length && j >= 0 && j < brd.length && brd[i][j] != 0;
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

var captureAvailable = function (i, j) {
    var isWeak = !strong(i, j);
    for (var ii = -1; ii <= 1; ii+=1) {
        for (var jj = -1; jj <= 1; jj+=1) {
            if (isWeak) {
                //diagonal captures are not possible on weak intersections
                if (!(ii === 0 || jj === 0)) {
                    continue;
                }
            }
            if (validBoardPosition(i + (ii*2), j + (jj*2))) {
                if (position[i + ii][j + jj] === GOOSE && position[i + ii*2][j + jj*2] === 0) {
                    return true;
                }
            }
        }
    }
}

var howManyMovesAvailable = function(i, j, isFox, position) {
    return getAllOrdinaryMoves(i, j, isFox, position).length + (isFox ? getAllCaptures(i, j).length : 0);
}

var getAllOrdinaryMoves = function(i, j, isFox, position) {
    var isWeak = !strong(i, j);
    var moves = [];
    for (var ii = -1; ii <= 1; ii+=1) {
        for (var jj = -1; jj <= 1; jj+=1) {
            var move = moveAvailable({i: i, j: j}, i + ii, j + jj, isFox, position);
            if (move) {
                moves.push({
                    i:(i + ii),
                    j:(j + jj)
                });
            }
        }
    }
    return moves;
}

var getAllCaptures = function (i, j) {
    var isWeak = !strong(i, j);
    var captures = [];
    for (var ii = -1; ii <= 1; ii+=1) {
        for (var jj = -1; jj <= 1; jj+=1) {
            if (isWeak) {
                //diagonal captures are not possible on weak intersections
                if (!(ii === 0 || jj === 0)) {
                    continue;
                }
            }
            if (validBoardPosition(i + (ii*2), j + (jj*2))) {
                if (position[i + ii][j + jj] === GOOSE && position[i + ii*2][j + jj*2] === 0) {
                    captures.push({
                        i:(i + ii*2),
                        j:(j + jj*2)
                    });
                }
            }
        }
    }
    return captures;
}

var moveAvailable = function(state, i, j, foxMove, position) {
    if (i < 0 || i >= board.length || j < 0 || j >= board[0].length) {
        return false;
    }
    if (board[i][j] === 0) {
        return false;
    }
    if (position[i][j] !== 0 ) {
        return false;
    }
    var iDiff = Math.abs(state.i - i);
    var jDiff = Math.abs(state.j - j);

    if (foxMove) {
        //check for capture:
        if (strong(state.i, state.j)) {
            //strong intersection
            var captureMove = iDiff <= 2 && iDiff%2 == 0 && jDiff <= 2 && jDiff%2 == 0 && (position[state.i + (i - state.i)/2][state.j + (j - state.j)/2] == GOOSE);
            if (captureMove) {
                return {
                    "type": "CAPTURE",
                    "from": [state.i, state.j],
                    "to": [i, j]
                };
            }
        } else {
            //weak intersection
            var captureMove = iDiff <= 2 && iDiff%2 == 0 && jDiff <= 2 && jDiff%2 == 0 && (iDiff + jDiff == 2) && (position[state.i + (i - state.i)/2][state.j + (j - state.j)/2] == GOOSE);
            if (captureMove) {
                return {
                    "type": "CAPTURE",
                    "from": [state.i, state.j],
                    "to": [i, j]
                };
            }
        }

    } else {
        if (freeGeeseMovementAllowed) {
            //No need to check for any other restrictions - be it fortress or not
        } else if (horizontalMovementAllowed) {
            // forbid only backward movement - trumps all other checks
            if (i > state.i) {
                return false;
            }
        } else if (state.i == 2 && (state.j < 2 || state.j > (board.length - 3))) {
            //free/horizontal movement not allowed, but we are at the upper parts of left/right arms
            if (state.j < 2) {
                if ((j - state.j) === 1 && iDiff === 0) {
                    //move only right is allowed
                } else {
                    return false;
                }
            }
            if (state.j > (board.length - 3)) {
                //move only left
                if (j - state.j === -1 && iDiff === 0) {
                    //move only left is allowed
                } else {
                    return false;
                }
            }
        } else if (board[state.i][state.j] == 1 && board[i][j] == 1) {
            //We are moving inside fortress, special rules apply
            if (i < state.i) {
                //Forward move always allowed
            } else if (i > state.i) {
                if (!backwardFortressMovementAllowed) {
                    //backward movement, which is not allowed
                    return false;
                }
            } else if (i === 0) {
                if (!horizontal0FortressMovementAllowed) {
                    return false;
                }
            } else if (i === 1) {
                if (!horizontal1FortressMovementAllowed) {
                    return false;
                }
            } else if (i === 2) {
                if (!horizontal2FortressMovementAllowed) {
                    return false;
                }
            }
        } else if (i >= state.i) {
            //this is not a forward move, so it should be forbidden
            return false;
        }

    }

    //special case for corners in sepoys board
    if (GAME_BOARD_TYPE === "SEPOYS" && (
        (state.i == 0 && state.j == 1 && i == 1 && j == 2)
        || (state.i == 1 && state.j == 2 && i == 0 && j == 1)
        || (state.i == 0 && state.j == 7 && i == 1 && j == 6)
        || (state.i == 1 && state.j == 6 && i == 0 && j == 7)
    )) {
        return {
            "type": "MOVE",
            "from": [state.i, state.j],
            "to": [i, j]
        };
    }

    // simple move
    if (strong(state.i, state.j)) {
        //strong intersection
        if (iDiff < 2 && jDiff < 2) {
            return {
                "type": "MOVE",
                "from": [state.i, state.j],
                "to": [i, j]
            };
        }
    } else {
        //weak intersection
        if (iDiff < 2 && jDiff < 2 && (iDiff + jDiff) < 2) {
            return {
                "type": "MOVE",
                "from": [state.i, state.j],
                "to": [i, j]
            };
        }
    }
    return null;
}

var boardclicked = function(i, j) {
    if (clickedState.state == "PC" || clickedState.state === "FOXES-WON" || clickedState.state === "GEESE-WON") {
        //we should not trigger other movements
        return;
    }
    var geezeLostDueToRepetition = false;
    if (clickedState.state == "WAIT") {
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
                selectPiece(i, j);
                clickedState.i = i;
                clickedState.j = j;
            } else {
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
            var move = findBestMove(DEPTH, BREADTH);
            executeFullMove(move.move);
        }, 0));
    } else if (!foxMove && pcForGeese) {
        setClickedState("PC");
        var movementTimeout = 0;
        info("Computer moves the goose, please wait");
        if (captureMandatory && huffing.hasHuffs()) {
            info("You've missed the huff");
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
                info("Computer moves the goose, please wait");
            }, 2*MOVEMENT_SPEED));
        }
        timeouts.registerTimeout(4, setTimeout(function() {
            var move = findBestMove(DEPTH, BREADTH);
            executeFullMove(move.move);
        }, movementTimeout));
    }
}

var geeseOccupiedFortress = function() {
    if (fortWinningCondition === FORT_WINNING_CONDITION.GEESE_FILLED) {
        for (var i in fortress) {
            var fplace = fortress[i];
            //Only geese should occupy the fort for winning
            if (position[fplace.i][fplace.j] !== GOOSE) {
                return false;
            }
        }
        return true;
    }
    if (fortWinningCondition === FORT_WINNING_CONDITION.TRAPPED_FOX) {
        for (var i in fortress) {
            var fplace = fortress[i];
            //If empty - it's not a win
            if (position[fplace.i][fplace.j] === 0) {
                return false;
            }
            //A fox in a fortress must be trapped
            if (position[fplace.i][fplace.j] === FOX && howManyMovesAvailable(fplace.i, fplace.j, true, position) > 0) {
                return false;
            }
        }
        return true;
    }
    if (fortWinningCondition === FORT_WINNING_CONDITION.FORT_FILLED) {
        for (var i in fortress) {
            var fplace = fortress[i];
            //Only empty spaces in Fort prevent from winning
            if (position[fplace.i][fplace.j] === 0) {
                return false;
            }
        }
        return true;
    }


}

var tooFewGeese = function() {
    var geeseCount = 0;
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[i].length; j++) {
            if (position[i][j] === GOOSE) {
                geeseCount++;
                if (geeseCount > LOST_GEESE_COUNT) {
                    return false;
                }
            }
        }
    }
    return true;
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


//TODO: if fox/geese win - -10000/10000 should be returned
var calculateBoardPrice = function() {
//TODO: This whoWon calculation is pretty expensive. Maybe need to optimize;
//    var whoWon = getWhoWon();
//    if (whoWon === "GEESE-WON") {
//        return 10000;
//    }
//    if (whoWon === "FOXES-WON") {
//        return -10000;
//    }
    var price = 0.0;
    var goosePrice = 100.0;
    var foxPrice = 10.0;
    //Used in calculating if fox is trapped
    var foxPosition;
    var hasFortress = fortress.length > 0;
    if (hasFortress && geeseOccupiedFortress()) {
        //Geese won
        return 10000;
    }
    for(var i = 0; i < position.length; i++) {
        var row = position[i];
        for (var j = 0; j < row.length; j++) {
            if (position[i][j] === GOOSE) {
                price = price + goosePrice;
            } else if (position[i][j] === FOX) {
                var captures = getAllCaptures(i, j);
                price = price - foxPrice - captures.length;
                foxPosition = {i:i, j:j};
            }
        }
        if (hasFortress) {
            goosePrice = goosePrice - 8;
        }
        if (i === 2) {
//            goosePrice = goosePrice - 30;
        }
        if (i > 2 && hasFortress) {
            //foxes should try staying inside the fortress, but not necessarily in the last row
            foxPrice = foxPrice - 1.0;
        }
    }
    if (initialFoxCount === 1) {
        price = price + 10*(50 - foxTerritoryCount(foxPosition));
    }

    return price;
}

var foxTerritoryCount = function(foxPosition) {
    var count = recursiveTerritoryCount(foxPosition.i, foxPosition.j);
    for(var i = 0; i < position.length; i++) {
        var row = position[i];
        for (var j = 0; j < row.length; j++) {
            if (position[i][j] === 7) {
                position[i][j] = 0;
            }
        }
    }
    return count;
}

var recursiveTerritoryCount = function(i, j) {
    var isWeak = !strong(i, j);
    var moves = [];
    var count = 0;
    for (var ii = -1; ii <= 1; ii+=1) {
        for (var jj = -1; jj <= 1; jj+=1) {
            if (isWeak) {
                //diagonal movements are not possible on weak intersections
                if (!(ii === 0 || jj === 0)) {
                    continue;
                }
            }
            if (validBoardPosition(i + ii, j + jj) && position[i + ii][j + jj] === 0) {
                position[i + ii][j + jj] = 7;
                count++;
                count = count + recursiveTerritoryCount(i+ii, j+jj);
            }
        }
    }
    return count;
}

/*returns
{
    move: {
        type: "CAPTURING",
        from: {i:i, j:j},
        to: {i:i, j:j}
    },
    price: price;
}
*/
var findBestMove = function(depth, cutoff) {
    var moves = getAllPossibleMoves();
    //Lowest better for foxes, higher better for geese
    var bestPrice = foxMove ? 1000000 : -1000000;
    var bestMove;
    for (var mi in moves) {
        if (mi == cutoff) break;
        var move = moves[mi]
        if (!bestMove) {
            //In some cases "bestPrice" returned from the calculation is max/min value and
            // the bestMove is not chosen. This is to prevent this from happening
            bestMove = move;
        }

        var geezeLost = execute(move);
        var currentPrice;

        if (!foxMove && geezeLost) {
            currentPrice = -10000;
        } else if (move.type === "CAPTURE") {
            var nextCaptures = continueCapture(depth-1, cutoff, move.to.i, move.to.j);
            move.nextCaptures = nextCaptures.nextCaptures;
            currentPrice = nextCaptures.price;
        } else {
            var maybeWon = calculateBoardPrice();
            if (!foxMove && maybeWon === 10000) {
                bestPrice = currentPrice;
                bestMove = move;
                undo(move);
                break;

            }
            if (foxMove) {
                if (depth <= 0)  {
                    //calculate move weight
                    currentPrice = calculateBoardPrice();
                } else {
                    //recursion
                    foxMove = !foxMove;
                    currentPrice = findBestMove(depth - 1,  cutoff).price;
                    foxMove = !foxMove;
                }
            } else {
                currentPrice = calculateBoardPrice();
                if (currentPrice === 10000) {
                    bestPrice = currentPrice;
                    bestMove = move;
                    undo(move);
                    break;
                }
                if (depth <= 0)  {
                    //do nothing
//                    currentPrice = calculateBoardPrice();
                } else {
                    //recursion
                    foxMove = !foxMove;
                    currentPrice = findBestMove(depth - 1,  cutoff).price;
                    foxMove = !foxMove;
                }


            }

        }

        if (foxMove) {
            if (currentPrice < bestPrice) {
                bestPrice = currentPrice;
                bestMove = move;
            }
        } else {
            if (currentPrice > bestPrice) {
                bestPrice = currentPrice;
                bestMove = move;
            }
        }

        undo(move);
    }
    return {
        move: bestMove,
        price: bestPrice
    }
}

var continueCapture = function(depth,  cutoff, i, j) {
    if (depth === 0) {
        return {
            nextCaptures: [],
            price: calculateBoardPrice()
        }
    }
    var captures = getAllCaptures(i, j);
    if (captures.length === 0) {
        //here if depth is small, can simply calculate price and return empty array for nextCaptures - anyway the only place it can be used is a "continueCapture" call in findBestMove
        foxMove = !foxMove;
        //Not decrementing depth, because no captures are done here
        var bmove = findBestMove(depth/* - 1*/,  cutoff);
        foxMove = !foxMove;
        return bmove;
    }

    var bestPrice = 1000000;
    var bestMove;

    for (var ci in captures) {
        if (ci == cutoff) break;
        var capture = captures[ci];
        var captureMove = {
            type: "CAPTURE",
            from: {i: i, j: j},
            to: {i: capture.i, j: capture.j}
        };
        execute(captureMove);

        var nextCaptures = continueCapture(depth-1,  cutoff, capture.i, capture.j);
        var currentPrice = nextCaptures.price;

        var allNextCaptures = [];
        allNextCaptures.push(captureMove);
        if (nextCaptures.nextCaptures) {
            for(var nc in nextCaptures.nextCaptures) {
                allNextCaptures.push(nextCaptures.nextCaptures[nc]);
            }
        }

        if (currentPrice < bestPrice) {
            bestPrice = currentPrice;
            bestMove = captureMove;
        }

        undo(captureMove);

    }

    return {
        move: captureMove,
        price: bestPrice,
        nextCaptures: allNextCaptures
    }
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
        }, MOVEMENT_SPEED));
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
    boardclicked(0, 0);
    selectLastMove(i, j);
}


var execute = function(move) {
    if (move.type === "CAPTURE") {
        position[move.from.i + (move.to.i - move.from.i)/2][move.from.j + (move.to.j - move.from.j)/2] = 0;
    }
    position[move.to.i][move.to.j] = position[move.from.i][move.from.j];
    position[move.from.i][move.from.j] = 0;
    return bm.tempExecute(position);
}

var undo = function(move) {
    if (move.type === "CAPTURE") {
        position[move.from.i + (move.to.i - move.from.i)/2][move.from.j + (move.to.j - move.from.j)/2] = GOOSE;
    }
    position[move.from.i][move.from.j] = position[move.to.i][move.to.j];
    position[move.to.i][move.to.j] = 0;
    bm.tempUndo();
}

var FOX = 8;
var GOOSE = 5;

var getAllPossibleMoves = function() {
    if (foxMove) {
        //first collect the foxes
        var foxes = [];
        for(var i = 0; i < position.length; i++) {
            var row = position[i];
            for (var j = 0; j < row.length; j++) {
                if (position[i][j] === FOX) {
                    foxes.push({i:i, j:j});
                }
            }
        }
        //collect capturing moves
        var captureMoves = [];
        for (var fc in foxes) {
            var fox = foxes[fc];
            var captures = getAllCaptures(fox.i, fox.j);
            for (var ci in captures) {
                var capture = captures[ci];
                captureMoves.push({
                    type: "CAPTURE",
                    from: {i: fox.i, j: fox.j},
                    to: {i: capture.i, j: capture.j}
                })
            }
        }
        shuffle(captureMoves);
        if (captureMoves.length > 0) {
            return captureMoves;
        }

        var ordinaryMoves = [];
        //collect ordinary moves
        for (var fc in foxes) {
            var fox = foxes[fc];
            var moves = getAllOrdinaryMoves(fox.i, fox.j, foxMove, position);
            for (var ci in moves) {
                var move = moves[ci];
                ordinaryMoves.push({
                    type: "MOVE",
                    from: {i: fox.i, j: fox.j},
                    to: {i: move.i, j: move.j}
                })
            }
        }
        shuffle(ordinaryMoves);
        return ordinaryMoves;
    } else {
        var geese = [];
        for(var i = 0; i < position.length; i++) {
            var row = position[i];
            for (var j = 0; j < row.length; j++) {
                if (position[i][j] === GOOSE) {
                    geese.push({i:i, j:j});
                }
            }
        }

        var ordinaryMoves = [];
        //collect ordinary moves
        for (var gc in geese) {
            var goose = geese[gc];
            var moves = getAllOrdinaryMoves(goose.i, goose.j, foxMove, position);
            for (var ci in moves) {
                var move = moves[ci];
                ordinaryMoves.push({
                    type: "MOVE",
                    from: {i: goose.i, j: goose.j},
                    to: {i: move.i, j: move.j}
                })
            }
        }
        shuffle(ordinaryMoves);
        return ordinaryMoves;

    }
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

//Is it used anywhere?
var lastMove;


var setClickedState = function(state) {
    clickedState.state = state;
    if (state === "WAIT") info("Select piece");
    if (state === "MOVE") info("Select move");
    if (state === "CAPTURING") info("Continue capturing");
    if (state === "HUFFING") info("Select huff");
    if (state === "GEESE-WON") info("Geese won!");
    if (state === "FOXES-WON") info("Foxes won!");
}

function shuffle(array) {
  let currentIndex = array.length;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {

    // Pick a remaining element...
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
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
