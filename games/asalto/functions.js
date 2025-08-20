//Assumes the following global variables: position, foxMove, bm (BoardMemory)

//initializedwith:
//GAME_BOARD_TYPE, board
//freeGeeseMovementAllowed, horizontalMovementAllowed, backwardFortressMovementAllowed
//horizontal0FortressMovementAllowed, horizontal1FortressMovementAllowed, horizontal2FortressMovementAllowed,
//fortWinningCondition,

//0 - geese filled the fort, 1 - trapped fox and geese filled the fort, 2 - fort is filled
var FORT_WINNING_CONDITION = {
   GEESE_FILLED: 1,
   TRAPPED_FOX: 2,
   FORT_FILLED: 3
}

var GOOSE = 5;
var FOX = 8;

var strong = function(i, j) {
    return GAME_BOARD_TYPE === "RHOMBUS" ? (i + j) % 2 === 1 : (i + j) % 2 == 0;
}

var validBoardPosition = function(i, j, b) {
    brd = b ? b : board;
    return i >= 0 && i < brd.length && j >= 0 && j < brd.length && brd[i][j] != 0;
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
            if (position[fplace.i][fplace.j] === FOX && !isFoxReallyTrapped(fplace.i, fplace.j, position)) {
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

var isFoxReallyTrapped = function(fi, fj, position) {

    var recursiveHasFreedom = function(i, j) {
        var isWeak = !strong(i, j);
        for (var ii = -1; ii <= 1; ii+=1) {
            for (var jj = -1; jj <= 1; jj+=1) {
                if (isWeak) {
                    //diagonal movements are not possible on weak intersections
                    if (!(ii === 0 || jj === 0)) {
                        continue;
                    }
                }
                if (validBoardPosition(i + ii, j + jj)) {
                    if (position[i + ii][j + jj] === 0) {
                        return true;
                    }
                    if (position[i + ii][j + jj] === FOX) {
                        position[i + ii][j + jj] = 6;
                        if (howManyMovesAvailable(i + ii, j + jj, true, position) > 0 || recursiveHasFreedom(i+ii, j+jj)) {
                            return true;
                        }
                    }
                }
            }
        }
        return false;
    }

    var hasFreedom = howManyMovesAvailable(fi, fj, true, position) > 0 || recursiveHasFreedom(fi, fj);

    for(var i = 0; i < position.length; i++) {
        var row = position[i];
        for (var j = 0; j < row.length; j++) {
            if (position[i][j] === 6) {
                position[i][j] = 8;
            }
        }
    }

    return !hasFreedom;

}

//----------- AI:

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
    var foxPositions = [];
    var hasFortress = fortress.length > 0;
    if (hasFortress && geeseOccupiedFortress()) {
        //Geese won
        return 10000;
    }
    for(var i = 0; i < position.length; i++) {
        var row = position[i];
        for (var j = 0; j < row.length; j++) {
            if (position[i][j] === GOOSE) {
                //Adding more value for geese inside fortress on the front line - this is hardcoded, because all fortresses are three lines deep
                price = price + goosePrice + ((i===2 && board[i][j] === 1) ? 2 : 0);
            } else if (position[i][j] === FOX) {
                var captures = getAllCaptures(i, j);
                price = price - foxPrice - captures.length;
                foxPositions.push({i:i, j:j, captures: captures.length});
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
    if (!hasFortress) {
        for (var foxPositionI in foxPositions) {
            //Geese should surround foxes, so we substract territory, but we should account for capture length
            var captureLength = foxPositions[foxPositionI].captures;
            price = price - /*(captureLength+1)**/2*foxTerritoryCount(foxPositions[foxPositionI]);
        }
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
                currentPrice = maybeWon;
                bestPrice = maybeWon;
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

// Utility functions

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

