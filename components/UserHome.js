import React, { Component } from 'react';
import '../Stylesheet/ViewGenre.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import QuizHome from './QuizHome'


class UserHome extends Component{
  constructor(props) {
    super(props);
    this.state = {
      identity:[],
      user_id:parseInt(props.match.params.user_id,10),
      quizes:[],
      ADMIN : true,
    }
    //console.log(props);
    //console.log(this.state.genre_id);
    //console.log(Component.state);
  }

  // Lifecycle hook, runs after component has mounted onto the DOM structure
  componentDidMount() {
    const request = new Request(`http://127.0.0.1:8080/user/${this.state.user_id}`);
    fetch(request)
      .then(response => response.json())
        .then(identity => this.setState({identity: identity}));
    const request2 = new Request(`http://127.0.0.1:8080/hometable/${this.state.user_id}`);
    fetch(request2)
      .then(response => response.json())
        .then(quizes => this.setState({quizes: quizes}));
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Home of {`${this.state.identity.username}`}</h1>
        </header>
        <table className="table-hover">
          <thead>
            <tr>
              <th>Serial</th>
              <th>Quiz Number</th>
              <th>Quiz Name</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>{this.state.quizes.map(function(item, key) {
               return (
                  <tr key = {key}>
                      <td>{key+1}</td>
                      <td>{item.quiz_id}</td>
                      <td>{item.quiz_name}</td>
                      <td>{item.score}</td>
                  </tr>
                )
            })}
          </tbody>
       </table>
      </div>
    );
  }
}

export default UserHome;
