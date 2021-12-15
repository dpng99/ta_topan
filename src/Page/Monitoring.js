import React,{useState, useEffect} from 'react'
import { Container, Dropdown, Row,Col, Button, Card} from 'react-bootstrap'
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
           const currentIndex = []
            for(let id in DataBinning) {
                    currentIndex.push(DataBinning[id])      
            }
            setCurrentIndex(currentIndex)
            
        })
        
        
        
    }
 
     
  
    useEffect(() => {
        const enumerate = CRUDHandler.getLocation()
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
        <Row xs={1} md={2} xl={'auto'} xxl={'auto'} className="g-4" style={{ marginTop:'10px' }}>
                           {currentIndex ? currentIndex.map((item, i) => (
                               <Col>
                             <Card fluid key={i} >
                             <Card.Body >
                                 <Card.Title>
                                 {item.pipa||item.sumur}
                                 </Card.Title>
                             
                                 <Card.Text>Tanggal : {item.date}</Card.Text>
                                     <Card.Text>Waktu : {item.time}</Card.Text>
                                     <Card.Text>Temperature : {item.temperature }</Card.Text>
                                     { item.flowrate && item.fss && item.velocity && item.flowestimasi ?
                                     <>
                                     <Card.Text>Flowrate: {item.flowrate}</Card.Text>
                                     <Card.Text>FFS : {item.fss }</Card.Text>
                                    <Card.Text>Velocity : {item.velocity}</Card.Text>
                                    <Card.Text>Flowestimasi : {item.flowestimasi}</Card.Text>
                                    </>
                                : null}
                                 {  item.orp && item.ph && item.tds ? 
                                 <>
                                  <Card.Text>PH : { item.ph}</Card.Text>
                                  <Card.Text> TDS : { item.tds}</Card.Text>
                                  <Card.Text>ORP : { item.orp}</Card.Text>
                                  <Card.Text>Turbidity : { item.turbidity}</Card.Text>
                                    
                                 </>
                                 :''}
                             </Card.Body>
                         </Card>
                         </Col>
                           )): ''}
                           </Row>
              
                
        </Container>
        
        </>
    )
}

export default Monitoring
