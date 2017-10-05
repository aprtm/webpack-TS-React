import * as React from 'react';

interface SelectionState {
    you: string;
}

export class Selection extends React.Component<any, SelectionState> {
    
    constructor(){
        super()
        this.state = {
            you: 'nothing'
        }
    }

    youChangeHandler( ev:React.ChangeEvent<HTMLSelectElement> ){

        console.log('Option selected', this);

        const being:{[key:string]:string} = {
            first:'awesome',
            second:'cool',
            third:'incredible',
            fourth:'amazing',
        };

        this.setState({
            you: being[ev.target.value]
        })
    }

    render() {
        return (
            <div>
                <div>Right now you are {this.state.you}!</div>
                <select defaultValue="nothing" onChange={(ev)=>this.youChangeHandler(ev)}>
                    <option disabled value="nothing">What are you?</option>
                    <option value="first">I am awesome</option>
                    <option value="second">I am cool</option>
                    <option value="third">I am incredible</option>
                    <option value="fourth">I am amazing</option>
                </select>
            </div>
        );
    }
}