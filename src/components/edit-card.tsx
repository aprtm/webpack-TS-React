import * as React from 'react';
import * as ReactRouter from 'react-router-dom';

import { Card as CardType, CardCallbacks, RouterMatchProps } from '../../typings/custom';
import CardForm from './card-form';

interface EditCardProps{
    cards: CardType[];
    cardCallbacks: CardCallbacks;
}

class EditCard extends React.Component<EditCardProps&ReactRouter.RouteComponentProps<RouterMatchProps>>{
    componentWillMount(){
        let card = this.props.cards.find( (card)=>card.id == this.props.match.params.card_id )
        this.setState({...card});
    }

    handleChange(field:string, value:any){
        this.setState({
            [field]:value
        });
    }

    handleSubmit(e:Event){
        e.preventDefault();
        this.props.cardCallbacks.updateCard(this.state);
        this.props.history.push('/', null);
    }

    handleClose(_e:Event){
        this.props.history.push('/', null);
    }
    
    render(){
        return (
            <CardForm
                draftCard={this.state as CardType}
                buttonLabel="Edit Card"
                handleChange={this.handleChange.bind(this)}
                handleSubmit={this.handleSubmit.bind(this)}
                handleClose={this.handleClose.bind(this)}
            />
        );
    }
}

export default EditCard;