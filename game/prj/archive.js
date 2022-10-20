2022/10/19
switch(typeOfMe){
    case "R" :
        if(typeOfItem=='P')
            this.#isHitBtwRap = true;
        else if(typeOfItem =='B')
            this.#isHitBtwRaB = true;
        break;
        
    case "P" :
        if(typeOfItem == 'R')
            this.#isHitBtwRaP = true;
        else if(typeOfItem == 'D')
            this.#isHitBtwDaP = true;
        break;
    
    case "D" :
        if(typeOfItem == 'P') 
            this.#isHitBtwDaP = true;
        else if(typeOfItem == 'B')
            this.#isHitBtwDaB = true;
        break;
        
    case "B" :
        if(typeOfItem == 'R')
            this.#isHitBtwRaB = true;
        else if(typeOfItem == 'D')
            this.#isHitBtwDaB = true;
        break;

        