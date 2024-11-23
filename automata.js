class Automata {
    constructor() {
        gameEngine.automata = this;
        gameEngine.addEntity(this);
        
        this.rows = PARAMS.numRows; // Number of rows in the grid
        this.cols = PARAMS.numCols; // Number of columns in the grid
        this.generation = 0;

        // Initialize current and next grids
        this.grid = [];

        for (let i = 0; i < this.rows; i++) {
            const row = [];
            const nextRow = [];
            for (let j = 0; j < this.cols; j++) {
                row.push(new Population(i, 
                    j, 
                    i === 0 && j === 0,
                    PARAMS.targetValue + i*PARAMS.targetVariance - j*PARAMS.targetVariance
                    // PARAMS.targetValue + i*generateNormalSample(0,PARAMS.targetVariance) + j*generateNormalSample(0,PARAMS.targetVariance) // stochastic gradient
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

        
    }
}
