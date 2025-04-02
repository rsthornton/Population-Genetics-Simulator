#!/usr/bin/env python3
"""
BERT to Population Genetics Simulator Connector
===============================================

This script converts BERT JSON model files to configuration parameters
for the Population Genetics Simulator.

Current Status: PROTOTYPE - Not fully implemented yet
"""

import argparse
import json
import os
import sys


class BertToSimConverter:
    """Converts BERT model JSON to simulation configuration."""
    
    def __init__(self, input_file, output_file):
        self.input_file = input_file
        self.output_file = output_file
        self.bert_model = None
        self.sim_config = {
            "PARAMS": {},
            "environment": {}
        }
        
    def load_bert_model(self):
        """Load the BERT model from JSON file."""
        try:
            with open(self.input_file, 'r') as f:
                self.bert_model = json.load(f)
            print(f"Loaded BERT model from {self.input_file}")
            return True
        except Exception as e:
            print(f"Error loading BERT model: {e}")
            return False
    
    def extract_parameters(self):
        """Extract parameters from the BERT model."""
        if not self.bert_model:
            print("No BERT model loaded. Call load_bert_model() first.")
            return False
            
        print("Extracting parameters from BERT model...")
        
        # Extract environmental parameters
        try:
            self._extract_environmental_parameters()
            self._extract_genetic_parameters()
            self._extract_population_parameters()
            self._extract_selection_parameters()
            self._extract_data_collection_parameters()
            return True
        except Exception as e:
            print(f"Error extracting parameters: {e}")
            return False
    
    def _extract_environmental_parameters(self):
        """Extract environmental parameters from flows."""
        # Find Environmental Pressure Flow
        for interaction in self.bert_model.get("interactions", []):
            if "Environmental Pressure" in interaction.get("info", {}).get("name", ""):
                for param in interaction.get("parameters", []):
                    if param.get("name") == "targetMin":
                        self.sim_config["PARAMS"]["targetMin"] = float(param.get("value", -35))
                    elif param.get("name") == "targetMax":
                        self.sim_config["PARAMS"]["targetMax"] = float(param.get("value", 35))
                    elif param.get("name") == "targetPeriod":
                        self.sim_config["PARAMS"]["targetPeriod"] = int(param.get("value", 1000))
                    elif param.get("name") == "environmentPattern":
                        self.sim_config["environment"]["environmentPattern"] = param.get("value", "Gradient")
                    elif param.get("name") == "environmentDynamics":
                        self.sim_config["environment"]["environmentDynamics"] = param.get("value", "Cyclic")
        
        print("Environmental parameters extracted")
    
    def _extract_genetic_parameters(self):
        """Extract genetic variation parameters."""
        # Find Genetic Variation Flow
        for interaction in self.bert_model.get("interactions", []):
            if "Genetic Variation" in interaction.get("info", {}).get("name", ""):
                for param in interaction.get("parameters", []):
                    if param.get("name") == "mutationRate":
                        self.sim_config["PARAMS"]["mutationRate"] = float(param.get("value", 0.05))
                    elif param.get("name") == "mutationRange":
                        self.sim_config["PARAMS"]["mutationRange"] = float(param.get("value", 0.025))
                    elif param.get("name") == "initialVariation":
                        self.sim_config["PARAMS"]["initialVariation"] = float(param.get("value", 1.0))
                    elif param.get("name") == "numLocii":
                        self.sim_config["PARAMS"]["numLocii"] = int(param.get("value", 100))
        
        print("Genetic parameters extracted")
    
    def _extract_population_parameters(self):
        """Extract population parameters."""
        # Default values
        self.sim_config["PARAMS"]["numOrganisms"] = 100
        
        # Find Reproduction Output Flow for reproduction parameters
        for interaction in self.bert_model.get("interactions", []):
            if "Reproduction" in interaction.get("info", {}).get("name", ""):
                for param in interaction.get("parameters", []):
                    if param.get("name") == "maxOffspring":
                        self.sim_config["PARAMS"]["maxOffspring"] = int(param.get("value", 5))
                    elif param.get("name") == "populationSoftCap":
                        self.sim_config["PARAMS"]["populationSoftCap"] = int(param.get("value", 100))
        
        # Find Mortality Flow
        for interaction in self.bert_model.get("interactions", []):
            if "Mortality" in interaction.get("info", {}).get("name", ""):
                for param in interaction.get("parameters", []):
                    if param.get("name") == "deathChancePerGeneration":
                        self.sim_config["PARAMS"]["deathChancePerGeneration"] = float(param.get("value", 0.2))
        
        print("Population parameters extracted")
    
    def _extract_selection_parameters(self):
        """Extract selection parameters."""
        # Default values first
        self.sim_config["PARAMS"]["targetVariance"] = 5.0
        self.sim_config["PARAMS"]["reproductionVariance"] = 2.0
        
        # Try to find in internal flows (especially in hub-and-spoke model)
        for interaction in self.bert_model.get("interactions", []):
            if "Selection Parameters" in interaction.get("info", {}).get("name", ""):
                for param in interaction.get("parameters", []):
                    if param.get("name") == "targetVariance":
                        self.sim_config["PARAMS"]["targetVariance"] = float(param.get("value", 5.0))
                    elif param.get("name") == "reproductionVariance":
                        self.sim_config["PARAMS"]["reproductionVariance"] = float(param.get("value", 2.0))
                        
        print("Selection parameters extracted")
    
    def _extract_data_collection_parameters(self):
        """Extract data collection parameters."""
        # Find Data Collection Flow
        for interaction in self.bert_model.get("interactions", []):
            if "Data Collection" in interaction.get("info", {}).get("name", ""):
                for param in interaction.get("parameters", []):
                    if param.get("name") == "reportingPeriod":
                        self.sim_config["PARAMS"]["reportingPeriod"] = int(param.get("value", 50))
        
        print("Data collection parameters extracted")
    
    def generate_config(self):
        """Generate the simulation configuration file."""
        if not self.sim_config:
            print("No simulation configuration generated.")
            return False
        
        try:
            # Create JavaScript configuration
            js_content = "// Configuration generated from BERT model\n"
            js_content += "// Source: " + os.path.basename(self.input_file) + "\n\n"
            
            # Generate PARAMS object
            js_content += "const PARAMS = {\n"
            for key, value in self.sim_config["PARAMS"].items():
                js_content += f"    {key}: {value},\n"
            js_content += "};\n\n"
            
            # Generate environment object
            js_content += "const environment = {\n"
            for key, value in self.sim_config["environment"].items():
                if isinstance(value, str):
                    js_content += f'    {key}: "{value}",\n'
                else:
                    js_content += f"    {key}: {value},\n"
            js_content += "};\n"
            
            # Write to output file
            with open(self.output_file, 'w') as f:
                f.write(js_content)
            
            print(f"Configuration written to {self.output_file}")
            return True
        except Exception as e:
            print(f"Error generating configuration: {e}")
            return False
    
    def convert(self):
        """Run the complete conversion process."""
        success = self.load_bert_model()
        if not success:
            return False
        
        success = self.extract_parameters()
        if not success:
            return False
        
        success = self.generate_config()
        return success


def main():
    """Main function to run from command line."""
    parser = argparse.ArgumentParser(description="Convert BERT JSON models to Population Genetics Simulator configuration.")
    parser.add_argument("--input", "-i", required=True, help="Input BERT JSON file")
    parser.add_argument("--output", "-o", required=True, help="Output JavaScript configuration file")
    
    args = parser.parse_args()
    
    converter = BertToSimConverter(args.input, args.output)
    success = converter.convert()
    
    if success:
        print("Conversion completed successfully!")
        return 0
    else:
        print("Conversion failed. Please check the errors above.")
        return 1


if __name__ == "__main__":
    sys.exit(main())