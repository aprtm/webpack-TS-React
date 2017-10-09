import * as React from 'react';
import { List } from './list';

import { Card as CardType, TaskCallbacks } from '../../typings/custom';

// interface KanbanBoardProps {
//     apiUrl: string;
//     apiHeaders: {};
// }
interface KanbanBoardProps {
    cards: CardType[];
    taskCallbacks:TaskCallbacks;
}
// interface KanbanBoardState {
//     cards: CardType[];
// }

export class KanbanBoard extends React.Component<KanbanBoardProps> {
    constructor(){
        super();
        this.state = {
            cards:[]
        }
    }
    componentDidMount(){
        console.log('Just Mounted!');
    }
    render() {
        return(
            <div className="app">
                <List
                    id="todo"
                    title="To Do"
                    taskCallbacks={this.props.taskCallbacks}
                    cards={this.props.cards.filter((card) => card.status === 'todo')}
                />

                <List   
                    id="in-progress"
                    title="In Progress"
                    taskCallbacks={this.props.taskCallbacks}
                    cards={this.props.cards.filter((card) => card.status === 'in-progress')}
                />

                <List
                    id="done"
                    title="Done"
                    taskCallbacks={this.props.taskCallbacks}
                    cards={this.props.cards.filter((card) => card.status === 'done')}
                />
            </div>
        );
    }
}