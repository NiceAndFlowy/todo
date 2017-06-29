var React = require('react');
var ReactDOM = require('react-dom');
var TodoItem = require('./TodoItem');
var ReactRouter = require('react-router-dom');
var Router = ReactRouter.BrowserRouter;
var Route = ReactRouter.Route;
var Link = require('react-router-dom').Link;
var ENTER_KEY = 13;

//Will need proptypes 
class Todo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentFilter: '',
      newTodo: '',
      entries: []
    }

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
  //give more specific handleFunction names next time
  handleChecked(index, event) {
    var newEntries = this.state.entries.slice();
    console.log('handlechecked event.target.checked', event.target.checked);
    if (index > -1) newEntries[index].completed = event.target.checked;
    this.setState( ()=> {
      return {
        entries: newEntries
      }
    });
  }

  handleChange(event) {
    var value = event.target.value;
    this.setState(()=>{
      return {
        newTodo: value
      }
    })
  }
  handleClick(index, event) {
    var newEntries = this.state.entries.slice();
    if (index > -1) newEntries.splice(index,1);
    
    this.setState( ()=> {
      return {
        entries: newEntries
      }
    });
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

  handleListFilter(filter, e) {
    if (filter === this.state.currentFilter) return;

    this.setState(() => {
      return {
        currentFilter: filter
      }
    })
  }
componentDidMount() {
  // location.state.location.setState(() => {
  //   return {currentFilter: ''}
  // })
  // console.log(location.state);
  
}

  render() {
    // var currentFilter;
    // if (typeof this.props.location.state.currentFilter !== "undefined") 
    //   currentFilter = this.props.location.state.currentFilter; 
    // else 
    //   currentFilter = null;
    var currentFilter = this.state.currentFilter;
    var shownTodos = this.state.entries.filter((element) => {
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
      else return element;
    });
    console.log('this.state.entries:', this.state.entries);
    console.log('shownTodos:', shownTodos);
    var todoItems = shownTodos.map((item, index) => {
      return (
        <TodoItem 
          value={item.value} 
          key={item.key} 
          id={index}
          onChecked={this.handleChecked.bind(null, index)}
          onClick={this.handleClick.bind(null, index)}
          completed={item.completed}
        />
      )
    })
    //console.log('render() current filter:', this.state.currentFilter);
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
        <Link className='blah' to='/all' onClick={this.handleListFilter.bind(null,this.ALL_TODOS)}>
          All
        </Link>
        <Link className='blah' to='/active' onClick={this.handleListFilter.bind(null,this.ACTIVE_TODOS)}>
          Active
        </Link>
        <Link className='blah' to='/completed' onClick={this.handleListFilter.bind(null,this.COMPLETED_TODOS)}>
          Completed
        </Link>
        <ul>
          {todoItems}
        </ul>
      </div>
      
    )
  }
}

module.exports = Todo;