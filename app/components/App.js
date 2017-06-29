var React = require('react');
var Todo = require('./Todo');
var ReactRouter = require('react-router-dom');
var Router = ReactRouter.BrowserRouter;
var Route = ReactRouter.Route;
class App extends React.Component {
  render() {
    return (
      <Router>
        <Route path='/' component={Todo}></Route>
      </Router>
    )
  }
}

module.exports = App;