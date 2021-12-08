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
              const NewDataSet = snapshot.child(id).child('/Submitted').val();
              for(let id in NewDataSet){
                  DataHistory.push(NewDataSet[id])
              }
          }
          setDataHistory(DataHistory)
          console.log(DataHistory)
        
          
          setDataSet(DataSet);
          console.log(DataSet);
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
                        <th>Nama</th>
                        <th>Temperature</th>
                        <th>TDS</th>
                        <th>Time</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.keys(DataHistory).map((data, index) => 
                    <tr key={data}>
                        <td>{index+1}</td>
                        <td>{DataHistory[data].sumur}</td>
                        <td>{DataHistory[data].temperature}</td>
                        <td>{DataHistory[data].tds}</td>
                        <td>{DataHistory[data].time}</td>
                    </tr>
                    )}
                </tbody>
            </Table>
        </Container>
        </>
    )
}

export default Riwayat
