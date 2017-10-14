export const throttle = (func:()=>any, wait?:number) => {
    let context, args:IArguments, prevArgs:IArguments, argsChanged:boolean, result;
    let previous = 0;
    return function (this:object){
        let now:number=0, remaining:number=0;
        if( wait ){
            now = Date.now();
            remaining = wait - (now - previous);
        }
        context = this;
        args = arguments;
        argsChanged = JSON.stringify(args) != JSON.stringify(prevArgs);
        prevArgs = {...args};
        if( argsChanged || wait && (remaining <= 0 || remaining > wait) ){
            if( wait ){
                previous = now;
            }
            result = func.apply(context, args);
            context = null;
            args = (function(){return arguments})();
            return result;
        }
    }
}