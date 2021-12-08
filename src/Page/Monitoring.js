import React,{useState, useEffect} from 'react'
import { Container, Dropdown } from 'react-bootstrap'
import Navbarx from '../Component/Navbar'
import CRUDHandler from '../Handler/CRUDHandler'

const Monitoring = () => {
    const [DataSet, setDataSet] = useState('')
    const [ DataChild, setDataChild] = useState('')
    const [ DataKey, setDataKey] = useState('')
    useEffect(() => {
        const enumerate = CRUDHandler.getMonitor()
        enumerate.on('value', (snapshot) => {
            const dataSnip = snapshot.child('LokasiDebit').val();
            const dataSnip2 = snapshot.child('LokasiQuality').val();
            const DataSet = [];
            const DataKey = [];
            for(let id in dataSnip) {
                DataSet.push(dataSnip[id])
            }
            for(let id in dataSnip2) {
                DataKey.push(dataSnip2[id])
            }

            setDataSet(DataSet)
            setDataKey(DataKey)
        })
    }, [])
    
    return (
        <>
        <Navbarx/>
        <Container>
            <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
             Lokasi Debit
             </Dropdown.Toggle>

         <Dropdown.Menu>{DataSet ? DataSet.map((item, index) => (
             <Dropdown.Item key={index}>{item.nama}</Dropdown.Item>
         )): null}
        
        
        </Dropdown.Menu>
        </Dropdown>
        <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
             Lokasi Quality
             </Dropdown.Toggle>

         <Dropdown.Menu>
             {DataKey ? DataKey.map((item, index) => (
                <Dropdown.Item key={index} >{item.nama}</Dropdown.Item>
             )): null}
        
        </Dropdown.Menu>
        </Dropdown>

        </Container>
        </>
    )
}

export default Monitoring
