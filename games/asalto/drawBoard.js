function BoardPainter(canvasElem, surroundingElem, piecesElem) {

    var canvas = document.getElementById(canvasElem ? canvasElem : "canvas");
    var surrounding = document.getElementById(surroundingElem ? surroundingElem : "board-holder")
    var pieces = document.getElementById(piecesElem ? piecesElem : "board")

    var WIDTH = 128
    var startI = 32;
    var startJ = 32;

    var drawAlqerq = function(i, j, ctx) {
        ctx.lineWidth = 1;
        ctx.moveTo(i, j);
        ctx.lineTo(i, j + WIDTH);
        ctx.lineTo(i + WIDTH, j + WIDTH);
        ctx.lineTo(i + WIDTH, j);
        ctx.closePath();
        ctx.stroke();
        ctx.moveTo(i, j);
        ctx.lineTo(i + WIDTH, j + WIDTH);
        ctx.stroke();
        ctx.moveTo(i + WIDTH, j);
        ctx.lineTo(i, j + WIDTH);
        ctx.stroke();
        ctx.lineWidth = 1;
        ctx.moveTo(i + WIDTH/2, j);
        ctx.lineTo(i + WIDTH/2, j + WIDTH);
        ctx.stroke();
        ctx.moveTo(i, j + WIDTH/2);
        ctx.lineTo(i+WIDTH, j + WIDTH/2);
        ctx.stroke();
    }

    this.drawGeeseBoard = function(drawFortress, elemId) {
        var totalWidth = WIDTH * 3 + startI * 2
        var totalHeight = WIDTH * 3 + startJ * 2
        canvas.width = totalWidth;
        canvas.height = totalHeight;

        setWidthAndHeightForSurroundingArea(totalWidth, totalHeight);

        const ctx = canvas.getContext("2d");

        ctx.fillStyle = "rgb(255 255 0 / 30%)";
        ctx.fillRect(0, 0, totalWidth, totalHeight);

        if (drawFortress) {
            ctx.beginPath();

            ctx.lineWidth = 4;
            ctx.strokeStyle = "rgb(128 84 0)";
            ctx.moveTo(startI + WIDTH*4/5, startJ - WIDTH*1/5);
            ctx.lineTo(startI + 2*WIDTH + WIDTH*1/5, startJ - WIDTH*1/5);
            ctx.lineTo(startI + 2*WIDTH + WIDTH*1/5, startJ + WIDTH + WIDTH*1/5);
            ctx.lineTo(startI + WIDTH*4/5, startJ + WIDTH + WIDTH*1/5);
            ctx.lineTo(startI + WIDTH*4/5, startJ - WIDTH*1/5);

            ctx.stroke();
        }

        ctx.lineWidth = 2;
        ctx.strokeStyle = "rgb(128 84 0)";

        drawAlqerq(startI, startJ+WIDTH, ctx)
        drawAlqerq(startI+WIDTH, startJ+WIDTH, ctx)
        drawAlqerq(startI+(WIDTH*2), startJ+WIDTH, ctx)
        drawAlqerq(startI+WIDTH, startJ, ctx)
        drawAlqerq(startI+WIDTH, startJ+WIDTH*2, ctx)
    }

    this.drawSepoyBoard = function(elemId) {
        var totalWidth = WIDTH * 4 + startI * 2
        var totalHeight = WIDTH * 4 + startJ * 2
        canvas.width = totalWidth;
        canvas.height = totalHeight;

        setWidthAndHeightForSurroundingArea(totalWidth, totalHeight);

        var ctx = canvas.getContext("2d");

        ctx.fillStyle = "rgb(0 0 255 / 5%)";
        ctx.fillRect(0, 0, totalWidth, totalHeight);

        ctx.beginPath();
        //draw fortress
        ctx.lineWidth = 4;
        ctx.fillStyle = "rgb(0 0 165 / 50%)";
        ctx.strokeStyle = "rgb(0 0 164 / 50%)";

        ctx.moveTo(startI + WIDTH * 4, startJ - WIDTH/5);
        ctx.lineTo(startI, startJ - WIDTH/5);
        ctx.lineTo(startI + WIDTH * 4 / 5,  startJ + WIDTH - WIDTH*2/5);
        ctx.lineTo(startI + WIDTH * 4 / 5, startJ + WIDTH + WIDTH/5);
        ctx.lineTo(startI + WIDTH * 3 + WIDTH* 1 / 5, startJ + WIDTH + WIDTH/5);
        ctx.lineTo(startI + WIDTH * 3 + WIDTH* 1 / 5, startJ + WIDTH - WIDTH*2/5);
        ctx.lineTo(startI + WIDTH * 4, startJ - WIDTH/5)
        ctx.stroke();

        //fortress end
        ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.strokeStyle = "rgb(0 0  164)";

        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 4; j++) {
                if (i == 0 && j == 0 || i == 0 && j == 3 || i == 3 && j == 0 || i == 3 && j == 3) {
                    continue;
                }
                drawAlqerq(startI + (WIDTH * i), startJ + (WIDTH * j), ctx);
            }
        }
        ctx.lineWidth = 2;
        ctx.moveTo(startI + WIDTH, startJ);
        ctx.lineTo(startI + WIDTH / 2, startJ);
        ctx.lineTo(startI + WIDTH, startJ + WIDTH / 2);
        ctx.moveTo(startI + 3*WIDTH, startJ);
        ctx.lineTo(startI + 3*WIDTH + WIDTH / 2, startJ);
        ctx.lineTo(startI + 3*WIDTH, startJ + WIDTH / 2);
        ctx.stroke();

    }
    this.drawRhombusBoard = function(elemId) {
        var totalWidth = WIDTH * 4 + startI * 2
        var totalHeight = WIDTH * 4 + startJ * 2
        canvas.width = totalWidth;
        canvas.height = totalHeight;

        setWidthAndHeightForSurroundingArea(totalWidth, totalHeight);

        var ctx = canvas.getContext("2d");

        ctx.fillStyle = "rgb(0 0 255 / 5%)";
        ctx.fillRect(0, 0, totalWidth, totalHeight);

        ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.strokeStyle = "rgb(0 0  164)";

        for (var i = 0; i < 4; i++) {
            drawAlqerq(startI + WIDTH * 3/2, startJ + (WIDTH * i), ctx);
            drawAlqerq(startI + WIDTH * i, startJ + (WIDTH * 3/2),ctx);
        }

        ctx.lineWidth = 2;
        ctx.moveTo(startI + WIDTH * 3/2, startJ + WIDTH);
        ctx.lineTo(startI + WIDTH, startJ + WIDTH);
        ctx.lineTo(startI + WIDTH, startJ + WIDTH * 3/2);
        ctx.lineTo(startI + WIDTH * 3/2, startJ + WIDTH);

        ctx.moveTo(startI + WIDTH * 5/2, startJ + WIDTH);
        ctx.lineTo(startI + WIDTH * 3, startJ + WIDTH);
        ctx.lineTo(startI + WIDTH * 3 , startJ + WIDTH * 3/2);
        ctx.lineTo(startI + WIDTH * 5/2, startJ + WIDTH);

        ctx.moveTo(startI + WIDTH * 3, startJ + WIDTH * 5/2);
        ctx.lineTo(startI + WIDTH * 3, startJ + WIDTH * 3);
        ctx.lineTo(startI + WIDTH * 5/2, startJ + WIDTH * 3);
        ctx.lineTo(startI + WIDTH * 3, startJ + WIDTH * 5/2);

        ctx.moveTo(startI + WIDTH, startJ + WIDTH * 5/2);
        ctx.lineTo(startI + WIDTH, startJ + WIDTH * 3);
        ctx.lineTo(startI + WIDTH * 3/2, startJ + WIDTH * 3);
        ctx.lineTo(startI + WIDTH, startJ + WIDTH * 5/2);

        ctx.stroke();

    }

    var setWidthAndHeightForSurroundingArea = function(totalWidth, totalHeight) {
//        surrounding.style.width = "" + totalWidth + "px";
        surrounding.style.height = "" + (totalHeight + 18) + "px";
        pieces.style.width = "" + (totalWidth + 10) + "px";
        pieces.style.height = "" + (totalHeight + 18) + "px";
    }
}

