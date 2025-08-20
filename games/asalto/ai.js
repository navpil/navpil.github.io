importScripts("functions.js", "boardMemory.js");

var GAME_BOARD_TYPE;
var board;
var freeGeeseMovementAllowed;
var horizontalMovementAllowed;
var backwardFortressMovementAllowed;
var horizontal0FortressMovementAllowed;
var horizontal1FortressMovementAllowed;
var horizontal2FortressMovementAllowed;
var fortWinningCondition;
var repetitionIsGeeseLoss;
var DEPTH;
var BREADTH;
var fortress;

var position;
var foxMove
var bm;

onmessage = function(msg) {
    var data = msg.data;
    if (data.type === "INIT") {
        var v = data.parameters;
        GAME_BOARD_TYPE = v.GAME_BOARD_TYPE;
        board = v.board;
        freeGeeseMovementAllowed = v.freeGeeseMovementAllowed;
        horizontalMovementAllowed = v.horizontalMovementAllowed;
        backwardFortressMovementAllowed = v.backwardFortressMovementAllowed;
        horizontal0FortressMovementAllowed = v.horizontal0FortressMovementAllowed;
        horizontal1FortressMovementAllowed = v.horizontal1FortressMovementAllowed;
        horizontal2FortressMovementAllowed = v.horizontal2FortressMovementAllowed;
        fortWinningCondition = v.fortWinningCondition;
        repetitionIsGeeseLoss = v.repetitionIsGeeseLoss;
        DEPTH = v.DEPTH;
        BREADTH = v.BREADTH;
        fortress = v.fortress;
    } else if (data.type === "CALCULATE-MOVE") {
        var v = data.parameters;
        position = v.position;
        foxMove = v.foxMove;
        bm = new BoardMemory({
            repetitionIsGeeseLoss: repetitionIsGeeseLoss
        });
        bm.initWithParams({
            queue: v.bmQueue,
            map: v.bmMap
        });

        postMessage(findBestMove(DEPTH, BREADTH));
    }

}