import React from 'react';
import {Navbar, Nav, Container, NavDropdown} from 'react-bootstrap';
import {useSelector, useDispatch} from 'react-redux';
import {LinkContainer} from 'react-router-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import {useLogoutMutation} from '../../slices/userApiSlice.js';
import {logout} from '../../slices/auth.js';

import './index.scss';

const Header = () =>{
    
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {userInfo} = useSelector((state)=>state.auth);
    const [logoutApiCall] = useLogoutMutation();
    const logoutHandler = async()=>{
        try{
            await logoutApiCall().unwrap();
            dispatch(logout());
            navigate('/');
        }catch(error){
            console.log(error);
        }
    }
    return(
        <header>
            <Navbar bg="dark" variant='dark' expand="sm" collapseOnSelect>
                <Container className="container">
                    <LinkContainer to = '/'>
                    <Navbar.Brand> Advanced Auth App</Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls='basic-navbar-nav'/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className='ms-auto'>
                            {userInfo ? (
                                <>
                                <NavDropdown title = {userInfo.name} id="username">
                                <LinkContainer to = '/profile'>
                                <NavDropdown.Item>
                                    Profile
                                </NavDropdown.Item>
                                </LinkContainer>
                                <LinkContainer to = '/logout'>
                                <NavDropdown.Item onClick={logoutHandler}>
                                    Logout
                                </NavDropdown.Item>
                                </LinkContainer>
                                </NavDropdown>
                                </>
                            ) : (
                                <>
                                <LinkContainer to = '/login'>
                                <Nav.Link>
                                <FontAwesomeIcon icon={faSignInAlt} /> Sign In
                                </Nav.Link>
                                </LinkContainer>   
    
                                <LinkContainer to = '/register'>
                                <Nav.Link>
                                <FontAwesomeIcon icon={faUserPlus} /> Sign Up
                                </Nav.Link>
                                </LinkContainer>
                                
                                </>
                            )}
                    
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}


export default Header;