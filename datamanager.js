class DataManager {
    constructor(automata) {
        this.automata = automata;

        // population data
        this.organismPopulation = [];
        this.biomePopulation = [];

        // Store histograms over time
        this.geneticHistogramData = [];

        // Initialize the Histogram instance for visualization
        gameEngine.addGraph(new Graph(800, 0, [this.organismPopulation], "Organisms"));
        gameEngine.addGraph(new Graph(800, 115, [this.biomePopulation], "Populated Biomes"));
        gameEngine.addGraph(new Histogram(800, 230, this.geneticHistogramData, "Genetic Distribution"));
    }

    updateData() {
        const bucketCount = 20;
        const minRange = -PARAMS.histogramWidth;
        const maxRange = PARAMS.histogramWidth;
        const bucketSize = (maxRange - minRange) / bucketCount;

        let histogram = Array(bucketCount).fill(0);
        let organismPop = 0;
        let biomePop = 0;

        for (let i = 0; i < PARAMS.numRows; i++) {
            for (let j = 0; j < PARAMS.numCols; j++) {
                let pop = this.automata.grid[i][j].currentPopulation;
                if (pop.length > 0) {
                    organismPop += pop.length;
                    biomePop++;
                    for (const organism of pop) {
                        for (const gene of organism.genes) {
                            let value = gene.value;
                            let index = Math.floor((value - minRange) / bucketSize);

                            if (index < 0) index = 0;
                            else if (index >= bucketCount) index = bucketCount - 1;

                            histogram[index]++;
                        }
                    }
                }
            }
        }
        
        // Append the new histogram to the geneticHistogramData for time-series tracking
        this.organismPopulation.push(organismPop);
        this.biomePopulation.push(biomePop);
        this.geneticHistogramData.push(histogram);
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
