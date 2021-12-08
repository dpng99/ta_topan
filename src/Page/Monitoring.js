import React,{useState, useEffect} from 'react'
import { Container, Dropdown, Image} from 'react-bootstrap'
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
        <Image src='/img/bg2.jpg' style={{ width: '100%', height: '100%', overflow: 'hidden', position: 'absolute'}}/>
        <Container>
            <Dropdown fluid className='align-content-left justify-content-left d-grid grid-content' style={{ margin: '10px 50px 50px 50px', padding: '50px  50px 50px 50px' }}>
            <Dropdown.Toggle  variant="success" id="dropdown-basic">
             Lokasi Debit
             </Dropdown.Toggle>

         <Dropdown.Menu >{DataSet ? DataSet.map((item, index) => (
             <Dropdown.Item key={index}>{item.nama}</Dropdown.Item>
         )): null}
        </Dropdown.Menu>
        </Dropdown>

        <Dropdown fluid className='align-content-right justify-content-right d-grid grid-content' style={{ margin: '50px 50px 50px 50px', padding: '50px  50px 50px 50px' }}>
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
