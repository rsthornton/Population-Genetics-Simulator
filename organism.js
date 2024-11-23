class Organism {
    constructor(other) {
        this.genes = [];
        for(let i = 0; i < PARAMS.numLocii; i++) {
            this.genes.push(new RealGene(other?.genes[i]));
        }
        this.genotype = this.updatePhenotype();
        this.phenotype = this.genotype;
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
    
    adapt(target) {
        let sign = Math.sign(target - this.phenotype);

        let step = sign*generateNormalSample(PARAMS.adaptiveStepSize, PARAMS.adaptiveStepSize);

        this.phenotype += step;
    }

    update() {
        
    }

    draw(ctx) {
       
    }
}