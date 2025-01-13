class DataManager {
    constructor(automata) {
        this.automata = automata;

        // population data
        this.organismPopulation = [];
        this.biomePopulation = [];
        this.meanGeneValues = [];
        this.upperStdDevGeneValues = [];
        this.lowerStdDevGeneValues = [];

        // Store histograms over time
        this.geneticHistogramData = [];

        // Individual cell-level data initialized with default values
        this.cellMeanGeneValues = Array(PARAMS.numRows).fill().map(() => Array(PARAMS.numCols).fill().map(() => []));
        this.cellUpperStdDevGeneValues = Array(PARAMS.numRows).fill().map(() => Array(PARAMS.numCols).fill().map(() => []));
        this.cellLowerStdDevGeneValues = Array(PARAMS.numRows).fill().map(() => Array(PARAMS.numCols).fill().map(() => []));
        this.cellHistograms = Array(PARAMS.numRows).fill().map(() => Array(PARAMS.numCols).fill().map(() => []));
        
        // Initialize the Histogram instance for visualization
        gameEngine.addGraph(new Graph(800, 0, [this.organismPopulation], "Organisms", 0, 0));
        gameEngine.addGraph(new Graph(800, 115, [this.biomePopulation], "Populated Biomes", 0, 64));
        
        let options = {
            label: "Genetic Distribution"
        };
        gameEngine.addGraph(new Histogram(800, 230, this.geneticHistogramData, options));
        gameEngine.addGraph(new Graph(800, 230, [this.meanGeneValues, this.upperStdDevGeneValues, this.lowerStdDevGeneValues], "", -PARAMS.histogramWidth, PARAMS.histogramWidth));
        
        const cellWidth = PARAMS.pixelDimension / PARAMS.numCols;
        const cellHeight = PARAMS.pixelDimension / PARAMS.numRows;
        options = {
            width: cellWidth,
            height: cellHeight
        };
    
        for (let i = 0; i < PARAMS.numRows; i++) {
            for (let j = 0; j < PARAMS.numCols; j++) {
                automata.grid[i][j].geneHistogram = new Histogram(
                    j * cellWidth,
                    i * cellHeight,
                    this.cellHistograms[i][j],
                    options
                );
            }
        }
        // automata.cellGeneHistograms = cellGeneHistograms;
    }

    updateData() {
        const bucketCount = 20;
        const minRange = -PARAMS.histogramWidth;
        const maxRange = PARAMS.histogramWidth;
        const bucketSize = (maxRange - minRange) / bucketCount;
    
        let histogram = Array(bucketCount).fill(0);
        let totalGeneValue = 0;
        let totalGeneCount = 0;
        let organismPop = 0;
        let biomePop = 0;
        let geneValues = [];
    
        for (let i = 0; i < PARAMS.numRows; i++) {
            for (let j = 0; j < PARAMS.numCols; j++) {
                let cellHistogram = Array(bucketCount).fill(0);
                let cellTotalGeneValue = 0;
                let cellTotalGeneCount = 0;
                let cellMean = 0;
                let cellStdDev = 0;
                let pop = this.automata.grid[i][j].currentPopulation;

                if (pop.length > 0) {
                    organismPop += pop.length;
                    biomePop++;
                    for (const organism of pop) {
                        for (const gene of organism.genes) {
                            let value = gene.value;
                            totalGeneValue += value;
                            totalGeneCount++;
                            geneValues.push(value); // Collect gene values for standard deviation calculation
    
                            let index = Math.floor((value - minRange) / bucketSize);
                            if (index < 0) index = 0;
                            else if (index >= bucketCount) index = bucketCount - 1;
                            histogram[index]++;
                            cellHistogram[index]++;
                            cellTotalGeneValue += value;
                            cellTotalGeneCount++;
                        }
                    }

                    // Update cell-level genetic data
                    if (cellTotalGeneCount > 0) {
                        cellMean = cellTotalGeneValue / cellTotalGeneCount;
                        let cellVariance = cellHistogram.reduce((acc, val, idx) => {
                            let midPoint = minRange + bucketSize * (idx + 0.5);
                            return acc + val * (midPoint - cellMean) ** 2;
                        }, 0) / cellTotalGeneCount;
                        cellStdDev = Math.sqrt(cellVariance);
                    }
                }
                this.cellMeanGeneValues[i][j].push(cellMean);
                this.cellUpperStdDevGeneValues[i][j].push(cellMean + cellStdDev);
                this.cellLowerStdDevGeneValues[i][j].push(cellMean - cellStdDev);
                this.cellHistograms[i][j].push(cellHistogram);
            }
        }
    
        let mean = totalGeneValue / totalGeneCount;
        let variance = geneValues.reduce((acc, val) => acc + (val - mean) ** 2, 0) / totalGeneCount;
        let standardDeviation = Math.sqrt(variance);
    
        // Append the new histogram and stats to the data arrays for time-series tracking
        this.organismPopulation.push(organismPop);
        this.biomePopulation.push(biomePop);
        this.geneticHistogramData.push(histogram);
        this.meanGeneValues.push(mean);
        this.upperStdDevGeneValues.push(mean - standardDeviation);
        this.lowerStdDevGeneValues.push(mean + standardDeviation);
    }

    logData() {
        const data = {
            db: PARAMS.db,
            collection: PARAMS.collection,
            data: {
                PARAMS: PARAMS,
                geneticHistogramData: this.geneticHistogramData
            }
        };

        if (socket) socket.emit("insert", data);
    }

    update() {
        // Update data each frame
        if(this.automata.generation % PARAMS.reportingPeriod === 0) this.updateData();
    }

    draw(ctx) {
        // Draw the histogram, handled by the Histogram class in the game engine
    }
}
