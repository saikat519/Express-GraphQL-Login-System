import React, { Component } from 'react'
import Cookies from 'js-cookie'
class Events extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }
        this.logout = this.logout.bind(this)
    }
    logout = (e) => {

        Cookies.remove('token');
        window.location.href = '/auth';
        return false;
    }

    render() {
        return (
            <div>
                <h1>Events Page.........</h1>
                <button onClick={this.logout}>Logout</button>
            </div>
        )
    }
}

export default Events;
