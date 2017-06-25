var React = require('react');

class TodoItems extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      entries: this.props.entries
    }
  }
  render() {
    function createItems(item) {
      return (
        <li key={item.key}>{item.value}</li>
      )
    }
    var todoList = this.props.entries;
    var todoListItems = todoList.map(createItems); 
    return (
      <ul>
        {todoListItems}
      </ul>
    )
  }
}

module.exports = TodoItems;