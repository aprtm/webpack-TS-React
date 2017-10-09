import * as React from 'react';
import { Card } from './card';

import { Card as CardType, TaskCallbacks } from '../../typings/custom';

interface ListProps {
    id: string;
    title: string;
    cards: CardType[];
    taskCallbacks:TaskCallbacks
}

export class List extends React.Component<ListProps> {
    render() {
        var cards = this.props.cards.map( (card) => {
            return (
                <Card
                    key={card.id}
                    taskCallbacks={this.props.taskCallbacks}
                    card={card}
                />
            );
        });

        return (
            <div className="list">
                <h1>{this.props.title}</h1>
                {cards}
            </div>
        );
    }
}