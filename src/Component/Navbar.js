import React,{useState} from 'react'
import { Navbar, Container, Nav, Offcanvas, Image, NavDropdown} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useAuth } from '../Handler/AuthContext';
import { useHistory } from 'react-router';
import 'bootstrap/dist/css/bootstrap.min.css';
import { RiMapPinAddLine } from "react-icons/ri";
import { BsFiles } from "react-icons/bs";
import { IoPhonePortraitOutline } from "react-icons/io5";
import { MdLogout } from "react-icons/md";
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
  <Navbar style={{ backgroundImage: 'url(/img/bgbaru.png)' }} expand={false}>
  <Container fluid>
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
    <Navbar.Toggle aria-controls="offcanvasNavbar" className='bg-white' />
    <Navbar.Offcanvas
      id="offcanvasNavbar"
      aria-labelledby="offcanvasNavbarLabel"
      placement="start"
    >
      <Offcanvas.Header className='p-0'>
      <Image fluid src='/img/BG.png'/>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Nav className="justify-content-end flex-grow-1 pe-3">
          <Nav.Link  className='text-black' href="/edit"><BsFiles className='m-1'/> Portable APP</Nav.Link>
          <Nav.Link className='text-black'  href="/adddata"><RiMapPinAddLine className='m-1' /> Add New Data</Nav.Link>
          <Nav.Link className='text-black'  href="/history"><IoPhonePortraitOutline className='m-1'/> EWS APP</Nav.Link>
          <Nav.Link className='text-black'  href="/monitoring"><IoPhonePortraitOutline className='m-1'/>Monitoring Portable APP</Nav.Link>
          <NavDropdown.Divider />
          <Nav.Link className='text-black'  onClick={handleLogout} ><MdLogout className='m-1'/>Logout</Nav.Link>
        </Nav>
      </Offcanvas.Body>
    </Navbar.Offcanvas>
  </Container>
</Navbar>
      </>
    );
}

export default Navbarx
