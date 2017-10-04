import * as React from 'react';
import { List } from './list';

import { Card as CardType } from '../typings/custom';

interface KanbanBoardProps {
    cards: CardType[];
}

export class KanbanBoard extends React.Component<KanbanBoardProps> {
    render() {
        return(
            <div className="app">
                <List
                    id="todo"
                    title="To Do" 
                    cards={this.props.cards.filter((card) => card.status === 'todo')}
                />

                <List   
                    id="in-progress"
                    title="In Progress"
                    cards={this.props.cards.filter((card) => card.status === 'in-progress')}
                />

                <List
                    id="done"
                    title="Done"
                    cards={this.props.cards.filter((card) => card.status === 'done')}
                />
            </div>
        );
    }
}