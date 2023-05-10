type StateOperator = "=" | "+" |  "-" | "*" | "push" | "pushFront" | "append" | "delete" 
export class StateManager { 
    state:{[key:string]: any}
    constructor(){
        this.state = {}
    }
    has(key:string){
        return (this.state[key] !== null && this.state[key] !== undefined)
    }
    get(key:string){
        if(!this.has(key)){
            return { error: `State "${key}" does not exist`}
        } else {
            return this.state[key]
        }
    }
    /**
     * 
     * @param key 
     * @param {Promise<any>} promise the promise to resolve and apply to state[key] 
     * @param {StateOperator|undefined}operator 
     */
    async setAsync(key:string, promise:Promise<any>, operator:StateOperator="="){
        try {
            const value = await promise;
            const typeA = typeof this.state[key]
            const typeB = typeof value
            switch(operator){
                case "=": {
                    if(this.has(key)){
                        console.warn(`Overwriting entry at "${key}"`)
                    }
                    this.state[key] = value
                    return {success: true}
                }
                case "+": { 
                    if( this.state[key] instanceof Array){
                        return {error: "Cannot use + operator on an array. Please use push or shift instead"}
                    }
                    if( typeA != typeB ){
                        return {error: `State at "${key}" expected "${typeA}" but recieved "${typeB}"`}
                    }
                    this.state[key] += value
                    return {success:true}
                }
                case "*" :{
                    if( this.state[key] instanceof Array){
                        return {error: `Cannot use "*" operator on an array. Please use push or shift instead`}
                    }
                    if(typeA != typeB){
                        return {error: `State at "${key}" expected "${typeA}" but recieved "${typeB}"`}
                    }
                    
                    //check if can perform mult
                    if( typeA != "number" || typeB !="number"){
                        return {error: `Expected a number on state operation "-" but recieved ${typeB}`}
                    }
                    this.state[key] = this.state[key] * value
                    return { success: true}
                }
                case "-" :{
                    if( this.state[key] instanceof Array){
                        return {error: `Cannot use "*" operator on an array. Please use push or shift instead`}
                    }
                    if(typeA != typeB){
                        return {error: `State at "${key}" expected "${typeA}" but recieved "${typeB}"`}
                    }
                    
                    //check if can perform subtraction
                    if( typeA != "number" || typeB !="number"){
                        return {error: `Expected a number on state operation "-" but recieved ${typeB}`}
                    }


                    this.state[key] = this.state[key] - value
                    return { success: true}
                }
                case "push": {
                    if(!(this.state[key] instanceof Array)){
                        return { error: "Can only push to instance of Array"}
                    }
                    this.state[key].push(value)
                    return { success: true}
                }
                case "append": {
                    if(typeof this.state[key] != "object"){
                        return { error: "Can only append to object types"}
                    }
                    if(typeof value != "object"){
                        return { error: "Can only append objects to other objects"}
                    }
                    for(let kv in value){
                        this.state[key][kv] = value[kv]
                    }
                    return { success: true}
                }
                case "delete": {
                    if(typeof this.state[key] != "object"){
                        return { error: "Can only delete from object types"}
                    }
                    if(!(value instanceof Array) ){
                        return { error: "Must provide an array of keys to delete"}
                    }
                    
                    if(value.length == 0){
                        delete this.state[key]
                    } else { 
                        for(let dk of value){
                            if(!!this.state[key][dk]){
                                delete this.state[key][dk]
                            }
                        }
                    }
                    return { success: true}
                }

                case "pushFront": { 
                    if(!(this.state[key] instanceof Array)){
                        return { error: "Can only push front to array instances"}
                    }
                    this.state[key].unshift(value)
                    return { success: true}
                }

            }
        } catch(e){
            console.error(e)
            return { error: e}
        }

    }

    /**
     * 
     * @param key 
     * @param value 
     * @param {StateOperator|undefined}operator 
     */
    set(key:string,value:any, operator:StateOperator="="){
        const typeA = typeof this.state[key]
        const typeB = typeof value
        switch(operator){
            case "=": {
                if(this.has(key)){
                    console.warn(`Overwriting entry at "${key}"`)
                }
                this.state[key] = value
                return {success: true}
            }
            case "+": { 
                if( this.state[key] instanceof Array){
                    return {error: "Cannot use + operator on an array. Please use push or shift instead"}
                }
                if( typeA != typeB ){
                    return {error: `State at "${key}" expected "${typeA}" but recieved "${typeB}"`}
                }
                this.state[key] += value
                return {success:true}
            }
            case "*" :{
                if( this.state[key] instanceof Array){
                    return {error: `Cannot use "*" operator on an array. Please use push or shift instead`}
                }
                if(typeA != typeB){
                    return {error: `State at "${key}" expected "${typeA}" but recieved "${typeB}"`}
                }
                
                //check if can perform mult
                if( typeA != "number" || typeB !="number"){
                    return {error: `Expected a number on state operation "-" but recieved ${typeB}`}
                }
                this.state[key] = this.state[key] * value
                return { success: true}
            }
            case "-" :{
                if( this.state[key] instanceof Array){
                    return {error: `Cannot use "*" operator on an array. Please use push or shift instead`}
                }
                if(typeA != typeB){
                    return {error: `State at "${key}" expected "${typeA}" but recieved "${typeB}"`}
                }
                
                //check if can perform subtraction
                if( typeA != "number" || typeB !="number"){
                    return {error: `Expected a number on state operation "-" but recieved ${typeB}`}
                }


                this.state[key] = this.state[key] - value
                return { success: true}
            }
            case "push": {
                if(!(this.state[key] instanceof Array)){
                    return { error: "Can only push to instance of Array"}
                }
                this.state[key].push(value)
                return { success: true}
            }
            case "append": {
                if(typeof this.state[key] != "object"){
                    return { error: "Can only append to object types"}
                }
                if(typeof value != "object"){
                    return { error: "Can only append objects to other objects"}
                }
                for(let kv in value){
                    this.state[key][kv] = value[kv]
                }
                return { success: true}
            }
            case "delete": {
                if(typeof this.state[key] != "object"){
                    return { error: "Can only delete from object types"}
                }
                if(!(value instanceof Array) ){
                    return { error: "Must provide an array of keys to delete"}
                }
                
                if(value.length == 0){
                    delete this.state[key]
                } else { 
                    for(let dk of value){
                        if(!!this.state[key][dk]){
                            delete this.state[key][dk]
                        }
                    }
                }
                return { success: true}
            }

            case "pushFront": { 
                if(!(this.state[key] instanceof Array)){
                    return { error: "Can only push front to array instances"}
                }
                this.state[key].unshift(value)
                return { success: true}
            }

        }
    }

    purge(key:string){
        if(this.has(key)){
            delete this.state[key]
        }
    }


    _DEBUG_DUMP(){
        const HR = Array(10).fill("-").join("-")
        for(let key in this.state){
            let value = this.state[key]
            let t = typeof value
            console.log(`\n${HR}\nKEY = "${key} \nvalue<${t}> = ${JSON.stringify(value,null,4)}\n${HR}\n`)
        }
    }
}

const state = new StateManager()
export default state