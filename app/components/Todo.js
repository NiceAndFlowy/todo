var React = require('react');
var ReactDOM = require('react-dom');
var TodoItem = require('./TodoItem');

class Todo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newTodo: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }
  
  handleChange(event) {

  }

  handleKeyDown(event) {
    ReactDOM.render(<TodoItem />, document.getElementById('item-container'));
  }
  render() {
    return (
      <div className='container'> 
        <header>
          <h1>todos</h1>
          <input 
          placeholder='What needs to be done?'
          value=''
          onChange={this.handleChange} 
          onKeyDown={this.handleKeyDown}
          />
        </header>
        <ul id='item-container'>
        </ul>
      </div>
    )
  }
}

module.exports = Todo;