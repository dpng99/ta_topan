import React,{useState, useEffect} from 'react'
import { Container, Image, Table } from 'react-bootstrap'
import Navbarx from '../Component/Navbar'
import CRUDHandler from '../Handler/CRUDHandler'

const Riwayat = () => {
    const [DataSet, setDataSet] = useState('');
    const [DataHistory, setDataHistory] = useState('');
    useEffect(() => {
        const readData = CRUDHandler.getHistory();
        readData.on('value', (snapshot) => {
          const dataset = snapshot.val();
          const DataSet = []
          const DataHistory = []
          for (let id in dataset){
              DataSet.push(dataset[id]);
              const NewDataSet = snapshot.child('Submitted')
              for(let NewDataSet in DataSet){
                  DataHistory.push(DataSet[NewDataSet]);
              }
          }
          setDataHistory(DataHistory);
          console.log(DataHistory);
          console.log(DataSet);
          setDataSet(DataSet);
        })
    }, [])

    return (
        <>
        <Navbarx/>
       
        <Container fluid>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Lokasi</th>
                        <th>Latitude</th>
                        <th>Longitude</th>
                        <th>LastEdit</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.keys(DataSet).map((data, index) => 
                    <tr key={data}>
                        <td>{index+1}</td>
                        <td>{DataSet[data].nama}</td>
                        <td>{DataSet[data].latitude}</td>
                        <td>{DataSet[data].longitude}</td>
                        <td>{DataSet[data].kapan}</td>
                    </tr>
                    )}
                </tbody>
            </Table>
        </Container>
        </>
    )
}

export default Riwayat
