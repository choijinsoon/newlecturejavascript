class ItemContext{
    constructor(){
        this.#items = [];
    }
    get items(){
        return this.#items;
    }
    
    #items;
}

export default new ItemContext();



