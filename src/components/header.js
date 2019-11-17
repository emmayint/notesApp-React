import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const Header = ({activeUsers, isLoggedIn}) => {
    return(
        <div className="header">
            <span className="nav-logo">Homework 3 </span>
            <span className="nav-link nav-item"><Link to="/login"> Login </Link></span>
            <span className="nav-link nav-item"><Link to="/notes"> Notes </Link></span>
        </div>
    )
}

const mapStateToProps = state => ({
    activeUsers: state.userReducer.activeUsers,
    isLoggedIn: state.userReducer.isLoggedIn,
});

export default connect(mapStateToProps)(Header);