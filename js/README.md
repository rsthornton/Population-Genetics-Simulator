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

3. **Connector Layer**: Python script that converts BERT's JSON output to simulation configuration

## Repository Structure

```
Population-Genetics-Simulator/
├── js/                          # Original simulation JavaScript files
├── bert/                        # BERT integration files
│   ├── models/                  # BERT JSON model files
│   │   ├── pgs.json             # Base model
│   │   ├── pgs_hub.json         # Hub-and-spoke model 
│   │   ├── pgs_chain.json       # Functional chain model
│   │   └── template.json        # Template for creating new models
│   ├── docs/                    # Documentation
│   │   ├── bert_modeling_guide.md    # Guide for creating BERT models
│   │   └── bert_json_automation.md   # Guide for JSON automation
│   └── scripts/                 # Python connector scripts
│       └── bert_to_sim.py       # Converts BERT JSON to simulation config
├── index.html                   # Simulation main page
└── README.md                    # This file
```

## Getting Started

### Running the Simulation

1. Clone this repository
2. Open `index.html` in a web browser
3. Adjust parameters using the control panel
4. Click "Reset Simulation" to apply changes

### Using BERT Integration

1. Download [BERT](https://bert.systems/)
2. Import one of the model files from the `bert/models/` directory
3. Adjust parameters in the BERT model
4. Export the model as JSON

**Note**: The connector script (`bert_to_sim.py`) is currently a prototype and has not been fully tested. It demonstrates the intended functionality but requires further development and testing before use in production environments.

Once the connector is fully tested, you'll be able to:
5. Run the connector script to generate simulation configuration:
   ```
   python bert/scripts/bert_to_sim.py --input bert_model.json --output config.js
   ```
6. Load the configuration into the simulator

## Key BERT Models

### Base Model
The base model represents the core Population Genetics system with five key subsystems:
- Selection Subsystem
- Reproduction Subsystem
- Mortality Subsystem
- Genetic Variation Subsystem
- Data Collection Subsystem

### Hub-and-Spoke Model
This model adds a central "Population Control" subsystem that coordinates all other subsystems, representing a centralized view of the evolutionary process.

### Functional Chain Model
This model connects subsystems in a process-oriented sequence that represents the actual flow of evolutionary processes: genetic variation → selection → reproduction → mortality → data collection.

## Next Steps

Current development priorities:

1. **Test and refine the Python connector script** for converting BERT JSON to simulation parameters
   - Validate parameter extraction from BERT models
   - Test generated configurations with the simulator
   - Add error handling and edge case detection
2. Add bidirectional communication to feed simulation results back to BERT
3. Create a web-based interface that integrates both tools
4. Develop educational materials leveraging the BERT visual models
5. Add more complex evolutionary scenarios as pre-configured templates

## Contributions

Contributions are welcome! Please feel free to submit a Pull Request.

## Credits

- Original Population Genetics Simulator by [Original Author]
- BERT integration by [Your Name/Organization]
- BERT (Bounded Entity Reasoning Toolkit) by [Halcyonic Systems](https://www.halcyonic.systems/)

## License

This project is licensed under the same terms as the original Population Genetics Simulator.