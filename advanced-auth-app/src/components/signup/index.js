import React from "react";
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Loader from "../Loader.js";
import { setCredentials } from '../../slices/auth.js'
import { useRegisterMutation } from "../../slices/userApiSlice.js";
import './index.scss';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, {isLoading}] = useRegisterMutation();

  const { userInfo } = useSelector((state)=>state.auth);

  useEffect(()=>{
    if(userInfo){
      navigate('/');
    }
  }, [navigate, userInfo])

  const submitHandler = async (e) => {
    e.preventDefault();
    if(password !== confirmPassword){
      toast.error("passwords Do not match")
    }else{
      try{
        const res = await register({name, email, password}).unwrap();
        dispatch(setCredentials({...res}));
        navigate('/');
       }catch(err){
        toast.error(err?.data?.message || err.error);
       }
    }


  };

    return(
        <div className="container">
       

    <div className="registerForm">
      <h1 className="text-center p-3 pb-1">Register</h1>

      <Form onSubmit={submitHandler}>
      <Form.Group className='my-2' controlId='name'>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type='name'
            placeholder='Enter name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>

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

        <Form.Group className='my-2' controlId='confirmPassword'>
          <Form.Label>Confirm password</Form.Label>
          <Form.Control
            type='password'
            placeholder='confirm password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        {isLoading && <Loader />}

        <Button type='submit' variant='primary' className='mt-3'>
         Register
        </Button>
      </Form>

      <Row className='py-2'>
        <Col>
          Already a user? <Link to={`/login`}>Login</Link>
        </Col>
      </Row>
    </div>
            
            
       
        </div>
    )
};


export default Register;