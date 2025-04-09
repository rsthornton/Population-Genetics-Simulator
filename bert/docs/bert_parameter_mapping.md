# BERT-Simulation Parameter Mapping Reference

## Overview

This document summarizes the comprehensive mapping between BERT model components and the Population Genetics Simulator implementation. We've established direct connections between visual model elements and JavaScript code, creating a bidirectional reference that enhances understanding of the simulation's structure.

## Base Model Parameter Mapping

The base model represents the core structure of the Population Genetics system with five key flows connecting to their respective subsystems. Each flow carries parameters that directly map to JavaScript implementation.

### 1. Environmental Pressure Flow (Input)

**Substance Type:** Message  
**Substance Sub-Type:** Selection Pressure

| Parameter | Value | Unit | JavaScript Implementation | Purpose |
|:----------|:------|:-----|:--------------------------|:--------|
| targetMin | -35 | phenotype units | `PARAMS.targetMin` in params.js<br>Used in automata.js line 24 | Defines minimum possible target phenotype value |
| targetMax | 35 | phenotype units | `PARAMS.targetMax` in params.js<br>Used in automata.js line 25 | Defines maximum possible target phenotype value |
| targetStep | 5 | phenotype units | `PARAMS.targetStep` in params.js<br>Used in automata.js line 26 | Controls granularity of environmental changes |
| targetPeriod | 1000 | generations | `PARAMS.targetPeriod` in params.js<br>Used in automata.js line 27 and population.js line 6 | Determines frequency of environmental changes |
| environmentPattern | Spatial Distribution | - | Selected via UI in automata.js line 19<br>Options: "gradient", "uniform", "random", "patches" | Determines spatial distribution of environment across grid |
| environmentDynamics | Temporal Pattern | - | Selected via UI in automata.js line 20<br>Options: "cyclic", "directional", "none" | Determines how environment changes over time |
| targetVariance | 5 | phenotype units | `PARAMS.targetVariance` in params.js<br>Used in population.js line 142 | Controls visual scaling of phenotype-target distance |
| targetObservationalNoise | 0.1 | phenotype units | `PARAMS.targetObservationalNoise` in params.js<br>Used in organism.js line 9 | Adds uncertainty to organism's perception of target |

### 2. Genetic Variation Flow (Input)

**Substance Type:** Message  
**Substance Sub-Type:** Genetic Diversity

| Parameter | Value | Unit | JavaScript Implementation | Purpose |
|:----------|:------|:-----|:--------------------------|:--------|
| mutationRate | 0.05 | probability/gene/generation | `PARAMS.mutationRate` in params.js<br>Used in organism.js line 22 | Probability that each gene will mutate |
| mutationRange | 0.025 | gene units | `PARAMS.mutationRange` in params.js<br>Used in gene.js line 9 | Controls magnitude of mutations when they occur |
| initialVariation | 1.0 | gene units | `PARAMS.initialVariation` in params.js<br>Used in gene.js line 3 | Sets genetic diversity in starting population |
| numLocii | 100 | genes/organism | `PARAMS.numLocii` in params.js<br>Used in organism.js line 4 | Number of genes per organism |
| offspringMigrationChance | 0.0001 | probability/generation | `PARAMS.offspringMigrationChance` in params.js<br>Used in population.js line 86 | Probability of offspring moving to adjacent cells |
| adaptiveStepSize | 0.5 | phenotype units | `PARAMS.adaptiveStepSize` in params.js<br>Used in organism.js line 29 | Controls phenotypic plasticity within lifetime |

### 3. Reproduction Flow (Output)

**Substance Type:** Material  
**Substance Sub-Type:** Organisms

| Parameter | Value | Unit | JavaScript Implementation | Purpose |
|:----------|:------|:-----|:--------------------------|:--------|
| maxOffspring | 5 | offspring/generation | `PARAMS.maxOffspring` in params.js<br>Used in population.js line 78 | Maximum offspring per organism under ideal conditions |
| populationSoftCap | 100 | organisms | `PARAMS.populationSoftCap` in params.js<br>Used in population.js line 72 | Carrying capacity affecting reproduction rate |
| reproductionVariance | 2 | phenotype units | `PARAMS.reproductionVariance` in params.js<br>Used in population.js line 70 | Controls width of fitness function curve |

### 4. Mortality Flow (Output)

**Substance Type:** Material  
**Substance Sub-Type:** Organisms

| Parameter | Value | Unit | JavaScript Implementation | Purpose |
|:----------|:------|:-----|:--------------------------|:--------|
| deathChancePerGeneration | 0.2 | probability/generation | `PARAMS.deathChancePerGeneration` in params.js<br>Used in population.js line 95 | Probability of random death per generation |
| adultMigrationChance | 0.0001 | probability/generation | `PARAMS.adultMigrationChance` in params.js<br>Used in population.js line 96 | Probability of adult migrating to adjacent cell |

### 5. Data Collection Flow (Output)

**Substance Type:** Message  
**Substance Sub-Type:** Statistics

| Parameter | Value | Unit | JavaScript Implementation | Purpose |
|:----------|:------|:-----|:--------------------------|:--------|
| reportingPeriod | 50 | generations | `PARAMS.reportingPeriod` in params.js<br>Used in datamanager.js line 138 and population.js line 74 | Controls frequency of data collection |
| histogramWidth | 5 | phenotype units | `PARAMS.histogramWidth` in params.js<br>Used in datamanager.js lines 53-54 | Sets range of gene values in histograms |

## Model-to-Subsystem Component Mapping

The BERT model contains five subsystems that map directly to JavaScript implementation:

| BERT Subsystem | JavaScript Files | Main Functionality |
|:---------------|:-----------------|:-------------------|
| Selection | population.js | Fitness calculation based on phenotype-target distance (line 76-78) |
| Reproduction | population.js | Offspring generation with inheritance (lines 78-93) |
| Mortality | population.js | Death logic and migration (lines 95-97) |
| Genetic Variation | organism.js, gene.js | Mutation and inheritance mechanisms (organism.js:20-24, gene.js:6-10) |
| Data Collection | datamanager.js | Statistics gathering and visualization (updateData() method, lines 51-121) |

## Lessons Learned

1. **Parameter Organization by Flow**: Parameters naturally group by the flows they affect, creating a logical organization that mirrors biological processes.

2. **Direct Code Mapping**: Each parameter has a direct implementation in code, allowing for traceability between model and implementation.

3. **Meta-Terminology**: Using broader meta terms (e.g., "Spatial Distribution" instead of "Gradient") makes the model more conceptually clear and adaptable to future changes.

4. **Units Clarify Meaning**: Adding proper units to parameters provides essential context about what each value represents and how it should be interpreted.

5. **Type Classification**: Properly categorizing substance types (Material vs. Message) helps distinguish physical entities (organisms) from information flows.

## Implications for Chain and Hub Models

When enhancing the Chain and Hub models, we should:

1. **Maintain Parameter Consistency**: All parameters should be consistently named and valued across models.

2. **Add Flow-Specific Parameters to Internal Flows**: For example:
   - The "Fitness-Based Reproduction Flow" between Selection and Reproduction subsystems should include `targetVariance` and `reproductionVariance` parameters
   - The "Population Regulation Flow" between Reproduction and Mortality should include `populationSoftCap`

3. **Distinguish Coordination Parameters**:
   - For the Hub model, parameters controlling coordination should be attached to flows from the Population Control subsystem
   - For the Chain model, ensure parameters are attached to the appropriate sequential flow

4. **Document Parameter Interactions**: Explicitly note how parameters in sequential processes (Chain) or coordinated processes (Hub) interact with each other

5. **Cross-Reference Implementation**: Each internal flow should reference the specific code segments that implement the interaction between subsystems

## Next Steps

1. Apply this parameter mapping approach to the Chain model, enhancing internal flows with appropriate parameters

2. Apply this parameter mapping approach to the Hub model, focusing on coordination parameters

3. Update descriptions for all subsystems to reference specific code segments and functions

4. Create interactive parameter reference visualizations that show the impact of parameter changes

5. Develop the connector layer that would convert BERT model parameter values to simulation configuration

This parameter mapping exercise completes the first development priority outlined in the project README, providing a comprehensive parameter reference guide that links BERT elements to JavaScript implementation.