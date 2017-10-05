import * as React from 'react';

interface UncontrolledForm extends EventTarget{
    name:HTMLInputElement;
    email:HTMLInputElement;
}

export class NoControl extends React.Component<any,any>{

    handleSubmit( ev:React.FormEvent<HTMLFormElement> ){
        const target = ev.target as UncontrolledForm;
        console.log('Submitted values are:', target.name.value, target.email.value)
        ev.preventDefault();
    }

    render(){
        return (
            <form onSubmit={(ev)=>this.handleSubmit(ev)}>
                <div className="formGroup">
                    Name: <input name="name" type="text" />
                </div>
                <div className="formGroup">
                    E-mail: <input name="email" type="email" />
                </div>
                <button type="submit">Submit</button>
            </form>
        );
    }
}