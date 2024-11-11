var PARAMS = {
    // sim
    updatesPerDraw: 1,

    // automata
    pixelDimension: 800,
    numRows: 8,
    numCols: 8,

    // population
    numOrganisms: 100,
    maxOffspring: 5,
    targetValue: 0,
    targetVariance: 5,
    reproductionVariance: 2,
    populationSoftCap: 100, // make softer slope bro

    // organism
    numLocii: 100,
    mutationRate: 0.05,
    mutationRange: 0.025,
    deathChancePerGeneration: 0.2,
    offspringMigrationChance: 0.0001, // offspring migration

    // data gathering
    histogramWidth: 5,
    reportingPeriod: 50,
    epoch: 150000,

    // database
    db: "domesticationDB",
    collection: "test"
};

