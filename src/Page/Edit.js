import React,{useState, useEffect} from 'react'
import { Container, Button, Table } from 'react-bootstrap'
import CRUDHandler from '../Handler/CRUDHandler'
const Edit = () => {
  const [lon, setLon]= useState('');
  const [lat, setLat]= useState('');
  const [newDataSet, setNewDataSet]= useState('');
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
    <Container>

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
      <tr>
      
        {newDataSet ? newDataSet.map((data) => 
        <><td>1</td><td>{data.lat}</td><td>{data.lon}</td><td>@mdo</td><td><Button>Edit</Button></td></>
         ):'' }
         
      
    </tr>
  </tbody>
</Table>
       </Container>
   </>
    )
    
}

export default Edit
