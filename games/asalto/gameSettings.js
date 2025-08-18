var config = {
    position: [],
    foxPieceType: true,
    selectPieceType: function(pieceType) {
        config.foxPieceType = pieceType === 'fox';
        markSelectedPieceType();
    }
};

var positionchoosingboardclicked = function(i, j) {
    if (validBoardPosition(i,j, config.board)) {
        if (config.position[i][j] === 0) {
            config.position[i][j] = config.foxPieceType ? FOX : GOOSE;
        } else {
            config.position[i][j] = 0;
        }
        repaintBoard(config.board, config.position, "positionchoosingboard");
    }
}

var changePreset = function(presetName) {
    showConfig(RULE_PRESETS[presetName.toUpperCase()]);
}

var showConfig = function(rulePreset) {

    document.getElementById("game").classList.add("hidden");
    document.getElementById("position-choosing").classList.remove("hidden");

    config.position = copyOfPosition(rulePreset.initialPosition);

    document.getElementById("freeGeeseMovementAllowed").checked = !!rulePreset.freeGeeseMovementAllowed;
    document.getElementById("horizontalMovementAllowed").checked = !!rulePreset.horizontalMovementAllowed;
    document.getElementById("backwardFortressMovementAllowed").checked = !!rulePreset.backwardFortressMovementAllowed;
    document.getElementById("horizontal0FortressMovementAllowed").checked = !!rulePreset.horizontal0FortressMovementAllowed;
    document.getElementById("horizontal1FortressMovementAllowed").checked = !!rulePreset.horizontal1FortressMovementAllowed;
    document.getElementById("horizontal2FortressMovementAllowed").checked = !!rulePreset.horizontal2FortressMovementAllowed;
    document.getElementById("captureMandatory").checked = !!rulePreset.captureMandatory;
    document.getElementById("foxMovesFirst").checked = !!rulePreset.foxMovesFirst;

    document.getElementById("pcForFox").checked = !!pcForFox;
    document.getElementById("pcForGeese").checked = !!pcForGeese;
    document.getElementById("repetitionIsGeeseLoss").checked = !!repetitionIsGeeseLoss;
    document.getElementById("ai-depth").value = DEPTH;
    document.getElementById("ai-breadth").value = BREADTH;
    document.getElementById("movement-speed").value = MOVEMENT_SPEED;

    document.getElementById("preset-" + rulePreset.name.toLowerCase()).checked = true;
    //This won't change
    config.GAME_BOARD_TYPE = rulePreset.BOARD_TYPE;

    switch (fortWinningCondition) {
        case 1: document.getElementById("winning-fortress-geese").checked = true;
        break;
        case 2: document.getElementById("winning-fortress-trapped").checked = true;
        break;
        case 3: document.getElementById("winning-fortress-both").checked = true;
        break;
    }

    //This might change
    config.rulePreset = rulePreset;

    config.board = createBoard("position-choosing-canvas", rulePreset.BOARD_TYPE);
    repaintBoard(config.board, config.position, "positionchoosingboard");
    if (rulePreset.name === "SHEEP") {
        document.getElementById("positionchoosingboard").classList.add("sheep");
    } else {
        document.getElementById("positionchoosingboard").classList.remove("sheep");
    }

    markSelectedPieceType();
}

var markSelectedPieceType = function () {
    if (config.foxPieceType) {
        document.getElementById("select-piece-fox").classList.add("selected");
        document.getElementById("select-piece-goose").classList.remove("selected");
    } else {
        document.getElementById("select-piece-goose").classList.add("selected");
        document.getElementById("select-piece-fox").classList.remove("selected");
    }
}

var saveConfig = function() {
    // - probably we should do this...
    rulePreset = config.rulePreset;

    rulePreset.initialPosition = copyOfPosition(config.position);

    rulePreset.freeGeeseMovementAllowed = document.getElementById("freeGeeseMovementAllowed").checked;
    rulePreset.horizontalMovementAllowed = document.getElementById("horizontalMovementAllowed").checked;
    rulePreset.backwardFortressMovementAllowed = document.getElementById("backwardFortressMovementAllowed").checked;
    rulePreset.horizontal0FortressMovementAllowed = document.getElementById("horizontal0FortressMovementAllowed").checked;
    rulePreset.horizontal1FortressMovementAllowed = document.getElementById("horizontal1FortressMovementAllowed").checked;
    rulePreset.horizontal2FortressMovementAllowed = document.getElementById("horizontal2FortressMovementAllowed").checked;
    rulePreset.captureMandatory = document.getElementById("captureMandatory").checked;
    rulePreset.foxMovesFirst = document.getElementById("foxMovesFirst").checked;

    pcForFox = document.getElementById("pcForFox").checked;
    pcForGeese = document.getElementById("pcForGeese").checked;
    repetitionIsGeeseLoss = document.getElementById("repetitionIsGeeseLoss").checked;

    DEPTH = parseInt(document.getElementById("ai-depth").value);
    BREADTH = parseInt(document.getElementById("ai-breadth").value);
    MOVEMENT_SPEED = parseInt(document.getElementById("movement-speed").value);

    //Fort Winning Condition:
    if (document.getElementById("winning-fortress-geese").checked) {
        fortWinningCondition = 1;
    } else if (document.getElementById("winning-fortress-both").checked) {
        fortWinningCondition = 3;
    } else {
        fortWinningCondition = 2;
    }

    hideConfig();
    initPreset(rulePreset);
    boardclicked(0, 0);
}

var hideConfig = function() {
    document.getElementById("game").classList.remove("hidden");
    document.getElementById("position-choosing").classList.add("hidden");
}