import React from 'react';
import './Form.css';

const FormSuccess = () => {
  return (
    <div className='form-content-right'>
      <h1 className='form-success'>We have received your request!</h1>
        <a href='/login'>
      <img className='form-img-2' src='img/img-3.svg' alt='success-image' />
      </a>
    </div>
  );
};

export default FormSuccess;