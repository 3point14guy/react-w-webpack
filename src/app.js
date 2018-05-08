import React from 'react';

const Headline = () => {
  return <h1 className="title">Welcome to the React World</h1>
}

const Greeting = (props) => {
  // return <p>You will love it {props.name}({props.age})!</p>
  // or better, you could do it like This:
  const {name, age} = props;
  return <p>You will love it {name}({age})!</p>
}

// App is like yield in Rails. it will render all of our JSX
const App = () => {
  return (
    <div>
    <Headline />
    <Greeting name="John" age={25}/>
    </div>
  )
}

// propTypes will validate our data propTypes
Greeting.propTypes ={
  name: React.PropTypes.string,
  age: React.PropTypes.number.isRequired
}

export default App;
