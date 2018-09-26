import React, { Component } from 'react';
import '../Stylesheet/NewPerson.css';
import { Redirect } from 'react-router';

class SignIn extends Component {
  constructor() {
    super();
    this.state = {
      formData: {
        password: "",
        user_name:"",
      },
      auth:{},
      submitted: false,
    }
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleUserNameChange = this.handleUserNameChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit (event) {
    event.preventDefault();
    if(this.state.formData.password==="" || this.state.formData.user_name==="")
    {
        window.alert("Please fill the form completely");
        return;
    }
    fetch('http://localhost:8080/validateUser', {
     method: 'POST',
     body: JSON.stringify(this.state.formData),
   })
      .then(response => {
        if(response.status >= 200 && response.status < 300){
          this.setState({submitted: true});
          response.json().then(USER =>{
              let tempVar = {
              user_id : USER.id,
              log_in : true,
              admin : USER.admin,
              user_name : USER.user_name,
             }
             this.setState({auth:tempVar})
             this.setState({USER:USER})
             localStorage.setItem("auther",JSON.stringify(this.state.auth));
             window.location.reload();
       })}
         else if(response.status==401){
             let tempVar = {
             id : null,
             log_in : false,
             admin : false,
             user_name : "",
            }
             this.setState({auth:tempVar})
             localStorage.setItem("auther",JSON.stringify(this.state.auth));
             window.location.reload();
             window.alert("Wrong Credentials");
         }
      })
  }
  handlePasswordChange(event) {
      let tempVar = {...this.state.formData};
      tempVar.password = event.target.value;
      this.setState({formData:tempVar})
  }
  handleUserNameChange(event) {
      let tempVar = {...this.state.formData};
      tempVar.user_name = event.target.value;
      this.setState({formData:tempVar})
  }

  render() {

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Sign In</h1>
        </header>
        <br/><br/>
        <div className="formContainer">
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
                <label>User Handle</label>
                <input type="text" className="form-control" value={this.state.user_name} onChange={this.handleUserNameChange}/>
            </div>
            <div className="form-group">
                <label>Password</label>
                <input type="password" className="form-control" value={this.state.password} onChange={this.handlePasswordChange}/>
            </div>
                <button type="submit" className="btn btn-default">Submit</button>
          </form>
        </div>

        {this.state.submitted &&
          <div>
                {console.log(this.state.USER)}
                {this.state.USER && <h2>Hi {this.state.USER.name}</h2>}
                <Redirect to='/' />
          </div>
        }

      </div>
    );
  }
}

export default SignIn;
