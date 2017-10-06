import * as React from 'react';



export class FocusText extends React.Component{
    handleClick(){
        //Explicitly focus the text input using the raw DOM API
        (this.refs.myTextInput as HTMLInputElement).focus();
    }

    render(){
        // The ref attribute adds a reference to the component to
        // this.refs when the component is mounted.
        return (
            <div>
                <input type="text" ref="myTextInput" />
                <input
                    type="button"
                    value="Focus the text input"
                    onClick={this.handleClick.bind(this)}
                />
            </div>
        )
    }
}