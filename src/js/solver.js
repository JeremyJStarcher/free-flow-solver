(function() {
    'use strict';

    const direction = {
        north: 100,
        south: 101,
        east: 102,
        west: 103,
        all: 200
    };

    const edgeMark = {
        path: 'edgemark',
        sourceDirection: direction.all
    };

    function init(level) {
        // By putting an edge mark around the entire board, we save ourselves
        // from having to check boundary conditions later on.  It is a very
        // small price to pay for easy of coding.

        const board = level;
        board.grid = [];

        const w = level.width;
        const h = level.height;

        for (let x = -1; x < (w + 1); x++) {
            board.grid[x] = [];
            board.grid[x][-1] = edgeMark;
            board.grid[x][h] = edgeMark;

            for (let y = 0; y < (h); y++) {
                let val = null;
                if (x === -1 || x === level.width) {
                    val = edgeMark;

                }
                board.grid[x][y] = val;
            }
        }
        return board;
    }

    window.solver = {
        init,
        direction
    };
}());
