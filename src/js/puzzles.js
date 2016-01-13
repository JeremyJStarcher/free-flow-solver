(function() {
    'use strict';

    const boards = {};

    boards[10] = {
        title: 'Sample board, level 10',
        height: 7,
        width: 7,
        paths: {
            a: {
                start: [4 - 1, 4 - 1],
                end: [6 - 1, 6 - 1]
            },
            b: {
                start: [3 - 1, 6 - 1],
                end: [6 - 1, 7 - 1]
            },
            c: {
                start: [5 - 1, 2 - 1],
                end: [5 - 1, 7 - 1]
            },
            d: {
                start: [4 - 1, 5 - 1],
                end: [4 - 1, 7 - 1]
            },
            e: {
                start: [2 - 1, 2 - 1],
                end: [3 - 1, 7 - 1]
            },
            f: {
                start: [2 - 1, 1 - 1],
                end: [1 - 1, 7 - 1]
            }
        }
    };

    window.boards = boards;
}());
