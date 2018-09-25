import React, { Component } from 'react';
import '../Stylesheet/ViewGenre.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import GenreHome from './GenreHome';
import Home from './Home';

import CreateGenre from './CreateGenre';
import DeleteGenre from './DeleteGenre';

class ViewGenres extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      ADMIN : true,
    }
  }

  // Lifecycle hook, runs after component has mounted onto the DOM structure
  componentDidMount() {
    const request = new Request('http://127.0.0.1:8080/genreList/');
    fetch(request)
      .then(response => response.json())
        .then(data => this.setState({data: data}));
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">List of all genres</h1>
        </header>
              <Router>
                <div>
                  <nav className="navbar navbar-default">
                    <div className="container-fluid">
                      <div className="navbar-header">
                        <Link className="navbar-brand" to={'/'}>React App</Link>
                      </div>
                      <ul className="nav navbar-nav">
                      {this.state.data.map(function(item, key) {
                           return (<li key={key}><Link to={`/GenreHome/${item.id}`}>{item.name}</Link></li>)
                       })}
                       {this.state.ADMIN && <li><Link to='./CreateGenre'>CreateGenre</Link></li>}
                       {this.state.ADMIN && <li><Link to='./DeleteGenre'>DeleteGenre</Link></li> }
                       </ul>
                    </div>
                  </nav>
                  <Switch>
                    <Route exact path='/' component={Home}/>
                    <Route exact path='/GenreHome/:genre_id' component={GenreHome}/>
                    {this.state.ADMIN && <Route exact path='/CreateGenre' component={CreateGenre}/>}
                    {this.state.ADMIN && <Route exact path='/DeleteGenre' component={DeleteGenre}/>}
                  </Switch>
                </div>
              </Router>
      </div>
    );
  }
}

export default ViewGenres;
