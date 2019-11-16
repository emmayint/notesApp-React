import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const Header = ({dispatch, activeUsers, isLoggedIn, email}) => {
    return(
        <div className="header">
            <span className="nav-logo">Homework 3 </span>
            <span className="nav-link nav-item"><Link to="/login"> Login </Link></span>
            <span className="nav-link nav-item"><Link to="/notes"> Notes </Link></span>
            <span>active users: {activeUsers}</span>
            {isLoggedIn? <span>logged in: true</span> : <span>logged in: false</span>}


            {/* {isLoggedIn?
                <button onClick={() => {
                    // dispatch(setLogout())
                }}>Log out</button>
            :
                <span className="nav-link nav-item"><Link to="/login">Login</Link></span>   
            }
            {isLoggedIn?
                <span className="nav-item">logged in as {email}</span>
            :
                ""
            }
            {isLoggedIn?
                <span className="nav-item">active users: {activeUsers}</span>
            :
                ""
            } */}
        </div>
    )
}

const mapStateToProps = state => ({
    activeUsers: state.userReducer.activeUsers,
    isLoggedIn: state.userReducer.isLoggedIn,
    email: state.userReducer.email
})

export default connect(mapStateToProps)(Header);