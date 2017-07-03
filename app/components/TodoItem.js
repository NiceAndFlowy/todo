var React = require('react');

class TodoItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id,
      isDone: false
    }
    //this.handleChange = this.handleChange.bind(this);
  }

  // handleChange(event) {
  //   var checked = event.target.checked;
  //   this.setState( () => {
  //     return {
  //       isDone: checked
  //     }
  //   })
    
  // }

  render(){ 
    return (
      <div className='row todo-item' id={this.props.id}>
        <input type='checkbox' className='checkbox'
          onChange={this.props.onChecked}
          checked={(this.props.completed ? 'checked' : '')}
        />
        <li className={(this.props.completed ? 'completed' : '')}>{this.props.value}</li>
        <button className='delete'
          onClick={this.props.onClick}>
          x
        </button>      
      </div>
    )
  }
}

module.exports = TodoItem;