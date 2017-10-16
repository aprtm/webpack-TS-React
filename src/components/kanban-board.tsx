import * as React from 'react';
import * as ReactRouter from 'react-router';
import { Route, Link } from 'react-router-dom'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

import List from './list';
import EditCard from './edit-card';
import NewCard from './new-card';

import { Card as CardType, TaskCallbacks, CardCallbacks, RouterMatchProps } from '../../typings/custom';

interface KanbanBoardProps {
    cards: CardType[];
    taskCallbacks:TaskCallbacks;
    cardCallbacks:CardCallbacks;
}

class KanbanBoard extends React.Component<KanbanBoardProps> {
    constructor(){
        super();
        this.state = {
            cards:[]
        }
    }
    render() {
        return(
            <Route render={ ()=>{
                return <div className="app">
                        <Link to="/new" className="float-button">+</Link>
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

                        <Route path="/new" render={
                            (props:ReactRouter.RouteComponentProps<{}>)=>{
                                return <NewCard {...props}
                                            cardCallbacks={this.props.cardCallbacks}
                                        />
                        }}/>
                        
                        <Route path="/edit/:card_id" render={ 
                            (props:ReactRouter.RouteComponentProps<RouterMatchProps>)=>{
                                return <EditCard {...props}
                                            cardCallbacks={this.props.cardCallbacks}
                                            cards={this.props.cards}
                                        />
                        }}/>
                    </div>
            }}/>
        );
    }
}

export default DragDropContext(HTML5Backend)(KanbanBoard);

/*
*/