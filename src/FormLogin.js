import React ,{useRef, useState}from 'react';
import './Form.css';
import { useAuth } from './Handler/AuthContext'
import {Alert, Container} from 'react-bootstrap'
import { useHistory} from 'react-router-dom'
const FormLogin = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const history = useHistory();
  async function handleSubmit(e){
    e.preventDefault();
  
    try {
      setError('')
      setLoading(true)
      await login (emailRef.current.value, passwordRef.current.value)
      history.push('/')
    } catch {
      setError('Failed to login')
    }
    setLoading(false)
  }
  return (
    
    <>
    <Container fluid='sm'>
    <div className='form-container'>
      <span className='close-btn'>×</span>
      <div className='form-content-left'>
        <img className='form-img' src='img/pdam1.jpg' alt='spaceship' />
      </div>
    
    <div className='form-content-right'>
        <form onSubmit={handleSubmit} className='form' noValidate>
        {error && <Alert variant="danger">{error}</Alert>}
          <h1>
            Selamat Datang!Dashboard Website PDAM Madiun
          </h1>
          <div className='form-inputs'>
            <label className='form-label'>Email</label>
            <input
              className='form-input'
              type='email'
            
              placeholder='Masukan Email'
              ref={emailRef} />

          </div>
          <div className='form-inputs'>
            <label className='form-label'>Password</label>
            <input
              className='form-input'
              type='password'

              placeholder='Masukan Password'
              ref={passwordRef} />

          </div>

          <button className='form-input-btn' type='submit'>
            Sign up
          </button>
          <span className='form-input-login'>
            Belum punya akun?SignUp <a href='/signup'>disini</a>
          </span>
        </form>
      </div>
      </div>
      </Container>
      </>
    
  )
};

export default FormLogin;
