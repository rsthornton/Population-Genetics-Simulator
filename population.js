class Population {
    constructor(row, col, populated, target) {
        this.row = row;
        this.col = col;

        this.target = target;

        // Two separate arrays for current and next population
        this.currentPopulation = [];
        this.nextPopulation = [];

        this.populationTimeSeries = [];

        // Initialize the current population
        if (populated) {
            for (let i = 0; i < PARAMS.numOrganisms; i++) {
                this.currentPopulation.push(new Organism());
            }
        }
    }

    averagePhenotype() {
        const totalPhenotype = this.currentPopulation.reduce((sum, organism) => sum + organism.phenotype, 0);
        return totalPhenotype / this.currentPopulation.length;
    }

    // Advances to the next generation with potential migration
    nextGeneration() {
        const target = this.target;
        const variance = PARAMS.reproductionVariance;
        const maxOffspring = PARAMS.maxOffspring;
        const offspringPenalty = this.currentPopulation.length / PARAMS.populationSoftCap;

        if(gameEngine.automata.generation % PARAMS.reportingPeriod === 0) this.populationTimeSeries.push(this.currentPopulation.length);
        this.currentPopulation.forEach(org => {
            let distance = Math.abs(org.phenotype - target);
            let expectedOffspring = Math.max(maxOffspring * Math.max(0, Math.pow(Math.E, -distance / variance)) - offspringPenalty, 0);

            const integerOffspring = Math.floor(expectedOffspring);
            const fractionalOffspring = expectedOffspring - integerOffspring;

            for (let i = 0; i < integerOffspring; i++) {
                let offspring = new Organism(org);
                offspring.mutate();
                this.migrateOffspring(offspring);
            }

            if (Math.random() < fractionalOffspring) {
                let offspring = new Organism(org);
                offspring.mutate();
                this.migrateOffspring(offspring);
            }

            if(Math.random() >= PARAMS.deathChancePerGeneration) this.nextPopulation.push(org);
        });

        [this.currentPopulation, this.nextPopulation] = [this.nextPopulation, []];
    }

    // Handles migration by placing offspring in neighboring cells within the global grid
    migrateOffspring(offspring) {
        const grid = gameEngine.automata.grid;
    
        if (Math.random() < PARAMS.offspringMigrationChance) {
            // Define possible offsets for the Moore neighborhood (excluding the center cell)
            const neighborhoodOffsets = [
                [-1, -1], [-1, 0], [-1, 1],
                [0, -1], /* [0, 0] */ [0, 1],
                [1, -1], [1, 0], [1, 1]
            ];
    
            // Randomly select one of the 8 neighboring cells
            const [rowOffset, colOffset] = neighborhoodOffsets[Math.floor(Math.random() * neighborhoodOffsets.length)];
    
            // Calculate the new row and column, wrapping around the grid edges (torus behavior)
            const newRow = (this.row + rowOffset + PARAMS.numRows) % PARAMS.numRows;
            const newCol = (this.col + colOffset + PARAMS.numCols) % PARAMS.numCols;
    
            // Place the offspring in the selected neighboring cell
            grid[newRow][newCol].nextPopulation.push(offspring);
        } else {
            // If no migration, offspring remains in the current population
            this.nextPopulation.push(offspring);
        }
    }

    draw(ctx) {
        const cellWidth = PARAMS.pixelDimension / PARAMS.numCols;
        const cellHeight = PARAMS.pixelDimension / PARAMS.numRows;
        const margin = 6;
        const y = this.row * cellHeight;
        const x = this.col * cellWidth;
        const lineY = y + cellHeight / 2;

        const hasPop = this.currentPopulation.length > 0;
    
        // Function to map phenotype values to colors on a gradient
        const getColorForPhenotype = (value) => {
            // Clamp value between -50 and +50
            value = Math.max(-10*PARAMS.targetVariance, Math.min(10*PARAMS.targetVariance, value));
        
            if (value < 0) {
                // Negative values transition from white (0) to blue (-50)
                const intensity = (50 + value) / 50; // Scale from 1 (white) to 0 (blue)
                const red = Math.floor(255 * intensity);
                const green = Math.floor(255 * intensity);
                return `rgb(${red}, ${green}, 255)`;
            } else {
                // Positive values transition from white (0) to red (+50)
                const intensity = (50 - value) / 50; // Scale from 1 (white) to 0 (red)
                const green = Math.floor(255 * intensity);
                const blue = Math.floor(255 * intensity);
                return `rgb(255, ${green}, ${blue})`;
            }
        };
        
    
        // Calculate phenotype colors
        const targetColor = getColorForPhenotype(this.target);
        const meanPhenotype = this.averagePhenotype();
        const meanColor = getColorForPhenotype(meanPhenotype);
        const minPhenotype = Math.min(...this.currentPopulation.map(org => org.phenotype));
        const maxPhenotype = Math.max(...this.currentPopulation.map(org => org.phenotype));
        const minColor = getColorForPhenotype(minPhenotype);
        const maxColor = getColorForPhenotype(maxPhenotype);
    
        // Draw a border with the target color
        ctx.strokeStyle = targetColor;
        ctx.lineWidth = margin;
        ctx.strokeRect(x + margin / 2, y + margin / 2, cellWidth - margin, cellHeight - margin);
    
        // Draw top half with max color
        ctx.fillStyle = hasPop ? maxColor : "black";
        ctx.fillRect(x + margin, y + margin, cellWidth - 2 * margin, cellHeight / 2 - margin);
    
        // Draw bottom half with min color
        ctx.fillStyle = hasPop ? minColor : "black";
        ctx.fillRect(x + margin, y + cellHeight / 2, cellWidth - 2 * margin, cellHeight / 2 - margin);
    
        // Draw center line with mean color
        ctx.strokeStyle = hasPop ? meanColor : "black";
        ctx.lineWidth = margin;
        ctx.beginPath();
        ctx.moveTo(x + margin, lineY);
        ctx.lineTo(x + cellWidth - margin, lineY);
        ctx.stroke();
    }    
}