import React,{useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import { Container, Button, Table, FormControl } from 'react-bootstrap'
import Navbarx from '../Component/Navbar'
import CRUDHandler from '../Handler/CRUDHandler'
import 'bootstrap/dist/css/bootstrap.min.css';
const Edit = () => {
  const [lon, setLon]= useState('');
  const [lat, setLat]= useState('');
  const [newDataSet, setNewDataSet]= useState('');
  const [editData, setEditData]= useState('');
  const handleOnChange = (e)=>{
      setLon(e.target.value);
      setLat(e.target.value);
  }
  const createCoord = () =>{
      const coordsRef = CRUDHandler();
      const dataCoord = {
          lon,
          lat

      };
      CRUDHandler.create(dataCoord)

  };
  useEffect(() => {
      const readData = CRUDHandler.getAll();
      readData.on('value', (snapshot) => {
        const dataSet = snapshot.val();
        const newDataSet = []
        for (let id in dataSet){
            newDataSet.push(dataSet[id]);
        }
        console.log(newDataSet);
        setNewDataSet(newDataSet);
      })
  }, [])
  
    return (
<>
    <Container fluid="xxl">
    <Navbarx />
    <Table striped bordered hover>
    <thead>
     <tr>
      <th>No</th>
      <th>Latitude</th>
      <th>Longitude</th>
      <th>Status</th>
      <th>Update</th>
    </tr>
    </thead>
     <tbody>
        {Object.keys(newDataSet).map((data, index) => 
        <><tr key={data}><td>{index +1}</td><td>{newDataSet[data].lat}</td><td>{newDataSet[data].lon}</td><td>{newDataSet[data].ket}</td><td><Link to={`/update/${data}`}><Button >Edit</Button></Link></td></tr></>
         )}
  </tbody>
</Table>
       </Container>
   </>
    )
    
}

export default Edit
