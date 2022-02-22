import * as React from 'react';
import { useState } from 'react';
import * as ReactDOM from 'react-dom';

function Welcome(props: { name: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal; }) {
  return <h1 className='bg-orange-500'>Hello, {props.name}</h1>;
}
function Example() {
  // Declare a new state variable, which we'll call "count"
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
function App() {
  return (
    <div>
      <Welcome name="Sara" />
      <Welcome name="Cahal" />
      <Welcome name="Edite" />
      <Example></Example>
    </div>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);