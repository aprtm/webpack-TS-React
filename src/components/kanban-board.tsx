import * as React from 'react';
import List from './list';
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

import { Card as CardType, TaskCallbacks, CardCallbacks } from '../../typings/custom';

// interface KanbanBoardProps {
//     apiUrl: string;
//     apiHeaders: {};
// }
interface KanbanBoardProps {
    cards: CardType[];
    taskCallbacks:TaskCallbacks;
    cardCallbacks:CardCallbacks;
}
// interface KanbanBoardState {
//     cards: CardType[];
// }

class KanbanBoard extends React.Component<KanbanBoardProps> {
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
                    cardCallbacks={this.props.cardCallbacks}
                    cards={this.props.cards.filter((card) => card.status === 'todo')}
                />

                <List   
                    id="in-progress"
                    title="In Progress"
                    taskCallbacks={this.props.taskCallbacks}
                    cardCallbacks={this.props.cardCallbacks}
                    cards={this.props.cards.filter((card) => card.status === 'in-progress')}
                />

                <List
                    id="done"
                    title="Done"
                    taskCallbacks={this.props.taskCallbacks}
                    cardCallbacks={this.props.cardCallbacks}
                    cards={this.props.cards.filter((card) => card.status === 'done')}
                />
            </div>
        );
    }
}

export default DragDropContext(HTML5Backend)(KanbanBoard);