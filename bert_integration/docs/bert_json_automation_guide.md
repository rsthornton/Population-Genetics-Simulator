# BERT JSON Automation Guide

## Introduction

This document provides guidelines for creating automated JSON templates for the BERT (Bounded Entity Reasoning Toolkit) visualization tool. Automating BERT model creation via JSON templates can dramatically reduce the manual effort required, particularly for creating similar system models with different parameters.

## Key Challenges in BERT JSON Automation

1. **Spatial Positioning**: 
   - BERT requires precise coordinate positioning of all elements
   - Interface connections depend on exact spatial relationships
   - Subsystems must align with their associated interfaces on the system boundary

2. **ID System Requirements**:
   - IDs follow specific prefixing conventions (S, C, I, B, F, etc.)
   - Hierarchical indexing must be maintained (e.g., C0.1, I0.1.2)
   - Cross-references between entities must be consistent

3. **Interface-Subsystem Connection**:
   - Subsystems must be properly associated with their parent interfaces
   - The `parent_interface` field must correctly reference the interface ID
   - Rotation angles must align with the system boundary at interface points

## Template Creation Process

### 1. Study Existing Models
Start by examining working BERT JSON files to understand the structure and spatial relationships:
- Examine the Bitcoin template (`btc.json`)
- Review working population genetics models (`pgs.json`, `pgs_hub.json`, `pgs_chain.json`)

### 2. Extract Interface and Subsystem Positioning Rules
For each subsystem type, document the exact spatial relationship with its interface:
```
// Example rule for a subsystem at interface angle 0.0 (right side)
subsystemTranslation = [mainSystemRadius - subsystemRadius, 0.0];
```

### 3. Document Rotation Patterns
Interfaces and their subsystems need specific rotation values:
- Export interfaces typically have rotation values around 0
- Import interfaces typically have rotation values around π (3.14...)
- Subsystems should be rotated to face their parent systems

### 4. Create Coordinate Calculation Functions
For a programmatic approach, develop functions that:
- Calculate exact positions based on system radii and interface angles
- Generate proper rotation values based on interface types
- Handle internal flows between subsystems

## Critical Fields for Correct Visualization

### 1. Interface Angle Placement
```json
"interfaces": [
  {
    "info": {
      "id": "I0.0",
      "level": 1,
      "name": "Interface Name"
    },
    "type": "Export", // or "Import"
    "exports_to": ["Snk-1.0"], // for Export interfaces
    "receives_from": ["Src-1.0"], // for Import interfaces
    "angle": 0.5 // Critical for positioning
  }
]
```

### 2. Subsystem-Interface Association
```json
{
  "info": {
    "id": "C0.0",
    "level": 1,
    "name": "Subsystem Name"
  },
  "boundary": {
    "parent_interface": "I0.0" // Must match an existing interface ID
  },
  "transform": {
    "translation": [150.0, 150.0], // Must align with interface position
    "rotation": 0.0 // Should match interface direction
  }
}
```

### 3. Optimal Positioning Calculations

For a main system with radius R and an interface at angle θ, the optimal position for a subsystem with radius r is:

```
x = (R - r) * cos(θ)
y = (R - r) * sin(θ)
```

When creating templates, use these calculations to ensure subsystems connect properly.

## Example Template Structure

1. **Define Main System**
2. **Add System Interfaces** (with proper angles)
3. **Add Sources and Sinks**
4. **Connect External Flows**
5. **Add Subsystems** (with calculated positions)
6. **Define Internal Flows** (as needed)

## Lessons from Population Genetics Model

The population genetics template highlighted several important considerations:

1. **Interface Angles**: 
   - Reproduction Interface: 0.5 radians
   - Mortality Interface: 0.0 radians
   - Data Interface: -0.5 radians
   - Environmental Interface: 2.6 radians
   - Genetic Variation Interface: -3.1 radians

2. **Subsystem Positioning**: 
   - Subsystems should be placed at `(R-r)*cos(θ), (R-r)*sin(θ)` where:
     - R = main system radius (300.0)
     - r = subsystem radius (50.0)
     - θ = interface angle

3. **Visual Connection Fix**:
   - The visual disconnect in our template occurred because the subsystem positions didn't precisely align with the calculated points on the system boundary
   - For perfect alignment, subsystems must be positioned exactly at the interface location

## Future Automation Directions

1. **Python Template Generator**:
   - Create a Python script that generates BERT JSON with proper spatial positioning
   - Include parameter customization through a simple configuration file
   - Implement proper ID generation and cross-referencing

2. **Template Library**:
   - Develop a collection of base templates for common systems (ecosystems, organizations, etc.)
   - Create a catalog of subsystem patterns (hub-and-spoke, chain, network)
   - Document parameter mappings for each template type

3. **Visual Position Calibration Tool**:
   - Create a utility that can validate and fix positioning in existing BERT JSON files
   - Automate the alignment of subsystems with interfaces
   - Ensure flows connect properly between entities

## Parameter Mapping Strategy

For automated configuration, establish a clear mapping between simulation parameters and BERT model components:

```json
"parameters": [
  {
    "name": "mutationRate",
    "value": "0.05",
    "description": "Probability of gene mutation during reproduction",
    "js_param": "PARAMS.mutationRate",
    "min": "0.0",
    "max": "1.0"
  }
]
```

## Conclusion

Creating automated BERT JSON templates requires careful attention to spatial positioning, ID structuring, and interface connections. By developing standardized calculation methods and template structures, we can significantly reduce the manual effort required to create and modify BERT models.

The population genetics template provides a starting point, but precise positioning calculations are needed for perfect visual alignment. Future automation efforts should focus on programmatic generation of properly positioned elements to ensure consistent, usable templates.