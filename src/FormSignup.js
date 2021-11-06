import React ,{useRef, useState}from 'react';
import './Form.css';
import {useAuth} from './Handler/AuthContext'
const FormSignup = () => {
  const emailRef = useRef();
  const usernameRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const {signup , currentUser} = useAuth();
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handlerSubmit(e){
    e.preventDefault();
    if(passwordRef !== passwordConfirmRef){
      return setError('Passwword do not Match')
    }
    try {
      setError('')
      setLoading(true)
      await signup(emailRef.current.value, passwordRef.current.value)
    } catch {
      setError('Failed to signUp')
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
          <label className='form-label'>Nama</label>
          <input
            className='form-input'
            type='text'
            name='username'
            placeholder='Masukan Nama'
            ref = {usernameRef}
          />

        </div>
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
        <div className='form-inputs'>
          <label className='form-label'>Konfirmasi Password</label>
          <input
            className='form-input'
            type='password'
            name='password2'
            placeholder='Konfirmasi Password'
            ref={passwordConfirmRef}
          />

        </div>
        <button className='form-input-btn' type='submit'>
          Sign up
        </button>
        <span className='form-input-login'>
          Sudah punya akun? Login <a href='/login'>disini</a>
        </span>
      </form>
    </div>
  );
};

export default FormSignup;
