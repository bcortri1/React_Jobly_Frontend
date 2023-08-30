import React from "react";
import { NavLink, Link } from "react-router-dom";
import { NavItem, Navbar, NavbarBrand, Nav } from "reactstrap"
import "./NavBar.css"

const NavBar = ({ currUser = null, logout }) => {
    return (
        <Navbar expand={true} fixed="top">
            <NavbarBrand href="/">Jobly</NavbarBrand>
            <Nav className="ml-auto" navbar>
                {currUser === null ?
                    <>
                        <NavItem>
                            <NavLink to="/login">Login</NavLink>
                        </NavItem>

                        <NavItem>
                            <NavLink to="/signup">Sign Up</NavLink>
                        </NavItem>
                    </> :
                    <>
                        <NavItem>
                            <NavLink to="/companies">Companies</NavLink>
                        </NavItem>

                        <NavItem>
                            <NavLink to="/jobs">Jobs</NavLink>
                        </NavItem>

                        <NavItem>
                            <NavLink to="/profile">Profile</NavLink>
                        </NavItem>

                        <NavItem>
                            <Link to="/" onClick={logout} >Log out {currUser.username}</Link>
                        </NavItem>
                    </>
                }
            </Nav>
        </Navbar>
    );
}

export default NavBar;