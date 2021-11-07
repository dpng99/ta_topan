import React from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import './Dashboard.css'
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

const Dashboard = () => {
      

        return (
           <>
 <Navbar bg="primary">
  <Container fluid>
  <Navbar.Brand href="#home">
        <img
          alt=""
          src="img/pdam1.jpg"
          width="40"
          height="40"
          className="d-inline-block align-top"
        />{' '}
      PDAM KABUPATEN MADIUN
      </Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="me-auto">
        <NavDropdown title="Menu" id="basic-nav-dropdown">
          <NavDropdown.Item href="#action/3.1">Edit</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item href="#action/3.4">Logout</NavDropdown.Item>
        </NavDropdown>
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>


 <div className= "leaflet-container ">
              <div className="leaflet-wrapper">
<           MapContainer center={[-7.6300605, 111.4930317]} zoom={13} scrollWheelZoom={false}>
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[-7.6300605, 111.4930317]}>
              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
            </Marker>
          </MapContainer>
          </div>
            </div>
            </>
            

        );
}
    

export default Dashboard;
