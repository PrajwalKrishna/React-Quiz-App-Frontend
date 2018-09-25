import React, { Component } from 'react';
import '../Stylesheet/ViewGenre.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import CreateQuestion from './CreateQuestion';
import DeleteQuestion from './DeleteQuestion';

import Home from './Home'

class QuizHome extends Component{
  constructor(params) {
    super();
    this.state = {
      identity:[],
      genre_id:params.match.params.genre_id,
      quiz_id:params.match.params.quiz_id,
      questions:[],
      ADMIN : true,
    }
  }

  // Lifecycle hook, runs after component has mounted onto the DOM structure
  componentDidMount() {
    const request = new Request(`http://127.0.0.1:8080/quiz/${this.state.quiz_id}`);
    fetch(request)
      .then(response => response.json())
        .then(identity => this.setState({identity: identity}));
    const request2 = new Request(`http://127.0.0.1:8080/questions/${this.state.quiz_id}`);
    fetch(request2)
      .then(response => response.json())
        .then(questions => this.setState({questions: questions}));
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">List of all questions</h1>
        </header>
              <Router>
                <div>
                  <nav className="navbar navbar-default">
                    <div className="container-fluid">
                      <div className="navbar-header">
                        <Link className="navbar-brand" to={'/'}>React App</Link>
                      </div>
                      <ul className="nav navbar-nav">
                      {this.state.questions.map(function(item, key) {
                           return (<li key = {key}><Link to={`/quiz/${this.state.genre_id}/${item.id}`}>{item.question}</Link></li>)
                       },this)}
                       {this.state.ADMIN && <li><Link to={`/CreateQuestion/${this.state.quiz_id}`}>CreateQuestion</Link></li>}
                       {this.state.ADMIN && <li><Link to={`/DeleteQuestion/${this.state.quiz_id}`}>DeleteQuestion</Link></li> }
                       </ul>
                    </div>
                  </nav>
                  <Switch>
                     <Route exact path='/' component={Home}/>
                     <Route exact path='/QuizHome/:genre_id/:quiz_id' component={QuizHome} />
                     {this.state.ADMIN && <Route exact path='/CreateQuestion/:quiz_id' component={CreateQuestion}/>}
                     {this.state.ADMIN && <Route exact path='/DeleteQuestion/:quiz_id' component={DeleteQuestion}/>}
                  </Switch>
                </div>
              </Router>
      </div>
    );
  }
}

export default QuizHome;
