import React ,{useRef, useState}from 'react';
import './Form.css';
import { useAuth } from './Handler/AuthContext'
import { useHistory } from 'react-router-dom';
import {Alert } from 'react-bootstrap'
const FormSignup = () => {
  const emailRef = useRef();
  const usernameRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const history = useHistory();
  async function handleSubmit(e){
    e.preventDefault(); 
    if(passwordRef.current.value !== passwordConfirmRef.current.value){
      return setError('Passwword do not Match')
    }
    try {
      setError('')
      setLoading(true)
      await signup(emailRef.current.value, passwordRef.current.value)
      history.push('/login')
    } 
    catch {
      setError('Failed to signUp')
    }
    setLoading(false)
  }
  return (
    <>
    <div className='form-container'>
    <span className='close-btn'>×</span>
    <div className='form-content-left'>
      <img className='form-img' src='img/pdam1.jpg' alt='spaceship' />
    </div>
    
    <div className='form-content-right'>
      {error && <Alert variant="danger">{error}</Alert>}
      <form onSubmit={handleSubmit} className='form' noValidate>
        <h1>
          Selamat Datang! Dashboard Website PDAM Madiun 
        </h1>
        <div className='form-inputs'>
          <label className='form-label'>Nama</label>
          <input
            className='form-input'
            type='text'
            placeholder='Masukan Nama'
            ref = {usernameRef}
          />

        </div>
        <div className='form-inputs'>
          <label className='form-label'>Email</label>
          <input
            className='form-input'
            type='email'
            placeholder='Masukan Email'
            ref={emailRef}
          />
        </div>
        <div className='form-inputs'>
          <label className='form-label'>Password</label>
          <input
            className='form-input'
            type='password'
            placeholder='Masukan Password'
            ref={passwordRef}
          />
        </div>
        <div className='form-inputs'>
          <label className='form-label'>Konfirmasi Password</label>
          <input
            className='form-input'
            type='password'
            placeholder='Konfirmasi Password'
            ref={passwordConfirmRef}
          />
        </div>
        <button disabled={loading} className='form-input-btn' type='submit'>
          Sign up
        </button>
        <span className='form-input-login'>
          Sudah punya akun? Login <a href='/login'>disini</a>
        </span>
      </form>
    </div>
    </div>
    </>
  );
};

export default FormSignup;
