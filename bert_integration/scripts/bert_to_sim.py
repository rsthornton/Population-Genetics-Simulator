#!/usr/bin/env python3
"""
BERT to Population Genetics Simulator Connector

This script converts a BERT JSON model to Population Genetics Simulator configuration.
It extracts parameters from the BERT model and generates a JavaScript configuration
file that can be used to initialize the simulation.

IMPORTANT: This is a prototype implementation that has not been fully tested.
It demonstrates the intended functionality but requires further development
and testing before use in production environments. Use at your own risk.

Usage:
    python bert_to_sim.py --input bert_model.json --output sim_config.js
"""

import argparse
import json
import sys
from typing import Dict, Any, List, Optional


def parse_args() -> argparse.Namespace:
    """Parse command line arguments."""
    parser = argparse.ArgumentParser(description="Convert BERT JSON to simulation configuration")
    parser.add_argument("--input", required=True, help="Path to BERT JSON model file")
    parser.add_argument("--output", required=True, help="Path to output JavaScript configuration file")
    parser.add_argument("--verbose", action="store_true", help="Enable verbose output")
    return parser.parse_args()


def load_bert_model(file_path: str) -> Dict[str, Any]:
    """Load a BERT JSON model from file."""
    try:
        with open(file_path, "r") as f:
            return json.load(f)
    except Exception as e:
        print(f"Error loading BERT model: {e}", file=sys.stderr)
        sys.exit(1)


def extract_parameters(bert_model: Dict[str, Any]) -> Dict[str, Any]:
    """Extract simulation parameters from BERT model."""
    params = {
        # Default parameters
        "numRows": 8,
        "numCols": 8,
        "numOrganisms": 100,
        "initialVariation": 1,
        "environmentPattern": "gradient",
        "environmentDynamics": "cyclic",
        "targetMin": -35,
        "targetMax": 35,
        "targetStep": 5, 
        "targetPeriod": 1000,
        "maxOffspring": 5,
        "targetVariance": 5,
        "reproductionVariance": 2,
        "populationSoftCap": 100,
        "numLocii": 100,
        "mutationRate": 0.05,
        "mutationRange": 0.025,
        "deathChancePerGeneration": 0.2,
        "offspringMigrationChance": 0.0001,
        "adultMigrationChance": 0.0001,
        "targetObservationalNoise": 0.1,
        "adaptiveStepSize": 0.5,
        "reportingPeriod": 50
    }
    
    # Extract parameters from BERT model
    try:
        # Check for environmental pressure flow
        for interaction in bert_model.get("interactions", []):
            if interaction.get("info", {}).get("name") == "Environmental Pressure Flow":
                for param in interaction.get("parameters", []):
                    param_name = param.get("name")
                    param_value = param.get("value")
                    
                    if param_name == "targetMin":
                        params["targetMin"] = float(param_value)
                    elif param_name == "targetMax":
                        params["targetMax"] = float(param_value)
                    elif param_name == "targetPeriod":
                        params["targetPeriod"] = int(param_value)
                    elif param_name == "environmentPattern":
                        params["environmentPattern"] = param_value.lower()
                    elif param_name == "environmentDynamics":
                        params["environmentDynamics"] = param_value.lower()
            
            # Check for genetic variation flow
            elif interaction.get("info", {}).get("name") == "Genetic Variation Flow":
                for param in interaction.get("parameters", []):
                    param_name = param.get("name")
                    param_value = param.get("value")
                    
                    if param_name == "mutationRate":
                        params["mutationRate"] = float(param_value)
                    elif param_name == "mutationRange":
                        params["mutationRange"] = float(param_value)
                    elif param_name == "initialVariation":
                        params["initialVariation"] = float(param_value)
                    elif param_name == "numLocii":
                        params["numLocii"] = int(param_value)
            
            # Check for reproduction output flow
            elif interaction.get("info", {}).get("name") == "Reproduction Output Flow":
                for param in interaction.get("parameters", []):
                    param_name = param.get("name")
                    param_value = param.get("value")
                    
                    if param_name == "maxOffspring":
                        params["maxOffspring"] = int(param_value)
                    elif param_name == "populationSoftCap":
                        params["populationSoftCap"] = int(param_value)
            
            # Check for mortality flow
            elif interaction.get("info", {}).get("name") == "Mortality Flow":
                for param in interaction.get("parameters", []):
                    param_name = param.get("name")
                    param_value = param.get("value")
                    
                    if param_name == "deathChancePerGeneration":
                        params["deathChancePerGeneration"] = float(param_value)
            
            # Check for data collection flow
            elif interaction.get("info", {}).get("name") == "Data Collection Flow":
                for param in interaction.get("parameters", []):
                    param_name = param.get("name")
                    param_value = param.get("value")
                    
                    if param_name == "reportingPeriod":
                        params["reportingPeriod"] = int(param_value)
    
    except Exception as e:
        print(f"Error extracting parameters: {e}", file=sys.stderr)
    
    return params


def generate_js_config(params: Dict[str, Any]) -> str:
    """Generate JavaScript configuration from parameters."""
    js_config = """// Generated by BERT to Simulation Connector
var PARAMS = {
"""
    
    for key, value in params.items():
        if isinstance(value, str):
            js_config += f"    {key}: \"{value}\",\n"
        else:
            js_config += f"    {key}: {value},\n"
    
    js_config += "};\n\n"
    js_config += """// Apply parameters to the simulation
function loadParameters() {
    // This function will be called when the simulation is reset
    Object.keys(PARAMS).forEach(function(key) {
        var element = document.getElementById(key);
        if (element) {
            if (element.type === "checkbox") {
                element.checked = PARAMS[key];
            } else if (element.tagName === "SELECT") {
                element.value = PARAMS[key];
            } else {
                element.value = PARAMS[key];
            }
        }
    });
}

// Load parameters on startup
document.addEventListener("DOMContentLoaded", loadParameters);
"""
    
    return js_config


def write_js_config(js_config: str, output_path: str) -> None:
    """Write JavaScript configuration to file."""
    try:
        with open(output_path, "w") as f:
            f.write(js_config)
        print(f"Successfully wrote configuration to {output_path}")
    except Exception as e:
        print(f"Error writing configuration: {e}", file=sys.stderr)
        sys.exit(1)


def main() -> None:
    """Main function."""
    args = parse_args()
    
    print(f"Loading BERT model from {args.input}...")
    bert_model = load_bert_model(args.input)
    
    print("Extracting parameters...")
    params = extract_parameters(bert_model)
    
    if args.verbose:
        print("Extracted parameters:")
        for key, value in params.items():
            print(f"  {key}: {value}")
    
    print("Generating JavaScript configuration...")
    js_config = generate_js_config(params)
    
    print(f"Writing configuration to {args.output}...")
    write_js_config(js_config, args.output)
    
    print("Done!")


if __name__ == "__main__":
    main()