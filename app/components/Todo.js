const React = require('react');
const ReactDOM = require('react-dom');
const TodoItem = require('./TodoItem');
const ReactRouter = require('react-router-dom');
const Router = ReactRouter.BrowserRouter;
const Route = ReactRouter.Route;
const Link = require('react-router-dom').Link;
const ENTER_KEY = 13;

// Will need proptypes
class Todo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentFilter: '',
      newTodo: '',
      entries: [],
    };

    this.ALL_TODOS = 'all';
    this.ACTIVE_TODOS = 'active';
    this.COMPLETED_TODOS = 'completed';

    this.handleChange = this.handleChange.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChecked = this.handleChecked.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleListFilter = this.handleListFilter.bind(this);
  }
  // give more specific handleFunction names next time
  handleChecked(index, event) {
    const newEntries = this.state.entries.slice();
    console.log('handlechecked event.target.checked', event.target.checked);
    if (index > -1) newEntries[index].completed = event.target.checked;
    this.setState(() => ({
      entries: newEntries,
    }));
  }

  handleChange(event) {
    const value = event.target.value;
    this.setState(() => ({
      newTodo: value,
    }));
  }
  handleClick(index, event) {
    const newEntries = this.state.entries.slice();
    if (index > -1) newEntries.splice(index, 1);

    this.setState(() => ({
      entries: newEntries,
    }));
  }

  handleSubmit(event) {
    const currentTodoList = this.state.entries;
    const newItem = {
      value: this.state.newTodo,
      key: Date.now(),
      completed: false,

    };
    currentTodoList.push(newItem);
    console.log('Entries:', currentTodoList);
    this.setState(() => ({
      entries: currentTodoList,
      newTodo: '',
    }));
  }

  handleKeyDown(event) {
    // If pressed enter: call handleSubmit
    if (event.keyCode === ENTER_KEY && /\S/.test(this.state.newTodo)) {
      console.log('enter key pressed, calling handleSubmit(event)');
      this.handleSubmit(event);
    }
  }

  handleListFilter(filter, e) {
    if (filter === this.state.currentFilter) return;

    this.setState(() => ({
      currentFilter: filter,
    }));
  }
  componentDidMount() {
  // location.state.location.setState(() => {
  //   return {currentFilter: ''}
  // })
  // console.log(location.state);
  
} 

  render() {
    const currentFilter = this.state.currentFilter;
    const shownTodos = this.state.entries.filter((element) => {
      // switch (this.state.currentFilter) {
      //   case this.ACTIVE_TODOS:
      //     return !(element.completed);
      //   case this.COMPLETED_TODOS:
      //     return element.completed;

      //   default:
      //     return element;
      // }
      if (currentFilter === this.ACTIVE_TODOS) return !(element.completed);
      else if (currentFilter === this.COMPLETED_TODOS) return element.completed;
      return element;
    });
    // console.log('this.state.entries:', this.state.entries);
    // console.log('shownTodos:', shownTodos);
    const todoItems = shownTodos.map((item, index) => (
      <TodoItem
        value={item.value}
        key={item.key}
        id={index}
        onChecked={this.handleChecked.bind(null, index)}
        onClick={this.handleClick.bind(null, index)}
        completed={item.completed}
      />
      ));
    // console.log('render() current filter:', this.state.currentFilter);
    return (

      <div className="container">
        <header>
          <h1>todos</h1>
          <div> 
            <input
              className="todo-input"
              placeholder="What needs to be done?"
              value={this.state.newTodo}
              onChange={this.handleChange}
              onKeyDown={this.handleKeyDown}
            />
          </div>
        </header>
      
        <ul className="todo-list">
          {todoItems}
        </ul>
        
        <Link className="links" to="/all" onClick={this.handleListFilter.bind(null, this.ALL_TODOS)}>
          All
        </Link>
        <Link className="links" to="/active" onClick={this.handleListFilter.bind(null, this.ACTIVE_TODOS)}>
          Active
        </Link>
        <Link className="links" to="/completed" onClick={this.handleListFilter.bind(null, this.COMPLETED_TODOS)}>
          Completed
        </Link>
      </div>

    );
  }
}

module.exports = Todo;
