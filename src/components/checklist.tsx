import 'babel-polyfill';
import * as React from 'react';
import { Task } from '../../typings/custom';

import { TaskCallbacks } from '../../typings/custom';

interface CheckListProps {
    cardId: number;
    tasks: Task[];
    taskCallbacks:TaskCallbacks
}

export class CheckList extends React.Component<CheckListProps> {
    checkInputKeyPress(ev:React.KeyboardEvent<HTMLInputElement>){
        let target = ev.target as HTMLInputElement;
        if( ev.key === 'Enter' ){
            this.props.taskCallbacks.add(this.props.cardId, target.value);
            target.value = '';
        }
    }

    render() {
        let tasks = this.props.tasks.map( (task: Task, taskIndex:number) => {
            return (
                <li key={task.id} className="checklist_task">
                    <input
                        type="checkbox"
                        checked={task.done}
                        onChange={
                            this.props.taskCallbacks.toggle.bind(null, this.props.cardId, task.id, taskIndex)
                        }
                    />
                    {task.name}{' '}
                    <a  href="#"
                        className="checklist_task--remove"
                        onClick={this.props.taskCallbacks.delete
                            .bind(null, this.props.cardId, task.id, taskIndex)}
                    />
                </li>
            );
        });

        return (
            <div className="checklist">
                <ul>{tasks}</ul>
                <input
                    type="text"
                    className="checklist--add-task"
                    placeholder="Type then hit Enter to add a task"
                    onKeyPress={this.checkInputKeyPress.bind(this)}
                />
            </div>
        );
    }
}