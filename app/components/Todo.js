var React = require('react');
var ReactDOM = require('react-dom');
var TodoItem = require('./TodoItem');
var ENTER_KEY = 13;

class Todo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newTodo: '',
      entries: []
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChecked = this.handleChecked.bind(this);
  }
  
  handleChecked(event) {
    
  }

  handleChange(event) {
    var value = event.target.value;
    this.setState(()=>{
      return {
        newTodo: value
      }
    })
  }

  handleSubmit(event) {
    var currentTodoList = this.state.entries;
    var newItem = {
      value: this.state.newTodo,
      key: Date.now(),
      completed: false,
       
    };
    currentTodoList.push(newItem);
    console.log('Entries:', currentTodoList);
    this.setState(()=> {
      return {
        entries: currentTodoList,
        newTodo: ''
      }
    })
  }

  handleKeyDown(event) {
    // If pressed enter: call handleSubmit
    if(event.keyCode === ENTER_KEY) {
      console.log("enter key pressed, calling handleSubmit(event)");
      this.handleSubmit(event);
    }
  }
  render() {
    var shownTodos = this.state.entries;
    var todoItems = shownTodos.map((item, index) => {
      return (
        <TodoItem 
          value={item.value} 
          key={item.key} 
          id={index}
          onChecked={this.handleChecked}
          completed={item.completed}
        />
      )
    })
    return (
      <div className='container'> 
        <header>
          <h1>todos</h1>
          <input 
          placeholder='What needs to be done?'
          value={this.state.newTodo}
          onChange={this.handleChange} 
          onKeyDown={this.handleKeyDown}
          />
        </header>
        <ul>
          {todoItems}
        </ul>
      </div>
    )
  }
}

module.exports = Todo;