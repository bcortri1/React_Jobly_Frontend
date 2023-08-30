import React from "react";
import { NavLink } from "react-router-dom";
import "./Home.css"

const Home = ({ currUser }) => {
    return (
        <div className="Home">
            <h1>Jobly</h1>
            <p>All the jobs in one, convenient place.</p>

            {currUser === null ?
                <div>
                    <NavLink className="btn btn-primary" to="/login">Login</NavLink>
                    <NavLink className="btn btn-primary" to="/signup">Sign Up</NavLink>
                </div> :
                <>
                    <h2>Welcome Back, {currUser.firstName}!</h2>
                </>
            }
        </div>
    );

}

export default Home;