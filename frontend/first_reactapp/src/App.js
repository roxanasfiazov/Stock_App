import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './App.css';
import queryString from 'query-string';
import Symbol from './symbol/Symbol';
import Holding from './holdings/Holding';
import Quote from './quotes/Quote';
import Allocation from './allocations/Allocation';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

class App extends Component {
  constructor() {
    super()
    this.state = {
      accessToken: ''
    }
  }

  componentDidMount() {
    let parsed = queryString.parse(window.location.search);
    let accessToken = parsed.access_token;
    if (!accessToken) return
    this.setState({
      accessToken: accessToken
    })
  }
  render() {
    return (
      <div>
        {this.state.accessToken ?
          <Router>
            <div className="container">
              <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <Link to={'/'} className="navbar-brand">Holdings Maintainance</Link>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                  <ul className="nav nav-tabs nav-justified">
                    <li className="nav-item">
                      <Link to={'/symbols'} className="nav-link">Symbols</Link>
                    </li>
                    <li className="nav-item">
                      <Link to={'/holdings'} className="nav-link">Holdings</Link>
                    </li>
                    <li className="nav-item">
                      <Link to={'/allocations'} className="nav-link">Allocations</Link>
                    </li>
                    <li className="nav-item">
                      <Link to={'/quotes'} className="nav-link">Quotes</Link>
                    </li>
                  </ul>
                </div>
              </nav> <br />
              <Switch>
              <Route exact path="/holdings" component={Holding} />
              <Route path="/quotes" component={Quote} />
              <Route path="/allocations" component={Allocation} />
              <Route path="/symbols" component={Symbol} />
            </Switch>
            </div>
          </Router>
          : <button onClick={() => {
            window.location = process.env.REACT_APP_AUTH_URL 
          }
          }
          style={{padding: '10px', 'font-size': '10px', 'margin-top': '20px'}}>Sign in</button>
        }
      </div>
    );
  }
}
export default App;