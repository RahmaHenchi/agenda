import { useState } from 'react';
import { useHistory } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { Form, Button } from 'react-bootstrap';

import { requestRegister } from '../redux/actions/userActionCreators';

import { alertError } from '../utils/feedback';

function Register() {
  const dispatch = useDispatch()
  const history = useHistory()
  const [registerData, setRegisterData] = useState({
    userName: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault();
    const { userName, email, password, confirmPassword } = registerData
    
    if (!userName) {
      return alertError('userName is required')
    }
    if (!email) {
      return alertError('email is required')
    }
    if (!password) {
      return alertError('password is required')
    }
    if (!confirmPassword) {
      return alertError('you have to confirm your password')
    }
    if (password !== confirmPassword) {
      return alertError('passwords mismatch')
    }
    dispatch(requestRegister({ userName, email, password }, history))
  }
  function handleChange(e) {
    setRegisterData(prevEvent => ({ ...prevEvent, [e.target.name]: e.target.value }))
  }
  return (
    <Form onSubmit={handleSubmit} className="container mt-5" >
      <Form.Group className="mb-3">
        <Form.Label>UserName :</Form.Label>
        <Form.Control
          type='text'
          value={registerData.userName}
          onChange={handleChange}
          name='userName'
        />
      </Form.Group>
      
      <Form.Group className="mb-3">
        <Form.Label>Email :</Form.Label>
        <Form.Control
          type='email'
          value={registerData.email}
          onChange={handleChange}
          name='email'
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Password :</Form.Label>
        <Form.Control
          type='password'
          value={registerData.password}
          onChange={handleChange}
          name='password'
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Confirm Password :</Form.Label>
        <Form.Control
          type='password'
          value={registerData.confirmPassword}
          onChange={handleChange}
          name='confirmPassword'
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  )
}

export default Register;