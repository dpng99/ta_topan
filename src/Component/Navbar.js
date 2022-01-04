import React,{useState} from 'react'
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useAuth } from '../Handler/AuthContext';
import { useHistory } from 'react-router';
import 'bootstrap/dist/css/bootstrap.min.css';


function Navbarx() {
    const[error, setError]= useState();
    const{currentUser, logout} = useAuth();
    const history = useHistory();
   async function handleLogout(){
        setError('');

        try {
            await logout();
            history.push('/login')
        } catch  {
            setError('logout failed');
        }
    }
    

    return (
        <>
        <Navbar className="bg-primary" expand="lg">
        <Container fluid className="">
        <Navbar.Brand href="/" className='text-white'>
              <img
                alt=""
                src="img/pdam4.png"
                width="30"
                height="30"
                className="d-inline-block align-top"
              />{' '}
            DASHBOARD PDAM KABUPATEN MADIUN
            </Navbar.Brand>
           
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <NavDropdown title="Menu" id="basic-nav-dropdown">
                <NavDropdown.Item href="/edit">Data Lokasi Portable APP</NavDropdown.Item>
                <NavDropdown.Item href="/adddata">Add New Data</NavDropdown.Item>
                <NavDropdown.Item href="/history">Monitoring EWS APP</NavDropdown.Item>
                <NavDropdown.Item href="/monitoring">Monitoring Portable APP</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
              </NavDropdown>
            </Nav>
            
          </Navbar.Collapse>
          <Navbar.Brand onClick={handleLogout} className='text-white'>
              <img
                alt=""
                src="img/logout.png"
                width="30"
                height="30"
                className="d-inline-block align-top"
              />{' '}
              Logout
            </Navbar.Brand>
            
        </Container>
      </Navbar>
      </>
    );
}

export default Navbarx
