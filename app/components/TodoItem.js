var React = require('react');

class TodoItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id,
      isDone: false
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    var checked = event.target.checked;
    this.setState( () => {
      return {
        isDone: checked
      }
    })
    
  }

  render(){ 
    return (
      <div className='row todo-item' id={this.props.id}>
        <input type='checkbox'
          onChange={this.handleChange}
        />
        <li className={(this.state.isDone ? 'completed' : '')}>{this.props.value}</li>      
      </div>
    )
  }
}
/*class TodoItems extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      entries: this.props.entries
    }
  }
  render() {
    var todoList = this.props.entries;
    return (
      <ul>
        {todoList.map((item) => <TodoItem value={item.value} key={item.key}/>)}
      </ul>
    )
  }
}*/

module.exports = TodoItem;