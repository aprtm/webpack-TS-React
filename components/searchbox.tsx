import * as React from 'react';

interface SearchState {
    searchTerm: string;
}

export class Search extends React.Component<any,SearchState> {
    constructor(){
        super();
        this.state = {
            searchTerm: 'React'
        };
    }

    handleChange( event:React.ChangeEvent<HTMLInputElement> ){
        this.setState({searchTerm: event.target.value});
    }

    render() {
        return (
            <div>
                Search Term: 
                <input  type="search"
                        value={this.state.searchTerm}
                        onChange={this.handleChange.bind(this)}
                />
            </div>
        );
    }
}