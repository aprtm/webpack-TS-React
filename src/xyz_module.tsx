import * as React from 'react';

interface ReactivityProps{
    name:string
}

export class Reactivity extends React.Component<ReactivityProps,{}>{
    render(){
        return(
            <div>I am a tsx component, my name is {this.props.name}</div>
        );
    }
}