import React,{useState} from 'react'
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useAuth } from '../Handler/AuthContext';
import { useHistory } from 'react-router';

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
        <Navbar bg="primary" expand="lg">
        <Container className="">
        <Navbar.Brand href="#home">
              <img
                alt=""
                src="../../public/img/pdam1.jpg"
                width="30"
                height="30"
                className="d-inline-block align-top"
              />{' '}
            React Bootstrap
            </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <NavDropdown title="Menu" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Edit</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      </>
    );
}

export default Navbarx
