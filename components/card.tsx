import * as React from 'react';
import { CheckList } from './checklist';

import { Card as CardType } from '../typings/custom';

interface CardProps {
    card: CardType;
}
interface CardState {
    showDetails: boolean;
}

export class Card extends React.Component<CardProps, CardState> {
    constructor(args:any[]){
        super(...args);
        this.state = {
            showDetails: false
        };
    }

    toggleDetails(){
        this.setState( {showDetails: !this.state.showDetails} )
    }

    render() {

        let cardDetails;

        if( this.state.showDetails ){
            cardDetails = (
                <div className="card_details">
                    {this.props.card.description}
                    <CheckList
                        cardId={this.props.card.id}
                        tasks={this.props.card.tasks}
                    />
                </div>
            );
        }

        let sideColor:React.CSSProperties = {
            position: 'absolute',
            zIndex: -1,
            top: 0,
            bottom: 0,
            left: 0,
            width: 7,
            backgroundColor: this.props.card.color
        };

        return (
            <div className="card">
                <div style={sideColor} />
                <div 
                    className={
                        this.state.showDetails? 
                            "card_title card_title--is-open":
                            "card_title"
                    }
                    onClick={this.toggleDetails.bind(this)}>
                    {this.props.card.title}
                </div>

                {cardDetails}
            </div>
        );
    }
}