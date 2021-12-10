import React,{useState, useEffect} from 'react'
import { Container, Dropdown, Image, ListGroup, Button, Card} from 'react-bootstrap'
import Navbarx from '../Component/Navbar'
import CRUDHandler from '../Handler/CRUDHandler'

const Monitoring = () => {
    
    const [DataSet, setDataSet] = useState('')
    const [ DataKey, setDataKey] = useState('')
    const [currentIndex, setCurrentIndex] = useState('')
    const [ currentIndex2, setCurrentIndex2] = useState('')

    const settDataEdit = (index) => {
        
        const dataBind = CRUDHandler.getMonitor()
        dataBind.on('value', (snapshot) => {
            const DataBinning = snapshot.child('LokasiDebit').child(index).child('Submitted').val()
           const currentIndex = []
            for(let id in DataBinning) {
                    currentIndex.push(DataBinning[id])      
            }
            setCurrentIndex(currentIndex)
            
        })
        
        
        
    }
    const settingDataEdit = (index) => {
        
        const dataBind = CRUDHandler.getMonitor()
        dataBind.on('value', (snapshot) => {
            const DataBinning = snapshot.child('LokasiQuality').child(index).child('Submitted').val()
           const currentIndex2 = []
            for(let id in DataBinning) {
                    currentIndex2.push(DataBinning[id])      
            }
            setCurrentIndex2(currentIndex2)
            
        })
        
        
        
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
        
        <Container className='align-content-center justify-content-center d-flex flex-center'>
            <Dropdown fluid >
            <Dropdown.Toggle  variant="success" id="dropdown-basic" style={{width: '150px', height: '40px',margin: '5px 10px 10px 10px'}}>
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
        <Button style={{ position: 'relative', padding: '5px  5px 3px 10px', margin: '5px 10px 10px 10px', width: '150px', height: '40px' }}onClick={() => window.location.reload(false)}>↔️</Button>
        <Dropdown fluid  >
            <Dropdown.Toggle variant="success" id="dropdown-basic" style={{width: '150px', height: '40px', margin: '5px 10px 10px 10px'}}>
             Lokasi Quality
             </Dropdown.Toggle>

         <Dropdown.Menu>
             {Object.keys(DataKey).map((item, index) => (
                <Dropdown.Item key={index} onClick={() => settingDataEdit(DataKey[item].nama)
                } >{DataKey[item].nama}</Dropdown.Item>
             ))}
        
        </Dropdown.Menu>
        </Dropdown>
       
        </Container>
        <Container style={{ width: '500px', height: '500px'}} >
                <Card >
                           {currentIndex && currentIndex.map((item, i) => (
                             <Card fluid key={i} >
                             <Card.Body >
                                 <Card.Title>
                                 PIPA {item.pipa}
                                 </Card.Title>
                                 <Card.Text>Tanggal : {item.date}</Card.Text>
                                     <Card.Text>Waktu : {item.time}</Card.Text>
                                     <Card.Text>Flowrate : {item.flowrate}</Card.Text>
                                     <Card.Text>FSS : {item.fss}</Card.Text>
                                    <Card.Text>Temperature : {item.temperature}</Card.Text>
                                    <Card.Text>Flowrate : {item.flowrate}</Card.Text>
                                 
                             </Card.Body>
                         </Card>
                               
                           ))}
                </Card>
                <Card>
                           {currentIndex2 && currentIndex2.map((item, i) => (
                             <Card fluid key={i} >
                             <Card.Body>
                                 <Card.Title>
                                 SUMUR {item.sumur}
                                 </Card.Title>
                                 <Card.Text>Tanggal : {item.date}</Card.Text>
                                     <Card.Text>Waktu: {item.time}</Card.Text>
                                     <Card.Text>ORP : {item.orp}</Card.Text>
                                     <Card.Text>PH  : {item.ph}</Card.Text>
                                     <Card.Text>TDS : {item.tds}</Card.Text>
                                    <Card.Text> Temperatur : {item.temperature}</Card.Text>
                                    <Card.Text>Turbidty : {item.turbidity}</Card.Text>
                                 
                             </Card.Body>
                         </Card>
                               
                           ))}
                </Card>
        </Container>
        
        </>
    )
}

export default Monitoring
