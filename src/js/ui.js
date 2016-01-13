(function() {
    'use strict';

    function calcMaxCanvasSize() {
        const canvas = document.getElementById('game');
        const sizer = document.getElementById('sizer');

        sizer.style.display = 'block';

        const canvasHeight = sizer.offsetHeight - canvas.offsetTop;
        const canvasWidth = sizer.offsetWidth - canvas.offsetLeft;
        const r = Math.min(canvasHeight, canvasWidth);

        sizer.style.display = 'none';
        return r * 0.98;
    }

    function renderBoard(board) {
        const canvas = document.getElementById('game');
        const ctx = canvas.getContext('2d');
        const grid = board.grid;

        const maxCanvasSize = calcMaxCanvasSize();

        const w = board.width;
        const h = board.height;
        const maxDim = Math.max(w, h);

        const squareSize = Math.floor(maxCanvasSize / (maxDim + 2));

        canvas.width = maxCanvasSize;
        canvas.height = maxCanvasSize;

        for (let x = -1; x < w + 1; x++) {
            for (let y = -1; y < h + 1; y++) {

                const square = grid[x][y];
                const x1 = (x + 1) * squareSize;
                const y1 = (y + 1) * squareSize;

                if (square === null) {
                    ctx.strokeRect(x1, y1, squareSize, squareSize);
                    continue;
                }

                if (square.path === 'edgemark') {
                    ctx.fillRect(x1, y1, squareSize, squareSize);
                }
            }
        }
    }

    window.addEventListener('load', function() {
        const select = document.getElementById('puzzle-select');

        function buildPuzzleList(boards) {
            Object.keys(boards).forEach((name) => {
                const level = boards[name];

                const option = new Option(level.title, name);
                select.add(option);
            });
        }

        function showSelectedBoard() {
            const target = event.target || event.srcElement;
            const levelName = target.options[target.selectedIndex].value;
            if (levelName) {
                const level = window.boards[levelName];
                const board = window.solver.init(level);
                renderBoard(board);
            }
        }

        function addUiHandlers() {
            select.addEventListener('click', showSelectedBoard);
            select.addEventListener('change', showSelectedBoard);
        }

        buildPuzzleList(window.boards);
        addUiHandlers();
    });
}());
