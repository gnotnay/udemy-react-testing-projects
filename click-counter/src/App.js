import React, { Component } from 'react';
import "./App.css"

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      counter: 0,
      error: false
    }
  }

  handleIncrement = () => {
    if (this.state.error) {
      this.setState({ ...this.state, error: false, counter: this.state.counter + 1 });
    } else {
      this.setState({ ...this.state, counter: this.state.counter + 1 });
    }
  }

  handleDecrement = () => {
    if (this.state.counter === 0) {
      this.setState({ ...this.state, error: true })
    } else {
      this.setState({ ...this.state, counter: this.state.counter - 1 });
    }
  }

  render() {
    const notificationUI = 
    <div className="Notification" data-test="notification">
      Counter should not be a negative.
    </div>

    return (
      <div className="App" data-test="component-app">
        <div className="CounterDisplay" data-test="counter-display">
          {this.state.counter}
        </div>

        {this.state.error && notificationUI}

        <button 
          className="IncrementButton" 
          data-test="increment-button"
          onClick={this.handleIncrement.bind(this)}
          >
          Increment
        </button>

        <button 
          className="DecrementButton"
          data-test="decrement-button"
          onClick={this.handleDecrement.bind(this)}
          >
          Decrement
        </button>
      </div>
    );
  }
}

export default App;
