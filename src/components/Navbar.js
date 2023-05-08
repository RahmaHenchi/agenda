import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import BNavbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Nav from 'react-bootstrap/Nav';

import { logoutUser } from '../redux/actions/userActionCreators'

function Navbar() {
    const dispatch = useDispatch()
    const token = useSelector(state => state.user.token)
    const user = JSON.parse(localStorage.getItem('user'))
    const history = useHistory()

    const logout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        dispatch(logoutUser())
        history.push('/login')
    }
    return (
        <BNavbar collapseOnSelect expand="lg" bg="primary" variant="dark">
            <Container className="navbar-evt">
                <BNavbar.Brand href="#home"><i class="bi bi-calendar-check"></i> Eventos </BNavbar.Brand>
                <BNavbar.Toggle aria-controls="responsive-navbar-nav" />
                <BNavbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">

                    </Nav>
                    <Nav>
                        {token ?
                            <>
                                <NavLink to="/addEvent" className="nav-link">Add event</NavLink>
                                <NavLink to="/events" className="nav-link">Events</NavLink>
                            </>
                            :
                            <>
                                <NavLink to="/login" className="nav-link">Login</NavLink>
                                <NavLink to="/register" className="nav-link">Register</NavLink>
                            </>
                        }
                    </Nav>
                    {token ?
                        <Nav>
                            <NavDropdown title={user && user.userName}>
                                <NavDropdown.Item onClick={logout} > Logout </NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                        : null
                    }
                </BNavbar.Collapse>
            </Container>
        </BNavbar>

    )
}

export default Navbar;