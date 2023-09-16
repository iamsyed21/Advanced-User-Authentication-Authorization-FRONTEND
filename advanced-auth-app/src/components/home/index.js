import React from 'react'
import {Card, Container, Button} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap'
import './index.scss'

const Home = () => {
  return (
    <div className='container'>
         <div className=' py-5'>
      <Container className='d-flex justify-content-center'>
        <Card className='p-5 d-flex flex-column align-items-center hero-card bg-light w-75'>
          <h1 className='text-center mb-4'>MERN Authentication</h1>
          <p className='text-center mb-4'>
           
In this portfolio project, I implement a MERN stack application focused on secure authentication. I utilize JSON Web Tokens (JWT) stored in HTTP-Only cookies, leveraging Redux Toolkit for state management and the React Bootstrap library for UI. This approach offers improved security over traditional methods by restricting client-side script access to the authentication token.
<h2 className='m-3'>Why More Secure?</h2>

  <div className='listBox'>
  <ul>
  <li>
  <b className='colorixer'>HTTP-Only Cookies: </b>Storing JWTs in HTTP-Only cookies prevents client-side scripts from accessing the token, mitigating the risk of cross-site scripting (XSS) attacks.
  </li>
  <li>
  <b className='colorixer'>State Management: </b>Redux Toolkit enhances the predictability and debugging of the application state, adding an extra layer of security.
  </li>
</ul>
</div>


          </p>
          <div className='d-flex'>
            <LinkContainer to="/login">
            <Button variant='primary' className='me-4'>
              Sign In
            </Button>
            </LinkContainer>
            <LinkContainer to="register">
            <Button variant='secondary'>
              Register
            </Button>
            </LinkContainer>
          </div>

        <h5 className='linkBox'>The Source Code For This Project Is Available: <a href="https://github.com/iamsyed21/Advanced-User-Authentication-Authorization-FRONTEND" target='_blank'  rel="noreferrer" >Here</a></h5>
        </Card>
      </Container>
    </div>
      
      
      </div>
  )
}

export default Home;