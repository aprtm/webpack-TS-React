import * as React from 'react';
import { Card } from './card';

import { Card as CardType } from '../../typings/custom';

interface ListProps {
    id: string;
    title: string;
    cards: CardType[];
}

export class List extends React.Component<ListProps> {
    render() {
        var cards = this.props.cards.map( (card) => {
            return (
                <Card key={card.id} card={card} />
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