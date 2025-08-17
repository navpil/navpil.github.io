var timeouts = {
    simpleTimeouts: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    arrayTimeouts: [[]],
    registerTimeout: function(i, tm) {
        timeouts.simpleTimeouts[i] = tm;
    },
    startArrayRegistering: function() {
        timeouts.arrayTimeouts = [[]];
    },
    registerArray: function(tm) {
        timeouts.arrayTimeouts[0].push(tm);
    },
    clearAllTimeouts: function() {
        for (var i in timeouts.simpleTimeouts) {
            clearTimeout(timeouts.simpleTimeouts[i]);
        }
        for (var i in timeouts.arrayTimeouts) {
            for (var j in timeouts.arrayTimeouts[j]) {
                clearTimeout(arrayTimeouts[i][j]);
            }
        }
        timeouts.simpleTimeouts = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        timeouts.arrayTimeouts = [[]];
    }
}