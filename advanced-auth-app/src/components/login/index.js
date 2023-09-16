import React from "react";
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useLoginMutation } from "../../slices/userApiSlice.js";
import { setCredentials } from '../../slices/auth.js'
import { toast } from 'react-toastify';
import Loader from "../Loader.js";
import './index.scss';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, {isLoading}] = useLoginMutation();

  const { userInfo } = useSelector((state)=>state.auth);
  useEffect(()=>{
    if(userInfo){
     navigate('/');
    }
  }, [navigate, userInfo])

  const submitHandler = async (e) => {
    e.preventDefault();
   try{
   const res = await login({email, password}).unwrap();
   dispatch(setCredentials({...res}));
   navigate('/');
   }catch(err){
    toast.error(err?.data?.message || err.error);
   }
  };

    return(
        <div className="container">
          <div className="row">
            <div className="col-6 left">
         <h1 className="mb-5">Authentication Process</h1>
         <b>User Input: </b>The user enters their credentials and submits the login form.
         <br/>
         <b>Server Validation: </b>The server validates the provided credentials against the database.
         <br/>
         <b>Token Generation: </b>Upon successful validation, the server generates a JWT.
         <br/>
         <b>Storing Token: </b>The JWT is stored in an HTTP-Only cookie.
         <br/>
         <b>Client Update: </b>The client-side state is updated using Redux Toolkit to reflect the authentication status.
         <br/>
         <b>Session Management: </b>The server verifies the JWT from the HTTP-Only cookie for each subsequent authenticated request.
         <br/>
         <b>Logout: </b>To logout, the server invalidates the JWT and removes the HTTP-Only cookie.
         <br/>
         By incorporating these steps, you add a robust and secure authentication mechanism to your portfolio project.
            </div>
            <div className="col-6">

    <div>
      <h1 className="text-center p-3 pb-5">Sign In</h1>

      <Form onSubmit={submitHandler}>
        <Form.Group className='my-2' controlId='email'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className='my-2' controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        {isLoading && 
        <>
        <Loader/>
        <p className="mt-3 text-center">
        This website is hosted on the render free instance type ❤️, so 'Time to First Byte' may take a moment. Your patience is appreciated.
        </p>
        </>
        }

        <Button type='submit' variant='primary' className='mt-3'>
          Sign In
        </Button>
      </Form>

      <Row className='py-3'>
        <Col>
          New User? <Link to={`/register`}>Register</Link>
        </Col>
      </Row>
    </div>
            
            </div>
          </div>
       
        </div>
    )
};


export default Login;