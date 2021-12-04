import React from 'react'

import './Dashboard.css'
import Navbarx from '../Component/Navbar';
import MapContainer from '../Component/MapContainer';
import { Container } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css"
const Dashboard = () => {


        return (
           <>
          <Navbarx />
          <Container className='center'>
          <MapContainer/>
          </Container>
        
            </>
            

        );
}
    

export default Dashboard;