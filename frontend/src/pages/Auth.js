import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Cookies from 'js-cookie'
import './Auth.css'
import AuthContext from '../context/auth-context';

class Auth extends Component {

    static contextType = AuthContext;

    constructor(props) {
        super(props);
        this.emailEl = React.createRef();
        this.passwordEl = React.createRef();
      }



      submitHandler = (event) => {
        event.preventDefault();
        const email = this.emailEl.current.value;
        const password = this.passwordEl.current.value;
    
        if (email.trim().length === 0 || password.trim().length === 0) {
          return;
        }
    
        let requestBody = {
          query: `
            query {
              login(email: "${email}", password: "${password}") {
                userId
                token
                tokenExpiration
              }
            }
          `
        };

    
    fetch("http://localhost:8000/graphql", {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          console.log("Email or Password Didn't match!");
          alert("Email or Password Didn't match!");
        }
       
        return res.json();
      })
      .then((resData) => {

        // if (resData.data.login.token) {
        //   this.context.login(resData.data.login.token,resData.data.login.userId,resData.data.login.tokenExpiration)
        // }
        
        Cookies.set("token", resData.data.login.token)
        this.props.loginFn(resData.data.login.token,resData.data.login.userId,resData.data.login.tokenExpiration)
        console.log(resData);
        
      })
      .catch((err) => {
        console.log(err);
      });
  };


    render() {
        return (
            <div className="form-style-6">
            <h1>Login</h1>
            <form onSubmit={this.submitHandler}>
            
            <input type="email" name="email" placeholder="Email Address" ref={this.emailEl} />
            <input type="password" name="password" placeholder="Password" ref={this.passwordEl} />
            
            <input type="submit" value="Login" />
            
            </form>
            <Link to="/register" >Don't have an Account? SignUp</Link>
            </div>

        )
    }
}

export default Auth;
