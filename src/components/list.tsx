import * as React from 'react';
import { DropTarget } from 'react-dnd'

import constants from '../utils/constants';
import Card from './card';

import { Card as CardType, TaskCallbacks, CardCallbacks } from '../../typings/custom';

interface InjectedListProps{
    connectDropTarget: __ReactDnd.ConnectDropTarget;
}
interface ListProps {
    id: string;
    title: string;
    cards: CardType[];
    taskCallbacks:TaskCallbacks;
    cardCallbacks:CardCallbacks
}

const listTargetSpec = {
    hover(props:ListProps, monitor:__ReactDnd.DropTargetMonitor){
        const draggedId = (monitor.getItem() as CardType).id;
        props.cardCallbacks.updateStatus(draggedId, props.id)
    }
}
function collect(connect:__ReactDnd.DropTargetConnector, _monitor:__ReactDnd.DropTargetMonitor){
    return {
        connectDropTarget: connect.dropTarget()
    };
}

class List extends React.Component<ListProps&InjectedListProps> {
    render() {
        const { connectDropTarget } = this.props;
        var cards = this.props.cards.map( (card) => {
            return (
                <Card
                    key={card.id}
                    taskCallbacks={this.props.taskCallbacks}
                    cardCallbacks={this.props.cardCallbacks}
                    card={card}
                />
            );
        });

        return connectDropTarget(
            <div className="list">
                <h1>{this.props.title}</h1>
                {cards}
            </div>
        );
    }
}

export default DropTarget(constants.CARD, listTargetSpec, collect)(List);