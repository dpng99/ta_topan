import React ,{useRef, useState}from 'react';
import { Container, Card, Button, Image, Alert, Form, Row, Col } from 'react-bootstrap'
import { useAuth } from './Handler/AuthContext'
import { useHistory } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
const FormLogin2 = () => {
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
        <Container fluid className='p-5 m-auto d-flex flex-row'>
            <Container className='positon-relative rounded-start'>
                <Image className='img-fluid rounded img-thumbnail h-75 w-75' src='img/pdam3.png' alt='image/png'/>
            </Container>
            <Container className='position-relative rounded-end' style={{ background: 'linear-gradient(90deg, rgb(40, 40, 40) 0%, rgb(17, 17, 17) 100%)'}}>
                <Form onSubmit={handleSubmit}>
                    <h1 className='text-white'> Selamat Datang!Dashboard Website PDAM Madiun</h1>
                    <Form.Group className='m-3'>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type='email' placeholder='Masukan Email' ref={emailRef}/>
                    </Form.Group>
                    <Form.Group className='m-3'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type='password' placeholder='Masukan Password' ref={passwordRef}/>
                    </Form.Group>
                    <Button type='submit' className='btn-outline-info m-auto'>Login</Button>
                </Form>
            </Container>
        </Container>
        </>
    )
}

export default FormLogin2
