import React from 'react'
import { NavLink } from 'react-router-dom'
import Cookies from 'js-cookie';
import './navigation.css'

export default function navigation(props) {
    const token = Cookies.get('token')
  
    return (
    
            <nav>
            <ul>
                       
            {!token && <li className="litem"><NavLink to="/auth" className="nav-link">Login</NavLink></li>}
           {!token &&(<li><NavLink to="/register" className="nav-link">Sign Up</NavLink></li>)}
           {token &&( <li><NavLink to="/events" className="nav-link">Events</NavLink></li>)}
           
            </ul>
            </nav>
            )    
}
