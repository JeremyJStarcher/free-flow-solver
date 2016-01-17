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
                start: [5 - 1, 3 - 1],
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

    boards['10x10-l71'] = {
        title: '10x10 Level 10',
        height: 10,
        width: 10,
        paths: {
            a: {
                start: [1, 5],
                end: [0, 7]
            },
            b: {
                start: [2, 8],
                end: [4, 7]
            },
            c: {
                start: [5, 7],
                end: [7, 6]
            },
            d: {
                start: [1, 3],
                end: [0, 9]
            },
            e: {
                start: [2, 7],
                end: [4, 4]
            },
            f: {
                start: [6, 9],
                end: [7, 5]
            },
            g: {
                start: [5, 4],
                end: [5, 6]
            },
            h: {
                start: [0, 8],
                end: [6, 6]
            },
        }
    };

    window.boards = boards;
}());
