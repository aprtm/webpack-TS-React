import * as React from 'react';
import { Task } from '../../typings/custom';

interface CheckListProps {
    cardId: number;
    tasks: Task[];
}

export class CheckList extends React.Component<CheckListProps> {
    
    render() {
        let tasks = this.props.tasks.map( (task: Task) => {
            return (
                <li key={task.id} className="checklist-task">
                    <input type="checkbox" defaultChecked={task.done} />
                    {task.name}
                    <a href="#" className="checklist_task--remove" />
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
                />
            </div>
        );
    }
}