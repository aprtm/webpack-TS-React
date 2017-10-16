import * as React from 'react';
import { Card as CardType } from '../../typings/custom'

interface CardFormProps{
    draftCard: CardType;
    buttonLabel: string;
    handleChange: Function;
    handleClose: Function;
    handleSubmit: Function;
}

class CardForm extends React.Component<CardFormProps>{
 handleChange(field:string, e:Event){
     let target = e.target as HTMLInputElement
    this.props.handleChange(field, target.value);
 }

 handleClose(e:Event){
    e.preventDefault();
    this.props.handleClose()
 }

 render(){
    return (
        <div>
            <div className="card big">
                <form onSubmit={this.props.handleSubmit.bind(this)}>
                    <input
                        type="text"
                        onChange={this.handleChange.bind(this, 'title')}
                        placeholder="Title"
                        required={true}
                        autoFocus={true}
                    />
                    <textarea
                        value={this.props.draftCard.description}
                        onChange={this.handleChange.bind(this, 'description')}
                        placeholder="Description"
                        required={true}
                    />
                    <label htmlFor="status">Status</label>
                    <select
                        id="status"
                        value={this.props.draftCard.status}
                        onChange={this.handleChange.bind(this,'status')}
                    >
                        <option value="todo">To Do</option>
                        <option value="in-progress">In Progress</option>
                        <option value="done">Done</option>
                    </select>
                    <br/>
                    <label htmlFor="color">Color</label>
                    <input
                        id="color"
                        value={this.props.draftCard.color || "#ff0000"}
                        onChange={this.handleChange.bind(this, 'color')}
                        type="color"
                    />
                    <div className="actions">
                        <button type="submit">{this.props.buttonLabel}</button>
                    </div>
                </form>
            </div>
            <div className="overlay" onClick={this.handleClose.bind(this)}>

            </div>
        </div>
    );
 }

}

export default CardForm;