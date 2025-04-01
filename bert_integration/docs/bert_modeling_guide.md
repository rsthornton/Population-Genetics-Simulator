# BERT Modeling Guide: Population Genetics System

## Table of Contents
1. [Step-by-Step Process: Population Genetics System](#step-by-step-process-population-genetics-system)
2. [Generic BERT Modeling Process](#generic-bert-modeling-process)
3. [Base Population Genetics Model](#base-population-genetics-model)
4. [Hub-and-Spoke Model](#hub-and-spoke-model)
5. [Functional Chain Model](#functional-chain-model)
6. [Model Comparison and Tradeoffs](#model-comparison-and-tradeoffs)
7. [Parameters Mapping Reference](#parameters-mapping-reference)

---

## Step-by-Step Process: Population Genetics System

### Phase 1: Create the Main System
1. Launch BERT
2. Click "Create System" button
3. Name: "Population"
4. Description: "A population of organisms with heritable traits evolving under environmental selection pressures."
5. Set complexity: Check "Complex", check "Adaptable", check "Evolvable"
6. Click "Create"

### Phase 2: Create Output Flows First
#### Regular Output Flow
1. Click "Create Flow" button
2. Name: "Reproduction Output Flow"
3. Type: Select "Flow"
4. Usability: Select "Product"
5. Click "Create"
6. Click on the Population system to add an interface
7. Name: "Reproduction Output Interface"
8. Type: Select "Export"
9. Connect to the "Reproduction Output Flow"
10. Click "Create Sink"
11. Name: "New Organisms"
12. Description: "Organisms produced through reproduction that contribute to next generation population."
13. Connect to "Reproduction Output Flow"

#### Waste Output Flow
1. Click "Create Flow" button
2. Name: "Mortality Flow"
3. Type: Select "Flow"
4. Usability: Select "Waste"
5. Click "Create"
6. Click on the Population system to add an interface
7. Name: "Mortality Interface"
8. Type: Select "Export"
9. Connect to the "Mortality Flow"
10. Click "Create Sink"
11. Name: "Eliminated Organisms"
12. Description: "Organisms that don't survive due to selection or random mortality events."
13. Connect to "Mortality Flow"

#### Information Output Flow
1. Click "Create Flow" button
2. Name: "Data Collection Flow"
3. Type: Select "Message"
4. Usability: Select "Product"
5. Click "Create"
6. Click on the Population system to add an interface
7. Name: "Data Output Interface"
8. Type: Select "Export"
9. Connect to the "Data Collection Flow"
10. Click "Create Sink"
11. Name: "Population Data"
12. Description: "Statistics and metrics collected from the population for analysis."
13. Connect to "Data Collection Flow"

### Phase 3: Create Input Flows
#### Environmental Input Flow
1. Click "Create Flow" button
2. Name: "Environmental Pressure Flow"
3. Type: Select "Message"
4. Usability: Select "Resource"
5. Click "Create"
6. Click on the Population system to add an interface
7. Name: "Environmental Input Interface"
8. Type: Select "Import"
9. Connect to the "Environmental Pressure Flow"
10. Click "Create Source"
11. Name: "Environment"
12. Description: "Provides selection pressure through target phenotype values that change over time."
13. Connect to "Environmental Pressure Flow"
14. Add parameters to flow:
    - targetMin: -35
    - targetMax: 35
    - targetPeriod: 1000
    - environmentPattern: "Gradient"

#### Genetic Input Flow
1. Click "Create Flow" button
2. Name: "Mutation Flow"
3. Type: Select "Message"
4. Usability: Select "Resource"
5. Click "Create"
6. Click on the Population system to add an interface
7. Name: "Genetic Variation Interface"
8. Type: Select "Import"
9. Connect to the "Mutation Flow"
10. Click "Create Source"
11. Name: "Genetic Variation"
12. Description: "Source of new genetic variants through mutation and recombination."
13. Connect to "Mutation Flow"
14. Add parameters to flow:
    - mutationRate: 0.05
    - mutationRange: 0.025
    - initialVariation: 1.0

### Phase 4: Create Interface-Associated Subsystems
1. Click "Add Subsystem" inside Population
2. Name: "Selection Subsystem"
3. Description: "Determines organism fitness based on the match between phenotypes and environmental targets."
4. Associate with: Environmental Input Interface
5. Click "Create"

6. Click "Add Subsystem" inside Population
7. Name: "Mortality Subsystem"
8. Description: "Manages the removal of organisms from the population through both fitness-based selection and random mortality events."
9. Associate with: Mortality Interface
10. Click "Create"

11. Click "Add Subsystem" inside Population
12. Name: "Reproduction Subsystem"
13. Description: "Controls the creation of offspring organisms with inherited and potentially mutated genetic material."
14. Associate with: Reproduction Output Interface
15. Click "Create"

16. Click "Add Subsystem" inside Population
17. Name: "Genetic Variation Subsystem"
18. Description: "Manages genetic diversity through mutation operations and inheritance mechanisms."
19. Associate with: Genetic Variation Interface
20. Click "Create"

21. Click "Add Subsystem" inside Population
22. Name: "Data Collection Subsystem"
23. Description: "Gathers, processes, and transmits statistics about the population."
24. Associate with: Data Output Interface
25. Click "Create"

### Phase 5: Save the Base Model
1. Click "Save"
2. Filename: "population_genetics_base.json"

---

## Generic BERT Modeling Process

### 1. Identify and Create Main System
- Determine the System of Interest (SOI)
- Create the system with appropriate complexity settings
- Provide a clear description of system purpose and boundaries

### 2. Establish System Outputs
- **IMPORTANT**: Always create output flows BEFORE input flows
- Create at least one Product flow (useful output)
- Create at least one Waste flow (necessary byproduct)
- For each flow:
  - Create the flow object
  - Create an export interface on the SOI
  - Connect the flow to the interface
  - Create a sink for the output
  - Connect the flow to the sink

### 3. Establish System Inputs
- Only after outputs are defined, create input flows
- For each input flow:
  - Create the flow object
  - Create an import interface on the SOI
  - Connect the flow to the interface
  - Create a source for the input
  - Connect the flow to the source

### 4. Create Interface-Associated Subsystems
- For each interface (both import and export), create an associated subsystem
- Each subsystem should directly relate to the function of its associated interface
- Provide appropriate descriptions that explain the subsystem's role

### 5. Create Internal Structure
- Determine appropriate internal flows between subsystems
- Create interface connections between subsystems
- Ensure all imports connect to appropriate internal subsystems
- Ensure all exports originate from appropriate internal subsystems

### 6. Add Parameters and Details
- Add relevant parameters to flows
- Add detailed descriptions to all components
- Add quantitative values where appropriate

### 7. Validate and Save
- Check that all flows have proper connections
- Verify that the model accurately represents the real system
- Save the model in BERT's JSON format

---

## Base Population Genetics Model

The base model includes the main Population system with all external interfaces, flows, sources, and sinks, but without any internal connectivity between the interface-associated subsystems.

### System: Population
- Complexity: Complex, Adaptable, Evolvable
- Description: "A population of organisms with heritable traits evolving under environmental selection pressures."

### External Entities

#### Sources:
1. **Environment**
   - Description: "Provides selection pressure through target phenotype values that change over time."
   - Connected via: Environmental Pressure Flow → Environmental Input Interface

2. **Genetic Variation**
   - Description: "Source of new genetic variants through mutation and recombination."
   - Connected via: Mutation Flow → Genetic Variation Interface

#### Sinks:
1. **New Organisms**
   - Description: "Organisms produced through reproduction that contribute to next generation population."
   - Connected via: Reproduction Output Interface → Reproduction Output Flow

2. **Eliminated Organisms**
   - Description: "Organisms that don't survive due to selection or random mortality events."
   - Connected via: Mortality Interface → Mortality Flow

3. **Population Data**
   - Description: "Statistics and metrics collected from the population for analysis."
   - Connected via: Data Output Interface → Data Collection Flow

### Subsystems:
1. **Selection Subsystem**
   - Description: "Determines organism fitness based on the match between phenotypes and environmental targets."
   - Associated with: Environmental Input Interface

2. **Mortality Subsystem**
   - Description: "Manages the removal of organisms from the population through both fitness-based selection and random mortality events."
   - Associated with: Mortality Interface

3. **Reproduction Subsystem**
   - Description: "Controls the creation of offspring organisms with inherited and potentially mutated genetic material."
   - Associated with: Reproduction Output Interface

4. **Genetic Variation Subsystem**
   - Description: "Manages genetic diversity through mutation operations and inheritance mechanisms."
   - Associated with: Genetic Variation Interface

5. **Data Collection Subsystem**
   - Description: "Gathers, processes, and transmits statistics about the population."
   - Associated with: Data Output Interface

### Flows:
1. **Environmental Pressure Flow**
   - Type: Message, Resource
   - Source: Environment
   - Destination: Environmental Input Interface
   - Parameters:
     - targetMin: -35
     - targetMax: 35
     - targetPeriod: 1000
     - environmentPattern: "Gradient"

2. **Mutation Flow**
   - Type: Message, Resource
   - Source: Genetic Variation
   - Destination: Genetic Variation Interface
   - Parameters:
     - mutationRate: 0.05
     - mutationRange: 0.025
     - initialVariation: 1.0

3. **Reproduction Output Flow**
   - Type: Flow, Product
   - Source: Reproduction Output Interface
   - Destination: New Organisms
   - Parameters:
     - maxOffspring: 5
     - populationSoftCap: 100

4. **Mortality Flow**
   - Type: Flow, Waste
   - Source: Mortality Interface
   - Destination: Eliminated Organisms
   - Parameters:
     - deathChancePerGeneration: 0.2

5. **Data Collection Flow**
   - Type: Message, Product
   - Source: Data Output Interface
   - Destination: Population Data
   - Parameters:
     - reportingPeriod: 50

---

## Hub-and-Spoke Model

The Hub-and-Spoke model adds a central coordinating subsystem that connects to all interface-associated subsystems.

### Step 1: Start with the Base Model

### Step 2: Add Central Hub Subsystem
1. Click "Add Subsystem" inside Population
2. Name: "Population Control"
3. Description: "Coordinating hub that manages information flow between specialized subsystems, synchronizing the overall simulation process."
4. Click "Create"

### Step 3: Create Internal Flows from Hub to Interface Subsystems

#### Flow 1: Population Control → Selection
1. Create internal flow
2. Name: "Selection Parameters Flow"
3. Description: "Transmits environmental target values and selection parameters to the selection subsystem."
4. Source: Population Control
5. Destination: Selection Subsystem
6. Parameters:
   - targetVariance: 5.0
   - reproductionVariance: 2.0

#### Flow 2: Population Control → Mortality
1. Create internal flow
2. Name: "Mortality Parameters Flow"
3. Description: "Conveys mortality probability and elimination criteria to the mortality subsystem."
4. Source: Population Control
5. Destination: Mortality Subsystem

#### Flow 3: Selection → Population Control
1. Create internal flow
2. Name: "Fitness Calculation Flow"
3. Description: "Returns calculated fitness values for organisms based on phenotype-environment matching."
4. Source: Selection Subsystem
5. Destination: Population Control

#### Flow 4: Population Control → Reproduction
1. Create internal flow
2. Name: "Reproduction Control Flow"
3. Description: "Sends reproduction instructions including fitness-based offspring counts and constraints."
4. Source: Population Control
5. Destination: Reproduction Subsystem

#### Flow 5: Population Control → Genetic Variation
1. Create internal flow
2. Name: "Mutation Control Flow"
3. Description: "Directs the application of mutation parameters during organism reproduction."
4. Source: Population Control
5. Destination: Genetic Variation Subsystem

#### Flow 6: Population Control → Data Collection
1. Create internal flow
2. Name: "Statistics Collection Flow"
3. Description: "Instructs data collection timing and metrics to be gathered from the population."
4. Source: Population Control
5. Destination: Data Collection Subsystem

### Step 4: Save Hub-and-Spoke Model
1. Click "Save"
2. Filename: "population_genetics_hub_spoke.json"

---

## Functional Chain Model

The Functional Chain model connects subsystems directly in a process-oriented sequence that represents the evolutionary process.

### Step 1: Start with the Base Model

### Step 2: Create Sequential Process Flows

#### Flow 1: Genetic Variation → Selection
1. Create internal flow
2. Name: "Genetic Expression Flow"
3. Description: "Genetic material is expressed as phenotypes that undergo selection pressure."
4. Source: Genetic Variation Subsystem
5. Destination: Selection Subsystem
6. Parameters:
   - numLocii: 100

#### Flow 2: Selection → Reproduction
1. Create internal flow
2. Name: "Fitness-Based Reproduction Flow"
3. Description: "Organisms with higher fitness produce more offspring based on selection outcomes."
4. Source: Selection Subsystem
5. Destination: Reproduction Subsystem
6. Parameters:
   - targetVariance: 5.0
   - reproductionVariance: 2.0

#### Flow 3: Reproduction → Mortality
1. Create internal flow
2. Name: "Population Regulation Flow"
3. Description: "Reproduction and mortality together regulate population size through density dependence."
4. Source: Reproduction Subsystem
5. Destination: Mortality Subsystem
6. Parameters:
   - populationSoftCap: 100

#### Flow 4: Mortality → Genetic Variation
1. Create internal flow
2. Name: "Generational Turnover Flow"
3. Description: "As mortality creates space in the population, new genetic variation enters through offspring."
4. Source: Mortality Subsystem
5. Destination: Genetic Variation Subsystem

#### Flow 5: Reproduction → Data Collection
1. Create internal flow
2. Name: "Population Metrics Flow"
3. Description: "Reproduction outcomes and population changes are measured and recorded."
4. Source: Reproduction Subsystem
5. Destination: Data Collection Subsystem
6. Parameters:
   - reportingPeriod: 50

### Step 3: Save Functional Chain Model
1. Click "Save"
2. Filename: "population_genetics_functional_chain.json"

---

## Model Comparison and Tradeoffs

### Hub-and-Spoke Model

#### Advantages:
- **Centralized Control**: Clear coordination through a single subsystem
- **Parameter Management**: Central location for simulation parameters
- **Modified Easily**: Changes can be made to the central hub to affect multiple subsystems
- **Simplified Debugging**: Issues can be isolated to either the hub or specific subsystems
- **Parallels JavaScript Structure**: Similar to how the `Automata` class coordinates simulation components

#### Disadvantages:
- **Less Biological Realism**: Real populations don't have a central controller
- **More Flows Required**: Requires more flows (at least 5) than the functional chain
- **Potential Bottleneck**: All information must pass through the central hub

### Functional Chain Model

#### Advantages:
- **Process Alignment**: Directly represents the actual biological process of evolution
- **Natural Flow**: Follows the natural sequence of genetic expression, selection, reproduction, and mortality
- **Fewer Flows**: Requires only 5 key flows to represent the full cycle
- **Conceptual Clarity**: Each flow represents a clear biological process
- **Educational Value**: Better illustrates evolutionary mechanisms

#### Disadvantages:
- **Complex Coordination**: No central point for parameter coordination
- **Harder to Debug**: Issues may span multiple connections in the chain
- **Less Control**: Changes may have cascading effects through the chain
- **Implementation Complexity**: May be harder to map to a centralized simulation structure

### Choosing Between Models:
- Use **Hub-and-Spoke** when:
  - You need clear central control
  - The implementation has a coordinating controller class
  - Simplicity of parameter management is important
  - Changes to simulation behavior need to be centralized

- Use **Functional Chain** when:
  - Biological realism is important
  - You want to clearly illustrate process sequence
  - Educational purposes are a priority
  - The model needs to reflect natural system processes

Both models can represent the same system and parameters, but with different conceptual approaches that highlight different aspects of the population genetics system.

---

## Parameters Mapping Reference

This section maps parameters from our BERT model to specific JavaScript simulation parameters.

### Environmental Parameters
- `targetMin` → `PARAMS.targetMin`: Minimum target phenotype value (-35)
- `targetMax` → `PARAMS.targetMax`: Maximum target phenotype value (35)
- `targetPeriod` → `PARAMS.targetPeriod`: How often the environment changes (1000 generations)
- `environmentPattern` → `environment.environmentPattern`: Spatial pattern of environment (Gradient/Uniform/Patches)
- `environmentDynamics` → `environment.environmentDynamics`: Temporal dynamics of environment (Cyclic/Directional/Static)

### Population Parameters
- `numOrganisms` → `PARAMS.numOrganisms`: Initial population size (100)
- `populationSoftCap` → `PARAMS.populationSoftCap`: Carrying capacity affecting reproduction (100)
- `maxOffspring` → `PARAMS.maxOffspring`: Maximum offspring per organism (5)

### Selection Parameters
- `targetVariance` → `PARAMS.targetVariance`: Optimal step size for selection (5.0)
- `reproductionVariance` → `PARAMS.reproductionVariance`: Fitness function width (2.0)

### Organism Parameters
- `numLocii` → `PARAMS.numLocii`: Number of genes per organism (100)
- `initialVariation` → `PARAMS.initialVariation`: Initial genetic variation (1.0)
- `mutationRate` → `PARAMS.mutationRate`: Probability of gene mutation (0.05)
- `mutationRange` → `PARAMS.mutationRange`: Size of mutation effect (0.025)
- `deathChancePerGeneration` → `PARAMS.deathChancePerGeneration`: Random mortality rate (0.2)

### Migration Parameters
- `offspringMigrationChance` → `PARAMS.offspringMigrationChance`: Probability of offspring moving to adjacent cells (0.0001)
- `adultMigrationChance` → `PARAMS.adultMigrationChance`: Probability of adults moving to adjacent cells (0.0001)

### Data Collection Parameters
- `reportingPeriod` → `PARAMS.reportingPeriod`: How often data is collected (50 generations)