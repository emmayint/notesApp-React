import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const Header = ({activeUsers}) => {
    return(
        <div className="header">
            <span className="nav-logo">Homework 3 </span>
            <span className="nav-link nav-item"><Link to="/login"> Login </Link></span>
            <span className="nav-link nav-item"><Link to="/notes"> Notes </Link></span>
            <span className="nav-link nav-item">Active site visitors: {activeUsers}</span>
        </div>
    )
}

const mapStateToProps = state => ({
    activeUsers: state.userReducer.activeUsers,
});

export default connect(mapStateToProps)(Header);