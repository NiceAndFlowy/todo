const React = require('react');
const Todo = require('./Todo');
const ReactRouter = require('react-router-dom');
const Router = ReactRouter.BrowserRouter;
const Route = ReactRouter.Route;
class App extends React.Component {
  render() {
    return (
      <Router>
        <Route path="/" component={Todo} />
      </Router>
    );
  }
}

module.exports = App;
