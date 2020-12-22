import React, { Component } from 'react'
import { Link } from 'react-router-dom'
export class Register extends Component {

    constructor(props) {
        super(props);
        this.UserNameEl = React.createRef();
        this.emailEl = React.createRef();
        this.passwordEl = React.createRef();
      }

      submitHandler = (event) => {
        event.preventDefault();
        const username = this.UserNameEl.current.value;
        const email = this.emailEl.current.value;
        const password = this.passwordEl.current.value;
    
        if (email.trim().length === 0 || password.trim().length === 0 || username.trim().length === 0) {
          alert('please fill all the fields!');
          return;
        }

        let requestBody = {
            query: `
              mutation {
                createUser(userInput:{name:"${username}",email: "${email}", password: "${password}"}) {
                  email
                }
              }
            `
          };


          fetch('http://localhost:8000/graphql', {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
              'Content-Type': 'application/json'
            }
          })
            .then(res => {
              if (res.status !== 200 && res.status !== 201) {
                throw new Error('Failed to Register!');
              }
              return res.json();
            })
            .then(resData => {
              console.log(resData);
            })
            .catch(err => {
              console.log(err);
            });

    }





    render() {
        return (
            <div className="form-style-6">
            <h1>Register</h1>
            <form onSubmit={this.submitHandler}>
            
            <input type="text" name="userName" placeholder="UserName" ref={this.UserNameEl} />
            <input type="email" name="email" placeholder="Email Address" ref={this.emailEl} />
            <input type="password" name="password" placeholder="Password" ref={this.passwordEl} />
            
            <input type="submit" value="Register" />
            
            </form>
            <Link to="/auth" >Already have an Account? Login</Link>
            </div>
        )
    }
}

export default Register
