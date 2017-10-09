import * as React from 'react';
import * as update from 'immutability-helper';

import { KanbanBoard } from './kanban-board';

import { Card as CardType } from '../../typings/custom';

interface KanbanBoardContainerProps{
    apiUrl: string;
    apiHeaders: {}
}
interface KanbanBoardContainerState{
    cards: CardType[];
}

// const API_URL = 'http://kanbanapi.pro-react.com';
// const API_HEADERS = {
//   'Content-Type': 'application/json'
//   // 'Authorization': 'meh'
// }

export class KanbanBoardContainer extends React.Component <KanbanBoardContainerProps,KanbanBoardContainerState> {
    constructor(){
        super();
        this.state ={
            cards:[]
        }
    }

    componentDidMount(){
        fetch(this.props.apiUrl+'/cards', {headers: this.props.apiHeaders})
            .then( (res)=>res.json() )
            .then( (data)=>this.setState({cards:data}) )
            .catch( console.error );
    }

    addTask(cardId:number, taskName:string){
        // Keep a reference to the original stat prior to the mutations
        // in case you need to revert to the optimistic changes in the UI
        let prevState = this.state;

        //Find the index of the card
        let cardIndex = this.state.cards.findIndex( (card)=>card.id == cardId );

        // Create a new task with the given name and a temporary ID
        let newTask = {id:Date.now(), name:taskName, done:false};

        // Create a new object and push the new task to the array of tasks
        let nextState = update(this.state.cards, {
            [cardIndex]: {
                tasks: {$push: [newTask]}
            }
        });

        // Set the component state to the mutated object
        this.setState({cards:nextState});

        // Call the API to add the task on the server
        fetch(`${this.props.apiUrl}/cards/${cardId}/tasks`, {
            method: 'post',
            headers: this.props.apiHeaders,
            body: JSON.stringify(newTask)
        })
        .then( (res)=> {
            if( res.ok ){
                return res.json();
            }else{
                // Throw an error if server response wasn't 'ok'
                // so you can revert back the optimistic changes
                // made to the UI.
                throw new Error("Something went wrong with the server.")
            }
        })
        .then( (data)=> {
            
            // When the server returns the definitive ID
            // used for the new Task on the server, update it on React
            newTask.id = data.id;
            this.setState({cards:nextState});
        })
        .catch( ( err )=> {
            console.log('Request failed',err,'. No changes were made.');
            this.setState(prevState)
        });
    }

    deleteTask(cardId:number, taskId:string, taskIndex:number){        
        // Find the index of the card
        let cardIndex = this.state.cards.findIndex( (card:CardType)=>card.id == cardId );

        // Keep a reference to the original stat prior to the mutations
        // in case you need to revert to the optimistic changes in the UI
        let prevState = this.state;

        // Create a new object without the task
        let nextState = update( this.state.cards, { [cardIndex]:{
            tasks: {$splice:[[taskIndex,1]]}
        } });

        // set the component state to the mutated object
        this.setState({cards:nextState});

        // Call the API to remove the task on the server
        fetch(`${this.props.apiUrl}/cards/${cardId}/tasks/${taskId}`, {
            method: 'delete',
            headers: this.props.apiHeaders
        })
        .then( (res)=>{
            if( !res.ok ){
                // Throw an error if server response wasn't 'ok'
                // so you can revert back the optimistic changes
                // made to the UI.
                throw new Error("Server response was not OK");
            }
        } )
        .catch( (err)=>{
            console.error('Could not complete request. ',err);
            this.setState(prevState);
        } );
    }

    toggleTask(cardId:number, taskId:string, taskIndex:number){
        // Keep a reference to the original state prior to the mutations 
        // in case you need to revert the optimistic changes in the UI
        let prevState = this.state;

        //Find the index of the card
        let cardIndex = this.state.cards.findIndex( (card)=>card.id == cardId);

        //Save a reference to the task's 'done' value
        let newDoneValue:boolean = false;

        // Using $apply command, change the done value to its opposite
        let nextState = update( this.state.cards, { 
            [cardIndex]:{
                tasks: {
                    [taskIndex]: {
                        done: { $apply: (done:boolean)=>{
                          newDoneValue = !done;
                          return newDoneValue;  
                        } }
                    }
                } 
            } 
        });

        // set the component state to the mutated object
        this.setState({cards:nextState});

        // Call the API to toggle the task on the server
        fetch(`${this.props.apiUrl}/cards/${cardId}/tasks/${taskId}`, {
            method: 'put',
            headers: this.props.apiHeaders,
            body: JSON.stringify({done: newDoneValue})
        })
        .then( (res)=> {
            if( !res.ok ){
                // Throw an error if server response wasn't 'ok'
                // so you can revert back the optimistic changes
                // made to the UI.
                throw new Error('Server response not cool.')
            }
        })
        .catch( (err)=> {
            console.error('Could not complete request. ',err);
            this.setState(prevState);
        });
    }

    render(){
        return (
            <KanbanBoard
                cards={this.state.cards}
                taskCallbacks={ 
                    {
                        toggle: this.toggleTask.bind(this),
                        delete: this.deleteTask.bind(this),
                        add: this.addTask.bind(this )
                    }
                }
            />
        );
    }
}