import React, { Component } from 'react';
import { BrowserRouter,Route,Redirect,Switch } from 'react-router-dom';
import Cookies from 'js-cookie';
import './App.css';
import Auth from './pages/Auth'
import Events from './pages/Events'
import Register from './pages/Register'
import NavBar from './components/Navigation/navigation'


class App extends Component {

  state = {
    token: null,
    userId:null
  };

  readCookie = () => {
    const token = Cookies.get("token");
    if(token){
      console.log(token)
      this.setState({ token: token })
    }
  }
 
  componentDidMount() {

    this.readCookie()

  };

  login = (token, userId, tokenExpiration) => {
    this.setState({ token: token, userId: userId });
  };

  logout = () => {
    this.setState({ token: null, userId: null });
  };

  render() {
    return (
      <BrowserRouter>
      <React.Fragment>
          
      <NavBar />
      <Switch>
      
       <Redirect from="/" to="/auth" exact />
       {this.state.token && (<Redirect from="/auth" to="/events" exact  />)}
       <Route path="/auth"  render={props => 
        (<Auth {...props} loginFn={this.login}/>)
      } />
      
       
       <Route path="/events" component={Events} />
       <Route path="/register" component={Register} />

      </Switch>
      
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

export default App;
