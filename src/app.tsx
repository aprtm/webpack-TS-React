import * as React from 'react';
import * as ReactDOM from 'react-dom';

// import { KanbanBoard } from './components/kanban-board';
import { KanbanBoardContainer } from './components/kanban-board-container';
import { Search } from './components/searchbox';
import { RandomWords } from './components/textarea';
import { Selection } from './components/selectoption';
import { NoControl } from './components/uncontrolled';
import { FocusText } from './components/refstest';

// import greeting from "./abc_module";
// import {Reactivity} from "./xyz_module";
// console.log(greeting);

const API_URL = 'http://kanbanapi.pro-react.com';
const API_HEADERS = {
  'Content-Type': 'application/json'
  // 'Authorization': 'meh'
}

/*
  // let cardsList = [
  //   {
  //     id: 1,
  //     title: 'Read the Book',
  //     description: 'I should read the whole book',
  //     color: '#BD8D31',
  //     status: 'in-progress',
  //     tasks: []
  //   },
  //   {
  //     id: 2,
  //     title: 'Write some code',
  //     description: 'Code along with the samples in the book',
  //     color: '#3A7E28',
  //     status: 'todo',
  //     tasks: [
  //       {
  //         id: 1,
  //         name: 'ContactList Example',
  //         done: true
  //       },
  //       {
  //         id: 2,
  //         name: 'Kanban Example',
  //         done: false
  //       },
  //       {
  //         id: 3,
  //         name: 'My own experiments',
  //         done: false
  //       }
  //     ]
  //   },
  // ];
*/

ReactDOM.render(
    <div>
      <h4>KANBAN APP</h4>
      {/* <KanbanBoard apiUrl={API_URL} apiHeaders={API_HEADERS}/> */}
      <KanbanBoardContainer apiUrl={API_URL} apiHeaders={API_HEADERS}/>
      <hr />
      <h4>SEARCH BOX</h4>
      <Search />
      <hr />
      <h4>TEXTAREA PRINT</h4>
      <RandomWords />
      <hr />
      <h4>SELECT-OPTION</h4>
      <Selection />
      <hr />
      <h4>UNCONTROLLED COMPONENT</h4>
      <NoControl />
      <hr />
      <h4>REFS TEST</h4>
      <FocusText />
      <hr />
    </div>,
    document.getElementById('root')
);