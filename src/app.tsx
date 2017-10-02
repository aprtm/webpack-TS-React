import * as React from 'react';
import * as ReactDOM from 'react-dom';

import greeting from "./abc_module";
import {Reactivity} from "./xyz_module";

console.log(greeting);

ReactDOM.render(
    <Reactivity name="Reactivity" />,
    document.getElementById('root')
);