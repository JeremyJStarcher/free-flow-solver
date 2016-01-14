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

        // Set starting and ending paths
        Object.keys(board.paths).forEach(pathName => {
            const path = board.paths[pathName];

            const startX = path.start[0];
            const startY = path.start[1];

            const startMark = {
                path: pathName,
                startPoint: true,
                endPoint: false
            };

            board.grid[startX][startY] = startMark;

            const endX = path.end[0];
            const endY = path.end[1];

            const endMark = {
                path: pathName,
                startPoint: false,
                endPoint: true
            };

            board.grid[endX][endY] = endMark;
        });

        return board;
    }

    function* singleStep(board) {
        const paths = Object.keys(board.paths);
        let depth = 0;
        let solved = false;

        function* solve(path, startx, starty) {
            function* tryMove(path, x, y, direction) {
                const square = board.grid[x][y];
                const currPathName = paths[depth];
                const currPath = board.paths[currPathName];

                if (x === currPath.end[0] && y === currPath.end[1]) {
                    depth++;
                    const zpath = paths[depth];

                    if (!zpath) {
                        solved = true;
                        board.solved = true;
                        yield board;
                        board.solved = false;
                        return;
                    }

                    yield * solve(zpath, board.paths[zpath].start[0], board.paths[zpath].start[1]);
                    depth--;
                }

                if (square === null) {
                    board.grid[x][y] = {
                        path: path,
                        line: true,
                        sourceDirection: direction
                    };

                    yield * solve(path, x, y);
                    yield board;
                    board.grid[x][y] = null;
                }
            }

            if (!solved) {
                yield * tryMove(path, startx + 1, starty, direction.east);
            }

            if (!solved) {
                yield * tryMove(path, startx - 1, starty, direction.west);
            }

            if (!solved) {
                yield * tryMove(path, startx, starty + 1, direction.north);
            }

            if (!solved) {
                yield * tryMove(path, startx, starty - 1, direction.south);
            }
        }

        const zpath = paths[depth];
        yield * solve(zpath, board.paths[zpath].start[0], board.paths[zpath].start[1]);
    }

    window.solver = {
        init,
        direction,
        singleStep
    };
}());
