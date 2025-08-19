function BoardMemory(params) {

    var maxSize = params && params.size ? params.size : 90;
    var repetitionIsGeeseLoss = params && params.repetitionIsGeeseLoss ? params.repetitionIsGeeseLoss : false;

    var tempMap = {};

    var queue = [];
    var map = {};

    //Only for temporary calculation
    this.tempExecute = function(arrPosition) {
        if (!repetitionIsGeeseLoss) return false;
        var position = transformToString(arrPosition);
        queue.push(position);
        if (queue.length > maxSize) {
            var oldElem = queue[queue.length - maxSize - 1];
            dec(tempMap, oldElem);
        }
        return inc(tempMap, position);
    }

    this.tempUndo = function() {
        if (!repetitionIsGeeseLoss) return;
        var lastAddedElem = queue.pop();
        dec(tempMap, lastAddedElem);
        if (queue.length > maxSize) {
            var oldElem = queue[queue.length - maxSize - 1];
            inc(tempMap, oldElem);
        }
    }

    this.execute = function(arrPosition) {
        if (!repetitionIsGeeseLoss) return false;
        var position = transformToString(arrPosition);
        queue.push(position);
        while (queue.length > maxSize) {
            var oldElem = queue.shift();
            dec(map, oldElem);
        }
        var positionRepeated = inc(map, position)
        tempMap = copyOfObject(map);
        return positionRepeated;
    }

    var transformToString = function(position) {
        var s = "";
        for (var i = 0; i< position.length; i++) {
            var row = position[i];
            for (var j = 0; j < row.length; j++) {
                s += row[j];
            }
        }
        return s;
    }

    var copyOfObject = function(m) {
        var copyOfM = {};
        for (var key in m) {
            copyOfM[key] = m[key];
        }
        return copyOfM;
    }

    var inc = function(m, elem) {
        if (!m[elem]) {
            m[elem] = 1;
        } else {
            m[elem]++;
        }
        return m[elem] > 2;
    }

    var dec = function(m, elem) {
        if (m[elem]) {
            m[elem]--;
        }
        if (!m[elem]) {
            delete m[elem];
        }
    }

};
