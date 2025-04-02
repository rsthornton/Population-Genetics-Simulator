//GameBoard code below
function randomInt(n) {
    return Math.floor(Math.random() * n);
};

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

function numArray(n) {
    let arr = [];
    for(let i = 0; i < n; i++) {
        arr.push(i);
    }
    return arr;
};

function generateNormalSample(mean = 0, stdDev = 1) {
    // box-muller transform
    let u1 = Math.random();
    let u2 = Math.random();

    let z0 = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
    return z0 * stdDev + mean;
};

function rgb(r, g, b) {
    return "rgb(" + r + "," + g + "," + b + ")";
};

function hsl(h, s, l) {
    return "hsl(" + h + "," + s + "%," + l + "%)";
};

function download(filename, text) {
    var pom = document.createElement('a');
    pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    pom.setAttribute('download', filename);
    pom.click();
};


function databaseConnected() {
    const dbDiv = document.getElementById("db");
    dbDiv.classList.remove("db-disconnected");
    dbDiv.classList.add("db-connected");
};

function databaseDisconnected() {
    const dbDiv = document.getElementById("db");
    dbDiv.classList.remove("db-connected");
    dbDiv.classList.add("db-disconnected");
};

function loadParameters() {
    PARAMS.numRows = parseInt(document.getElementById("numRows").value);
    PARAMS.numCols = parseInt(document.getElementById("numCols").value);

    // Population parameters
    PARAMS.numOrganisms = parseInt(document.getElementById("numOrganisms").value);
    PARAMS.maxOffspring = parseInt(document.getElementById("maxOffspring").value);
    PARAMS.targetVariance = parseFloat(document.getElementById("targetVariance").value);
    PARAMS.initialVariation = parseFloat(document.getElementById("initialVariation").value);
    PARAMS.reproductionVariance = parseFloat(document.getElementById("reproductionVariance").value);
    PARAMS.populationSoftCap = parseInt(document.getElementById("populationSoftCap").value);

    // Organism parameters
    PARAMS.numLocii = parseInt(document.getElementById("numLocii").value);
    PARAMS.mutationRate = parseFloat(document.getElementById("mutationRate").value);
    PARAMS.mutationRange = parseFloat(document.getElementById("mutationRange").value);
    PARAMS.deathChancePerGeneration = parseFloat(document.getElementById("deathChancePerGeneration").value);
    PARAMS.offspringMigrationChance = parseFloat(document.getElementById("offspringMigrationChance").value);
    PARAMS.adultMigrationChance = parseFloat(document.getElementById("adultMigrationChance").value);
    PARAMS.adaptiveStepSize = parseFloat(document.getElementById("adaptiveStepSize").value);
    PARAMS.targetObservationalNoise = parseFloat(document.getElementById("targetObservationalNoise").value);
    
    // Environment dynamics parameters
    PARAMS.targetMin = parseFloat(document.getElementById("targetMin").value);
    PARAMS.targetMax = parseFloat(document.getElementById("targetMax").value);
    PARAMS.targetStep = parseFloat(document.getElementById("targetStep").value);
    PARAMS.targetPeriod = parseInt(document.getElementById("targetPeriod").value);

    console.log(PARAMS);
}

const runs = [
    // {   
    //     runName: "01. wild type 1 - no humans",
    //     harvestStrategy: "none",
    //     plantStrategy: "none",
    //     humanAddRate: 0,
    //     plantSelectionChance: 0.0,
    //     plantSelectionStrength: 0.0,
    //     individualSeedSeparation: true,
    //     sharedPlantingSeeds: true,
    // },
    {   
        runName: "02. wild type 2 - humans harvest randomly",
        harvestStrategy: "random",
        plantStrategy: "none",
        humanAddRate: 100,
        plantSelectionChance: 0.0,
        plantSelectionStrength: 0.0,
        individualSeedSeparation: true,
        sharedPlantingSeeds: true,
    },  
    {   
        runName: "03. wild type 3 - humans harvest and plant randomly",
        harvestStrategy: "random",
        plantStrategy: "random",
        humanAddRate: 100,
        plantSelectionChance: 0.0,
        plantSelectionStrength: 0.2,
        individualSeedSeparation: true,
        sharedPlantingSeeds: true,
    },
    // {   
    //     runName: "04. exp 1 - harvesting shattering",
    //     harvestStrategy: "dispersal",
    //     plantStrategy: "none",
    //     humanAddRate: 100,
    //     plantSelectionChance: 0.0,
    //     plantSelectionStrength: 0.0,
    //     individualSeedSeparation: true,
    //     sharedPlantingSeeds: true,
    // },
    // {   
    //     runName: "05. exp 1 - harvesting non-shattering (sickle hypothesis)",
    //     harvestStrategy: "mindispersal",
    //     plantStrategy: "none",
    //     humanAddRate: 100,
    //     plantSelectionChance: 0.0,
    //     plantSelectionStrength: 0.0,
    //     individualSeedSeparation: true,
    //     sharedPlantingSeeds: true,
    // },        
    // {   
    //     runName: "06. exp 1 - harvesting shattering with random planting",
    //     harvestStrategy: "dispersal",
    //     plantStrategy: "random",
    //     humanAddRate: 100,
    //     plantSelectionChance: 0.0,
    //     plantSelectionStrength: 0.2,
    //     individualSeedSeparation: true,
    //     sharedPlantingSeeds: true,
    // },
    // {   
    //     runName: "07. exp 1 - harvesting non-shattering with random planting",
    //     harvestStrategy: "mindispersal",
    //     plantStrategy: "random",
    //     humanAddRate: 100,
    //     plantSelectionChance: 0.0,
    //     plantSelectionStrength: 0.2,
    //     individualSeedSeparation: true,
    //     sharedPlantingSeeds: true,
    // },
    {   
        runName: "08. exp 2 - planting the first harvested seeds",
        harvestStrategy: "random",
        plantStrategy: "bottom",
        humanAddRate: 100,
        plantSelectionChance: 1.0,
        plantSelectionStrength: 0.2,
        individualSeedSeparation: true,
        sharedPlantingSeeds: true,
    },
    // {   
    //     runName: "09. exp 2 - planting the last harvested seeds",
    //     harvestStrategy: "random",
    //     plantStrategy: "top",
    //     humanAddRate: 100,
    //     plantSelectionChance: 1.0,
    //     plantSelectionStrength: 0.2,
    //     individualSeedSeparation: true,
    //     sharedPlantingSeeds: true,
    // },
    // {   
    //     runName: "10. exp 2 - harvesting shattering planting first harvested seeds",
    //     harvestStrategy: "dispersal",
    //     plantStrategy: "bottom",
    //     humanAddRate: 100,
    //     plantSelectionChance: 1.0,
    //     plantSelectionStrength: 0.2,
    //     individualSeedSeparation: true,
    //     sharedPlantingSeeds: true,
    // },
    // {   
    //     runName: "11. exp 2 - harvesting shattering planting harvested seeds",
    //     harvestStrategy: "dispersal",
    //     plantStrategy: "top",
    //     humanAddRate: 100,
    //     plantSelectionChance: 1.0,
    //     plantSelectionStrength: 0.2,
    //     individualSeedSeparation: true,
    //     sharedPlantingSeeds: true,
    // },
    // {   
    //     runName: "12. exp 2 - harvesting non-shattering planting first harvested seeds",
    //     harvestStrategy: "mindispersal",
    //     plantStrategy: "bottom",
    //     humanAddRate: 100,
    //     plantSelectionChance: 1.0,
    //     plantSelectionStrength: 0.2,
    //     individualSeedSeparation: true,
    //     sharedPlantingSeeds: true,
    // },
    // {   
    //     runName: "13. exp 2 - harvesting non-shattering planting harvested seeds",
    //     harvestStrategy: "mindispersal",
    //     plantStrategy: "top",
    //     humanAddRate: 100,
    //     plantSelectionChance: 1.0,
    //     plantSelectionStrength: 0.2,
    //     individualSeedSeparation: true,
    //     sharedPlantingSeeds: true,
    // },
    // {   
    //     runName: "14. exp 3 - planting light seeds",
    //     harvestStrategy: "random",
    //     plantStrategy: "weight",
    //     humanAddRate: 100,
    //     plantSelectionChance: 1.0,
    //     plantSelectionStrength: 0.2,
    //     individualSeedSeparation: true,
    //     sharedPlantingSeeds: true,
    // },
    // {   
    //     runName: "15. exp 3 - planting heavy seeds",
    //     harvestStrategy: "random",
    //     plantStrategy: "minweight",
    //     humanAddRate: 100,
    //     plantSelectionChance: 1.0,
    //     plantSelectionStrength: 0.2,
    //     individualSeedSeparation: true,
    //     sharedPlantingSeeds: true,
    // },
    // {   
    //     runName: "16. exp 3 - planting deep rooted seeds",
    //     harvestStrategy: "random",
    //     plantStrategy: "deepRoots",
    //     humanAddRate: 100,
    //     plantSelectionChance: 1.0,
    //     plantSelectionStrength: 0.2,
    //     individualSeedSeparation: true,
    //     sharedPlantingSeeds: true,
    // },
    // {   
    //     runName: "17. exp 3 - planting shallow rooted seeds",
    //     harvestStrategy: "random",
    //     plantStrategy: "mindeepRoots",
    //     humanAddRate: 100,
    //     plantSelectionChance: 1.0,
    //     plantSelectionStrength: 0.2,
    //     individualSeedSeparation: true,
    //     sharedPlantingSeeds: true,
    // },
    // {   
    //     runName: "18. exp 3 - planting shattering seeds",
    //     harvestStrategy: "random",
    //     plantStrategy: "dispersal",
    //     humanAddRate: 100,
    //     plantSelectionChance: 1.0,
    //     plantSelectionStrength: 0.2,
    //     individualSeedSeparation: true,
    //     sharedPlantingSeeds: true,
    // },
    // {   
    //     runName: "19. exp 3 - planting non-shattering seeds",
    //     harvestStrategy: "random",
    //     plantStrategy: "mindispersal",
    //     humanAddRate: 100,
    //     plantSelectionChance: 1.0,
    //     plantSelectionStrength: 0.2,
    //     individualSeedSeparation: true,
    //     sharedPlantingSeeds: true,
    // },
    // {   
    //     runName: "20. exp 4 - double humans first harvested",
    //     harvestStrategy: "random",
    //     plantStrategy: "bottom",
    //     humanAddRate: 200,
    //     plantSelectionChance: 1.0,
    //     plantSelectionStrength: 0.2,
    //     individualSeedSeparation: true,
    //     sharedPlantingSeeds: true,
    // },
    // {   
    //     runName: "21. exp 4 - less selective first harvested",
    //     harvestStrategy: "random",
    //     plantStrategy: "bottom",
    //     humanAddRate: 100,
    //     plantSelectionChance: 1.0,
    //     plantSelectionStrength: 0.5,
    //     individualSeedSeparation: true,
    //     sharedPlantingSeeds: true,
    // },
    // {   
    //     runName: "22. exp 4 - 50% selective humans first harvested",
    //     harvestStrategy: "random",
    //     plantStrategy: "bottom",
    //     humanAddRate: 100,
    //     plantSelectionChance: 0.5,
    //     plantSelectionStrength: 0.2,
    //     individualSeedSeparation: true,
    //     sharedPlantingSeeds: true,
    // },
    // {   
    //     runName: "23. exp 4 - half humans first harvested",
    //     harvestStrategy: "random",
    //     plantStrategy: "bottom",
    //     humanAddRate: 50,
    //     plantSelectionChance: 1.0,
    //     plantSelectionStrength: 0.2,
    //     individualSeedSeparation: true,
    //     sharedPlantingSeeds: true,
    // },
    // {   
    //     runName: "24. exp 4 - more selective first harvested",
    //     harvestStrategy: "random",
    //     plantStrategy: "bottom",
    //     humanAddRate: 100,
    //     plantSelectionChance: 1.0,
    //     plantSelectionStrength: 0.1,
    //     individualSeedSeparation: true,
    //     sharedPlantingSeeds: true,
    // },
    // {   
    //     runName: "25. exp 4 - 60% selective humans first harvested",
    //     harvestStrategy: "random",
    //     plantStrategy: "bottom",
    //     humanAddRate: 100,
    //     plantSelectionChance: 0.6,
    //     plantSelectionStrength: 0.2,
    //     individualSeedSeparation: true,
    //     sharedPlantingSeeds: true,
    // },
    // {   
    //     runName: "26. exp 4 - double humans non-shattering",
    //     harvestStrategy: "random",
    //     plantStrategy: "mindispersal",
    //     humanAddRate: 200,
    //     plantSelectionChance: 1.0,
    //     plantSelectionStrength: 0.2,
    //     individualSeedSeparation: true,
    //     sharedPlantingSeeds: true,
    // },
    // {   
    //     runName: "27. exp 4 - less selective non-shattering",
    //     harvestStrategy: "random",
    //     plantStrategy: "mindispersal",
    //     humanAddRate: 100,
    //     plantSelectionChance: 1.0,
    //     plantSelectionStrength: 0.5,
    //     individualSeedSeparation: true,
    //     sharedPlantingSeeds: true,
    // },
    // {   
    //     runName: "28. exp 4 - fewer selective humans non-shattering",
    //     harvestStrategy: "random",
    //     plantStrategy: "mindispersal",
    //     humanAddRate: 100,
    //     plantSelectionChance: 0.5,
    //     plantSelectionStrength: 0.2,
    //     individualSeedSeparation: true,
    //     sharedPlantingSeeds: true,
    // },
    // {   
    //     runName: "29. exp 4 - half humans non-shattering",
    //     harvestStrategy: "random",
    //     plantStrategy: "mindispersal",
    //     humanAddRate: 50,
    //     plantSelectionChance: 1.0,
    //     plantSelectionStrength: 0.2,
    //     individualSeedSeparation: true,
    //     sharedPlantingSeeds: true,
    // },
    // {   
    //     runName: "30. exp 4 - more selective non-shattering",
    //     harvestStrategy: "random",
    //     plantStrategy: "mindispersal",
    //     humanAddRate: 100,
    //     plantSelectionChance: 1.0,
    //     plantSelectionStrength: 0.1,
    //     individualSeedSeparation: true,
    //     sharedPlantingSeeds: true,
    // },
    // {   
    //     runName: "31. exp 4 - much fewer selective humans non-shattering",
    //     harvestStrategy: "random",
    //     plantStrategy: "mindispersal",
    //     humanAddRate: 100,
    //     plantSelectionChance: 0.25,
    //     plantSelectionStrength: 0.2,
    //     individualSeedSeparation: true,
    //     sharedPlantingSeeds: true,
    // },
    // {   
    //     runName: "32. 40% selective first harvested",
    //     harvestStrategy: "random",
    //     plantStrategy: "bottom",
    //     humanAddRate: 100,
    //     plantSelectionChance: 1.0,
    //     plantSelectionStrength: 0.4,
    //     individualSeedSeparation: true,
    //     sharedPlantingSeeds: true,
    // },
    // {   
    //     runName: "33. 30% selective first harvested",
    //     harvestStrategy: "random",
    //     plantStrategy: "bottom",
    //     humanAddRate: 100,
    //     plantSelectionChance: 1.0,
    //     plantSelectionStrength: 0.3,
    //     individualSeedSeparation: true,
    //     sharedPlantingSeeds: true,
    // },
    // {   
    //     runName: "34. 70% selective humans first harvested",
    //     harvestStrategy: "random",
    //     plantStrategy: "bottom",
    //     humanAddRate: 100,
    //     plantSelectionChance: 0.70,
    //     plantSelectionStrength: 0.2,
    //     individualSeedSeparation: true,
    //     sharedPlantingSeeds: true,
    // },
    // {   
    //     runName: "35. 80% selective humans first harvested",
    //     harvestStrategy: "random",
    //     plantStrategy: "bottom",
    //     humanAddRate: 100,
    //     plantSelectionChance: 0.80,
    //     plantSelectionStrength: 0.2,
    //     individualSeedSeparation: true,
    //     sharedPlantingSeeds: true,
    // },
    // {   
    //     runName: "36. 90% selective humans first harvested",
    //     harvestStrategy: "random",
    //     plantStrategy: "bottom",
    //     humanAddRate: 100,
    //     plantSelectionChance: 0.90,
    //     plantSelectionStrength: 0.2,
    //     individualSeedSeparation: true,
    //     sharedPlantingSeeds: true,
    // },
    // {   
    //     runName: "37. collective seed separation",
    //     harvestStrategy: "random",
    //     plantStrategy: "random",
    //     humanAddRate: 100,
    //     plantSelectionChance: 1.0,
    //     plantSelectionStrength: 0.2,
    //     individualSeedSeparation: false,
    //     sharedPlantingSeeds: true,
    // },
    // {   
    //     runName: "38. individual planting stores",
    //     harvestStrategy: "random",
    //     plantStrategy: "bottom",
    //     humanAddRate: 100,
    //     plantSelectionChance: 1.0,
    //     plantSelectionStrength: 0.2,
    //     individualSeedSeparation: true,
    //     sharedPlantingSeeds: false,
    // },
];
