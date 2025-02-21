
import Validators from "@/utils/validators.utilty.js"

export default {
    props:{
        validators:{
            type:[Array,String],
            default:null,
        },
    },
    methods:{
        Validate( model ){
            if(!this.validators) return;
            if(!typeof(this.validators)==='string' && 
               !Array.isArray(this.validators) ) return;
            if(!model && !model===0) return;

            let validators = this.validators
            const novalidator = ()=>true
            if(typeof(validators)==='string') validators = validators.split(/\s+/)

            validators = validators.map(validator=>{
                if(typeof(validator)==='function') return validator
                if(typeof(validator)==='string') return (Validators[validator] || novalidator);
                return novalidator
            })

            for(let v of validators){
                const result = v(this.model)
                if(typeof(result)==='string') {
                    return result;
                }
            }
            return null
        },
    }

}