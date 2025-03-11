class Automata {
    constructor() {
        gameEngine.automata = this;
        gameEngine.addEntity(this);

        this.rows = PARAMS.numRows; // Number of rows in the grid
        this.cols = PARAMS.numCols; // Number of columns in the grid
        this.generation = 0;

        // Initialize current and next grids
        this.grid = [];


        this.initializeAutomata();
        gameEngine.addEntity(new DataManager(this));
    }

    initializeAutomata() {
        var environmentPattern = document.getElementById('environmentPattern').value;
        var environmentDynamics = document.getElementById('environmentDynamics').value;
    
        // Generate target dynamics based on parameters
        let targetDynamics = [];
        let min = PARAMS.targetMin;
        let max = PARAMS.targetMax;
        let step = PARAMS.targetStep;
        let period = PARAMS.targetPeriod;
        
        if (environmentDynamics === "cyclic") {
            // Generate a cyclic pattern: min to max, then back to min
            for (let val = 0; val <= max; val += step) {
                targetDynamics.push(val);
            }
            for (let val = max - step; val > min; val -= step) {
                targetDynamics.push(val);
            }
            for (let val = min; val < 0; val += step) {
                targetDynamics.push(val);
            }
        } else if (environmentDynamics === "directional") {
            // Generate a continuous directional pattern from min to max
            for (let val = min; val <= max; val += step) {
                targetDynamics.push(val);
            }
        } else {
            // No dynamics - just use a single value
            targetDynamics.push(0);
        }
    
        let target = {};
        target = {
            dynamics: targetDynamics,
            changePeriod: environmentDynamics === "none" ? 0 : period,
            type: environmentDynamics,
            startIndex: 0
        };
    
        // Initialize current and next grids
        this.grid = [];
    
        // Create grid and populate cells
        for (let i = 0; i < this.rows; i++) {
            const row = [];
            for (let j = 0; j < this.cols; j++) {
                // Create a new target object for each cell
                let cellTarget = Object.assign({}, target);
                
                // Set startIndex based on pattern
                switch (environmentPattern) {
                    case "random":
                        cellTarget.startIndex = randomInt(targetDynamics.length);
                        break;
                    case "uniform":
                        cellTarget.startIndex = 0;
                        break;
                    case "gradient":
                        cellTarget.startIndex = (i - j + targetDynamics.length) % targetDynamics.length;
                        break;
                    case "patches":
                        let ii = Math.floor(i / this.cols * 2);
                        let jj = Math.floor(j / this.rows * 2);
                        let val = ii - jj;
                        cellTarget.startIndex = (val * (PARAMS.numCols - 1) + targetDynamics.length) % targetDynamics.length;
                        if(ii === jj && ii === 1) {  
                            cellTarget.startIndex = (2 * PARAMS.numCols - 2 + targetDynamics.length) % targetDynamics.length;
                        }
                        break;
                }
                
                row.push(new Population(i, j, i === 0 && j === 0, cellTarget));
            }
            this.grid.push(row);
        }
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
