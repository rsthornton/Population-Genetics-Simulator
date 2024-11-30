class Automata {
    constructor() {
        gameEngine.automata = this;
        gameEngine.addEntity(this);
        
        this.rows = PARAMS.numRows; // Number of rows in the grid
        this.cols = PARAMS.numCols; // Number of columns in the grid
        this.generation = 0;

        // Initialize current and next grids
        this.grid = [];

        // create population selection dynamics
        let targetDynamics = [];
        let val = 0;
        for(let i = 0; i < this.rows; i++) {
            targetDynamics.push(val);
            val = val + PARAMS.targetVariance;
        }
        val = val - 2*PARAMS.targetVariance;
        for(let i = 0; i < 2 * this.rows - 2; i++) {
            targetDynamics.push(val);
            val = val - PARAMS.targetVariance;
        }
        val = val + 2*PARAMS.targetVariance;
        for(let i = 0; i < this.rows - 2; i++) {
            targetDynamics.push(val);
            val = val + PARAMS.targetVariance;
        }

        let target = {
            dynamics: targetDynamics,
            changePeriod: 1000,
            startIndex: 0
        }

        for (let i = 0; i < this.rows; i++) {
            const row = [];
            const nextRow = [];
            for (let j = 0; j < this.cols; j++) {
                target.startIndex = (i - j + targetDynamics.length) % targetDynamics.length;
                row.push(new Population(i, 
                    j, 
                    i === 0 && j === 0, // initial population cell
                    target
                                ));  // Current generation
            }
            this.grid.push(row);
        }

        gameEngine.addEntity(new DataManager(this));
    }

    // Advance each cell's population to the next generation
    nextGeneration() {
        this.generation++;
        for (let row of this.grid) {
            for (let population of row) {
                population.nextGeneration();
            }
        }
    }

    update() {
        this.nextGeneration();
    }

    // Draw the entire grid of populations
    draw(ctx) {
        const cellWidth = PARAMS.pixelDimension / this.cols;
        const cellHeight = PARAMS.pixelDimension / this.rows;

        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                const population = this.grid[i][j];
                const x = j * cellWidth;
                const y = i * cellHeight;

                // Set up a clipping region for each cell
                ctx.save();
                ctx.beginPath();

                ctx.rect(x, y, cellWidth, cellHeight);
                ctx.clip();

                // Draw the population within the clipping region
                population.draw(ctx);

                ctx.lineWidth = 3;
                // Outline each cell for visibility
                ctx.strokeStyle = 'black';
                ctx.strokeRect(x, y, cellWidth, cellHeight);

                ctx.restore();
            }
        }

        ctx.clearRect(800, 700, 800, 200);
        ctx.font = "12px Arial";
        ctx.fillStyle = "#000000";
        ctx.textAlign = "left";

        ctx.fillText(`Generation ${this.generation}`, 810, 762);
        ctx.fillText(`Tick ${gameEngine.clockTick}`, 810, 776);
        ctx.fillText(`FPS ${gameEngine.timer.ticks.length}`, 810, 790);
        ctx.font = "10px Arial";
    }
}
