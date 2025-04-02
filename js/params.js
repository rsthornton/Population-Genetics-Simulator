var PARAMS = {
    // sim
    updatesPerDraw: 1,

    // automata
    pixelDimension: 800,
    numRows: 8,
    numCols: 8,

    // Environment dynamics
    targetMin: -35,
    targetMax: 35,
    targetStep: 5,
    targetPeriod: 1000,

    // population
    numOrganisms: 100,
    initialVariation: 1,
    maxOffspring: 5,
    targetValue: 0,
    targetVariance: 5,
    reproductionVariance: 2,
    populationSoftCap: 100, 

    // organism
    numLocii: 100,
    mutationRate: 0.05,
    mutationRange: 0.025,
    targetObservationalNoise: 0.1,
    adaptiveStepSize: 0.5,
    deathChancePerGeneration: 0.2,
    offspringMigrationChance: 0.0001, 
    adultMigrationChance: 0.0001,

    // data gathering
    reportingPeriod: 50,
    epoch: 150000,

    // graphs
    histogramWidth: 5,
    graphHeight: 100,
    graphWidth: 400,

    // database
    db: "populationGeneticsDB",
    collection: "test"
};

