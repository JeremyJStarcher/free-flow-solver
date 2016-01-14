(function() {
    'use strict';

    const colors = {
        a: 'blue',
        b: 'green',
        c: 'cyan',
        d: 'pink',
        e: 'purple',
        f: 'magenta',
        h: 'silver',
        i: 'brown'
    };

    function memoize(func) {
        let memo = {};
        let slice = Array.prototype.slice;

        return function() {
            let args = slice.call(arguments);

            if (args in memo) {
                return memo[args];
            } else {
                return (memo[args] = func.apply(this, args));
            }
        };
    }

    const determineFontHeightRaw = function(fontStyle, text) {
        const body = document.getElementsByTagName('body')[0];
        const dummy = document.createElement('div');
        const dummyText = document.createTextNode(text);
        dummy.appendChild(dummyText);
        dummy.setAttribute('style', fontStyle);
        body.appendChild(dummy);
        const result = dummy.offsetHeight;
        body.removeChild(dummy);
        return result;
    };

    const determineFontHeight = memoize(determineFontHeightRaw);

    function fillerFactory(ctx, square, squareSize, x, y) {

        function drawBoundingBox() {
            ctx.fillStyle = 'black';
            ctx.fillRect(x, y, squareSize, squareSize);

            ctx.strokeStyle = 'white';
            ctx.strokeRect(x, y, squareSize, squareSize);
        }

        function drawBorderBox() {
            ctx.fillStyle = 'gray';
            ctx.fillRect(x, y, squareSize, squareSize);
        }

        function drawStartPoint() {
            const centerX = x + (squareSize / 2);
            const centerY = y + (squareSize / 2);
            const r = (squareSize * 0.50) * 0.80;
            const color = colors[square.path];
            ctx.beginPath();
            ctx.fillStyle = color;
            ctx.strokeStyle = color;
            ctx.arc(centerX, centerY, r, 0, Math.PI * 2, true);
            ctx.closePath();
            ctx.fill();

            ctx.globalCompositeOperation = 'difference';
            ctx.fillStyle = 'white';

            ctx.textAlign = 'center';

            const style = (squareSize * 0.50) + 'px serif';
            const text = square.path;
            const h = determineFontHeight(style, text);

            ctx.font = style;
            ctx.fillText(text, centerX, centerY + (h / 2));
        }
        return {
            drawBoundingBox,
            drawBorderBox,
            drawStartPoint
        };
    }

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

                const filler = fillerFactory(ctx, square, squareSize, x1, y1);
                filler.drawBoundingBox(x1, y1);

                if (square === null) {
                    continue;
                }

                if (square.path === 'edgemark') {
                    filler.drawBorderBox(x1, y1);
                }

                if (square.startPoint || square.endPoint) {
                    filler.drawStartPoint();
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

        function showSelectedBoard(event) {
            let target = event.target || event.srcElement;
			while(target.tagName.toLowerCase() !== 'select') {
			target = target.parentNode;
			}
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