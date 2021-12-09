import React,{useState, useEffect} from 'react'
import { Container, Dropdown, Image, ListGroup, Button, Card} from 'react-bootstrap'
import Navbarx from '../Component/Navbar'
import CRUDHandler from '../Handler/CRUDHandler'

const Monitoring = () => {
    
    const [DataSet, setDataSet] = useState('')
    const [ DataChild, setDataChild] = useState('')
    const [ DataKey, setDataKey] = useState('')
    const [ currentData, setcurrentData] = useState('')
    const [currentIndex, setCurrentIndex] = useState([])

    const settDataEdit = (index) => {
    
        const dataBind = CRUDHandler.getMonitor()
        dataBind.on('value', (snapshot) => {
            const DataBinning = snapshot.child('LokasiDebit').child(index).child('Submitted').val()
            for(let id in DataBinning) {
                    currentIndex.push(DataBinning[id])      
            }
                     
            
        })
        
        
        setCurrentIndex(currentIndex)
        console.log(currentIndex)   
    }
 
     
  
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
        
        <Container className='align-content-right justify-content-right d-flex flex-center'>
            <Dropdown fluid >
            <Dropdown.Toggle  variant="success" id="dropdown-basic">
             Lokasi Debit
             </Dropdown.Toggle>

         <Dropdown.Menu >
             {Object.keys(DataSet).map((item, index) => (
             <Dropdown.Item key={item} onClick={() => settDataEdit(DataSet[item].nama)
            }>
                {DataSet[item].nama}
                </Dropdown.Item>
         ))}
        </Dropdown.Menu>
        </Dropdown>

        <Dropdown fluid  >
            <Dropdown.Toggle variant="success" id="dropdown-basic">
             Lokasi Quality
             </Dropdown.Toggle>

         <Dropdown.Menu>
             {DataKey ? DataKey.map((item, index) => (
                <Dropdown.Item key={index} >{item.nama}</Dropdown.Item>
             )): null}
        
        </Dropdown.Menu>
        </Dropdown>
        <Button className="btn btn-primary" style={{ position: 'relative' }} onClick={() => window.location.reload(false)}> Tombol</Button>
        </Container>
        <Container>
                <Card>
                           {currentIndex && currentIndex.map((item, i) => (
                             <Card fluid key={i} >
                             <Card.Body>
                                 <Card.Title>
                                 {item.pipa}
                                 </Card.Title>
                                 <Card.Text>
                                     {item.date}
                                     {item.time}
                                     {item.flowrate}
                                 </Card.Text>
                             </Card.Body>
                         </Card>
                               
                           ))}
                </Card>
        </Container>
        
        </>
    )
}

export default Monitoring
