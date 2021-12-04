import React,{useState, useEffect} from 'react'
import { Container, Table } from 'react-bootstrap'
import Navbarx from '../Component/Navbar'
import CRUDHandler from '../Handler/CRUDHandler'

const Riwayat = () => {
    const [DataSet, setDataSet] = useState('');
    useEffect(() => {
        const readData = CRUDHandler.getHistory();
        readData.on('value', (snapshot) => {
          const dataset = snapshot.val();
          const DataSet = []
          for (let id in dataset){
              DataSet.push(dataset[id]);
          }
          console.log(DataSet);
          setDataSet(DataSet);
        })
    }, [])

    return (
        <>
        <Navbarx/>
        <Container >
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Nama Alat</th>
                        <th>Latitude</th>
                        <th>Longitude</th>
                        <th>LastEdit</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.keys(DataSet).map((data, index) => 
                    <tr key={data}>
                        <td>{index+1}</td>
                        <td>{DataSet[data].ket}</td>
                        <td>{DataSet[data].lat}</td>
                        <td>{DataSet[data].lon}</td>
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
