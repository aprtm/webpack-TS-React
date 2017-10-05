import * as React from 'react';

interface RandomWordsState{
    boxText: string;
}

export class RandomWords extends React.Component<any, RandomWordsState>{

    constructor(){
        super()
        this.state = {
            boxText: ''
        };
    }

    addText( str:string ){
        this.setState({
            boxText: str
        });
    }

    changeHandler( ev:React.ChangeEvent<HTMLTextAreaElement>){
        console.log('change handler context:', this);
        this.addText(ev.target.value);
    }

    render(){
        let printBoxStyle = {
            border: 'solid 1px red'
        };
        return(
            <div>
                <textarea onChange={this.changeHandler.bind(this)}></textarea>
                <div style={printBoxStyle} >
                    {this.state.boxText || 'Placeholder text'}
                </div>
            </div>
        );
    }
}