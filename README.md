# Population Genetics Simulator with BERT Integration

This is a fork of the original Population Genetics Simulator with added integration for BERT (Bounded Entity Reasoning Toolkit), creating a powerful combination for both education and research in evolutionary biology.

## Overview

The Population Genetics Simulator provides an interactive visualization of evolutionary processes, allowing users to observe how genetic traits evolve under different selection pressures and environmental conditions. This fork adds integration with BERT, a visual systems modeling tool that helps decompose and understand complex systems.

## BERT Integration Value

The integration of BERT with the Population Genetics Simulator offers several benefits:

1. **Conceptual Clarity**: BERT's visual system modeling makes complex evolutionary dynamics more accessible
2. **Parameter Exploration**: Use BERT to configure simulation parameters through an intuitive visual interface
3. **Research Communication**: Standardized visual representation of simulation models for easier collaboration
4. **Educational Tool**: Students can understand system components before diving into mathematical details
5. **Design-First Approach**: Model evolutionary systems visually before implementation

## Integration Approach

The integration follows a modular approach:

1. **BERT System Models**: Visual models of the Population Genetics system in multiple configurations:
   - Base model with interface-associated subsystems
   - Hub-and-spoke model for centralized coordination
   - Functional chain model representing the evolutionary process flow

2. **Parameter Mapping**: Explicit mapping between BERT components and simulation parameters:
   - Environmental parameters (targets, patterns, dynamics)
   - Population parameters (size, carrying capacity, offspring limits)
   - Organism parameters (mutation rate, number of loci, phenotypic plasticity)

3. **Connector Layer**: Conceptual Python script that would convert BERT's JSON output to simulation configuration (not yet implemented)

## Repository Structure

```
Population-Genetics-Simulator/
├── js/                          # Original simulation JavaScript files
│   ├── automata.js              # Main simulation controller
│   ├── datamanager.js           # Statistics collection
│   ├── gene.js                  # Genetic implementation
│   ├── organism.js              # Organism implementation
│   ├── population.js            # Population dynamics
│   ├── params.js                # Simulation parameters
│   └── ...                      # Other simulation files
├── index.html                   # Simulation main page (located at root level)
├── bert/                        # BERT integration files
│   ├── models/                  # BERT JSON model files
│   │   ├── pgs.json             # Base model
│   │   ├── pgs_hub.json         # Hub-and-spoke model 
│   │   ├── pgs_chain.json       # Functional chain model
│   │   └── template.json        # Template for creating new models
│   ├── docs/                    # Documentation
│   │   ├── bert_modeling_guide.md       # Guide for creating BERT models
│   │   ├── bert_json_automation_guide.md # Guide for JSON automation
│   │   └── bert_population_genetics_demo.md # Demo implementation guide
│   └── scripts/                 # Python connector scripts
│       └── bert_to_sim.py       # CONCEPT ONLY: Potential converter from BERT JSON to simulation config
└── README.md                    # This file
```

## Getting Started

### Running the Simulation

1. Clone this repository
2. Open `index.html` (in the root directory) in a web browser
3. The simulation's JavaScript files in the `js/` folder will automatically load
4. Adjust parameters using the control panel
5. Click "Reset Simulation" to apply changes

### Using BERT Integration

1. Download BERT from [Halcyonic's GitHub repository](https://github.com/halcyonic-systems/bert)
2. Import one of the model files from the `bert/models/` directory
3. Explore the model
4. Adjust parameters in the BERT model (simulation integration not yet implemented)
5. Export the model as JSON (simulation integration not yet implemented)

**Important Note**: The connector script (`bert_to_sim.py`) is currently only a conceptual placeholder and has not been developed or tested at all. It represents a future development direction showing how BERT models might be converted to simulation parameters.

## Key BERT Models

### Base Model
The base model represents the core Population Genetics system with five key subsystems:
- Selection Subsystem (maps to selection logic in `population.js`)
- Reproduction Subsystem (maps to offspring generation in `population.js`)
- Mortality Subsystem (maps to death logic in `population.js`)
- Genetic Variation Subsystem (maps to mutation logic in `organism.js` and `gene.js`)
- Data Collection Subsystem (maps to `datamanager.js`)

### Hub-and-Spoke Model
This model adds a central "Population Control" subsystem that coordinates all other subsystems, representing a centralized view of the evolutionary process. This parallels how the `Automata` class in `automata.js` coordinates the simulation components.

### Functional Chain Model
This model connects subsystems in a process-oriented sequence that represents the actual flow of evolutionary processes: genetic variation → selection → reproduction → mortality → data collection.

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
- **More Flows Required**: Requires more flows than the functional chain
- **Potential Bottleneck**: All information must pass through the central hub

### Functional Chain Model

#### Advantages:
- **Process Alignment**: Directly represents the actual biological process of evolution
- **Natural Flow**: Follows the natural sequence of genetic expression, selection, reproduction, and mortality
- **Fewer Flows**: Requires only key flows to represent the full cycle
- **Conceptual Clarity**: Each flow represents a clear biological process
- **Educational Value**: Better illustrates evolutionary mechanisms

#### Disadvantages:
- **Complex Coordination**: No central point for parameter coordination
- **Harder to Debug**: Issues may span multiple connections in the chain
- **Less Control**: Changes may have cascading effects through the chain
- **Implementation Complexity**: May be harder to map to a centralized simulation structure

## Next Steps

Current development priorities:

1. **Enhance BERT Models with Complete Parameter Information**:
   - Add detailed parameters to each flow and subsystem in the BERT models
   - Document the exact mapping between BERT components and simulator parameters in `js/params.js`
   - Add references to specific JavaScript files and functions for each subsystem
   - Create a comprehensive parameter reference guide linking BERT elements to JavaScript implementation

2. **Research and develop a Python converter script** for translating BERT JSON to simulation parameters:
   - Design a proper mapping between BERT model components and simulation parameters
   - Develop a prototype implementation
   - Test thoroughly with various BERT models
   - Add comprehensive error handling

3. Create a bidirectional communication mechanism to feed simulation results back to BERT
4. Develop a web-based interface that integrates both tools
5. Create educational materials leveraging the BERT visual models
6. Add more complex evolutionary scenarios as pre-configured templates

## License

This project is licensed under the same terms as the original Population Genetics Simulator.
