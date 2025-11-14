import React from 'react';

// Class Component Example
class ClassComponentExample extends React.Component {
  constructor(props) {
    super(props);
    // Initialize state
    this.state = {
      count: 0,
      name: 'React Class Component',
      items: []
    };
  }

  // Lifecycle method - runs after component mounts
  componentDidMount() {
    console.log('Component mounted!');
    // Example: fetch data here
  }

  // Lifecycle method - runs after state/props update
  componentDidUpdate(prevProps, prevState) {
    if (prevState.count !== this.state.count) {
      console.log('Count updated to:', this.state.count);
    }
  }

  // Lifecycle method - runs before component unmounts
  componentWillUnmount() {
    console.log('Component will unmount!');
    // Cleanup: remove event listeners, cancel timers, etc.
  }

  // Event handler method
  increment = () => {
    this.setState({ count: this.state.count + 1 });
  }

  decrement = () => {
    this.setState({ count: this.state.count - 1 });
  }

  reset = () => {
    this.setState({ count: 0 });
  }

  addItem = () => {
    const newItem = `Item ${this.state.items.length + 1}`;
    this.setState({
      items: [...this.state.items, newItem]
    });
  }

  render() {
    // Access props and state via 'this'
    return (
      <div style={{ padding: '20px', border: '2px solid #61dafb', borderRadius: '8px', margin: '20px' }}>
        <h2>{this.state.name}</h2>
        <p>Welcome, {this.props.userName || 'Guest'}!</p>
        
        <div style={{ margin: '20px 0' }}>
          <h3>Counter: {this.state.count}</h3>
          <button onClick={this.increment} style={{ margin: '5px' }}>
            Increment
          </button>
          <button onClick={this.decrement} style={{ margin: '5px' }}>
            Decrement
          </button>
          <button onClick={this.reset} style={{ margin: '5px' }}>
            
            Reset
          </button>
        </div>

        <div style={{ margin: '20px 0' }}>
          <h3>Items List</h3>
          <button onClick={this.addItem}>Add Item</button>
          <ul>
            {this.state.items.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default ClassComponentExample;
