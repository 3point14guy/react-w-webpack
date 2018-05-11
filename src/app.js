import React from 'react';
import PropTypes from 'prop-types';

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
export class App extends React.Component {
  render() {
    return (
      <div>
      <Headline />
      <Greeting name='Thea' age={"25"} />
      </div>
    )
  }
}
// propTypes will validate our data propTypes
Greeting.propTypes = {
  name: PropTypes.string,
  age: PropTypes.number.isRequired
}
