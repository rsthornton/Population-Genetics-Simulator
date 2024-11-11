class Organism {
    constructor(other) {
        this.genes = [];
        for(let i = 0; i < PARAMS.numLocii; i++) {
            this.genes.push(new RealGene(other?.genes[i]));
        }
        this.phenotype = this.updatePhenotype();
    }

    updatePhenotype() {
        let sum = 0;
        for(let i = 0; i < PARAMS.numLocii; i++) {
            sum += this.genes[i].value;
        }
        return sum;
    }

    mutate() {
        for(let i = 0; i < PARAMS.numLocii; i++) {
            if(Math.random() < PARAMS.mutationRate) this.genes[i].mutate();
        }
    }
    
    update() {
        
    }

    draw(ctx) {
       
    }
}