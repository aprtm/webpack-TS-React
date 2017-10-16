import * as React from 'react';
import { CheckList } from './checklist';
import { Link } from 'react-router-dom';
import { DragSource, DropTarget } from 'react-dnd';
import constants from '../utils/constants';
// import marked from 'marked'; 
import { CSSTransitionGroup } from 'react-transition-group';

import { Card as CardType, TaskCallbacks, CardCallbacks } from '../../typings/custom';

interface InjectedCardProps{
    connectDragSource: __ReactDnd.ConnectDragSource;
    connectDropTarget: __ReactDnd.ConnectDropTarget;
}
interface CardProps {
    card: CardType;
    taskCallbacks: TaskCallbacks;
    cardCallbacks: CardCallbacks;
}
interface CardState {
    showDetails: boolean;
}

const cardDragSpec = {
    beginDrag(props:CardProps){
        return{
            id: props.card.id,
            status: props.card.status
        }
    },
    endDrag(props:CardProps){
        props.cardCallbacks.persistCardDrag(props.card.id, props.card.status);
    }
};

const cardDropSpec = {
    hover(props:CardProps, monitor:__ReactDnd.DropTargetMonitor){
        const draggedId = (monitor.getItem()as CardType).id
        props.cardCallbacks.updatePosition(draggedId, props.card.id);
    }
};

let collectDrag:__ReactDnd.DragSourceCollector = (connect, _monitor)=>{
    return {
        connectDragSource: connect.dragSource()
    }
}

let collectDrop:__ReactDnd.DropTargetCollector = (connect, _monitor) => {
    return {
        connectDropTarget: connect.dropTarget()
    };
}

class Card extends React.Component<CardProps&InjectedCardProps, CardState> {
    constructor(){
        super();
        this.state = {
            showDetails: false
        };
    }

    toggleDetails(){
        this.setState( {showDetails: !this.state.showDetails} )
    }

    render() {
        const { connectDragSource, connectDropTarget } = this.props;
        let cardDetails;

        if( this.state.showDetails ){
            cardDetails = (
                <div className="card_details">
                    {this.props.card.description}
                    <CheckList
                        cardId={this.props.card.id}
                        tasks={this.props.card.tasks}
                        taskCallbacks={this.props.taskCallbacks}
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

        return connectDropTarget(connectDragSource(
            <div className="card">
                <div style={sideColor} />
                <div className="card_edit"><Link to={'/edit/'+this.props.card.id}>&#9998;</Link></div>
                <div 
                    className={
                        this.state.showDetails? 
                            "card_title card_title--is-open":
                            "card_title"
                    }
                    onClick={this.toggleDetails.bind(this)}>
                    {this.props.card.title}
                </div>

                <   CSSTransitionGroup
                    transitionName="toggle"
                    transitionEnterTimeout={250}
                    transitionLeaveTimeout={250}    >
                    {cardDetails}
                </CSSTransitionGroup>

            </div>
        ));
    }
}

const dragHighOrderCard = DragSource(constants.CARD, cardDragSpec, collectDrag)(Card);
const dragDropHighOrderCard = DropTarget(constants.CARD, cardDropSpec, collectDrop)(dragHighOrderCard);

export default dragDropHighOrderCard;