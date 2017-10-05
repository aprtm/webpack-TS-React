import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { KanbanBoard } from '../components/kanban-board';
import { Search } from '../components/searchbox';

import greeting from "./abc_module";
//import {Reactivity} from "./xyz_module";

console.log(greeting);

let cardsList = [
  {
    id: 1,
    title: 'Read the Book',
    description: 'I should read the whole book',
    color: '#BD8D31',
    status: 'in-progress',
    tasks: []
  },
  {
    id: 2,
    title: 'Write some code',
    description: 'Code along with the samples in the book',
    color: '#3A7E28',
    status: 'todo',
    tasks: [
      {
        id: 1,
        name: 'ContactList Example',
        done: true
      },
      {
        id: 2,
        name: 'Kanban Example',
        done: false
      },
      {
        id: 3,
        name: 'My own experiments',
        done: false
      }
    ]
  },
];

ReactDOM.render(
    <div>
      <KanbanBoard cards={cardsList} />
      <hr />
      <Search />
    </div>,
    document.getElementById('root')
);