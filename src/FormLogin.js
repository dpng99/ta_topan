import React ,{useRef, useState}from 'react';
import './Form.css';
import { useAuth } from './Handler/AuthContext'
import { Link, useHistory} from 'react-router-dom'
const FormLogin = () => {
  const emailRef = useRef();
  const usernameRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const history = useHistory();
  async function handlerSubmit(e){
    e.preventDefault();
  
    try {
      setError('')
      setLoading(true)
      await login (emailRef.current.value, passwordRef.current.value)
      history.push("/dashboard")
    } catch {
      setError('Failed to login')
    }
    setLoading(false)
  }
  return (
    <div className='form-content-right'>
      <form onSubmit={handlerSubmit}className='form' noValidate>
        <h1>
          Selamat Datang! Dashboard Website PDAM Madiun 
        </h1>
   
        <div className='form-inputs'>
          <label className='form-label'>Email</label>
          <input
            className='form-input'
            type='email'
            name='email'
            placeholder='Masukan Email'
            ref={emailRef}
          />

        </div>
        <div className='form-inputs'>
          <label className='form-label'>Password</label>
          <input
            className='form-input'
            type='password'
            name='password'
            placeholder='Masukan Password'
            ref={passwordRef}
          />

        </div>
    
        <button className='form-input-btn' type='submit'>
          Sign up
        </button>
        <span className='form-input-login'>
         Belum punya akun ? SignUp <a href='/'>disini</a>
        </span>
      </form>
    </div>
  );
};

export default FormLogin;
