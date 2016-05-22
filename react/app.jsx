import React from 'react';
import ReactDom from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import Appbar from './components/appbar.jsx';
import Home from './home.jsx';

class App extends React.Component {
  constructor(){
    super();

    // Initialize state here
    this.state = {};
  }

  componentDidMount(){
    // Update state here
  }

  componentWillUnmount(){
    // Cleanup code goes here
  }

  render(){
    return (
      <div style={{height:'100%',display:'flex',flexDirection:'column'}}>
        <Appbar></Appbar>
        <div style={{flexGrow: 1}}>{this.props.children}</div>
      </div>
    );
  }
}

ReactDom.render((
<Router history={browserHistory}>
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
  </Route>
</Router>
),
document.getElementById('app')
);
