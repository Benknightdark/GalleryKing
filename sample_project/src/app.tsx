import * as React from 'react';
import * as ReactDOM from 'react-dom';

function render() {
  ReactDOM.render(
    <div>
      <h1 className="text-3xl font-bold underline bg-green-900">
        Hello world!
      </h1>
    </div>
    ,
    document.body);
}

render();