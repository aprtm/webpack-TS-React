import * as React from 'react';
import * as ReactRouter from 'react-router';

import { Card as CardType, CardCallbacks } from '../../typings/custom'
import CardForm from './card-form';

interface NewCardProps{
    cardCallbacks: CardCallbacks
}

class NewCard extends React.Component<NewCardProps&ReactRouter.RouteComponentProps<{}>>{
    componentWillMount(){
        this.setState({
            id: Date.now(),
            title:'',
            description:'',
            status:'todo',
            color:'#c9c9c9',
            tasks:[]
        });
    }

    handleChange(field:string, value:any){
        this.setState({
            [field]:value
        });
    }

    handleSubmit(e:Event){
        e.preventDefault();
        this.props.cardCallbacks.addCard(this.state);
        this.props.history.push('/', null);
    }

    handleClose(_e:Event){
        this.props.history.push('/', null);
    }
    
    render(){
        return (
            <CardForm
                draftCard={this.state as CardType}
                buttonLabel="Create Card"
                handleChange={this.handleChange.bind(this)}
                handleSubmit={this.handleSubmit.bind(this)}
                handleClose={this.handleClose.bind(this)}
            />
        );
    }
}

export default NewCard;