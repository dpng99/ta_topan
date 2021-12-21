import React,{useState, useEffect, useRef} from 'react'
import {Container, Card,Button, Form, Image, Row, Col} from 'react-bootstrap'
import Navbarx from '../Component/Navbar'
import CRUDHandler from '../Handler/CRUDHandler'
import 'bootstrap/dist/css/bootstrap.min.css';

const Edit = () => {
    const [getAlat,setGetAlat ] = useState(null)
    const [getKota, setGetKota] = useState('')
    const [ getNama, setGetNama ] = useState(null)
    const [getData, setGetData ] = useState('')
    const [setChild, setGetChild] = useState('')
    const [updateNama, setUpdateNama] = useState([])
    const [ updateAll, setUpdateAll] = useState([])

    const [formData, setFormData] = useState({
        latitude: "",
        longitude: ""
    })
    
    useEffect(() => {
        const Alat = CRUDHandler.getLocation()
      
        Alat.on('value', snapshot =>{
            const Data = snapshot.child(getAlat).val()
            const getKota = []
            const getData = []
            const updateAll = []
            for(let id in Data) {
                getKota.push(Data[id])
            }
            setGetKota(getKota)
            
            setGetData(getData)
            if(getNama != null){
                getData.push(getNama)
              
            }
           
            
        })
     
        
        
        
    
        
             
        
    
    }, [getAlat, getNama]);
    
    return (
        <>
       <Navbarx/>
       <Container>
       <Card className="p-4 shadow" style={{ marginTop: '20px' , background: 'white'}}>
           <Container className="d-flex align-content-start justify-content-start position-relative ">
           <h1 className="fs-3 text">Data Lokasi Portable</h1>    
           </Container>
           <Container className="d-flex align-content-end justify-content-end">
           <Button className='btn rounded-3 ' style={{ margin: '10px 10px 10px 10px', width: '150px', height: '40px',margin: '5px 10px 10px 10px' }}  onClick={() => setGetAlat('LokasiDebit')}>Debit</Button>
           <Button className='btn rounded-3 ' style={{ margin: '10px 10px 10px 10px', width: '150px', height: '40px',margin: '5px 10px 10px 10px'}}  onClick={() => setGetAlat('LokasiQuality')}>Quality</Button>
           </Container>
                    <Card fluid='xxl' >
                        <Row  xs={'auto'} md={'auto'} xl={'auto'} xxl={'auto'} className="g-4 " style={{ marginTop:'10px' }}>
                           {getKota && getKota.map((item, i) => (
                               <Col>
                             <Card className='border-2 border-primary p-3 shadow rounded-3 ' style={{ margin: '10px 10px 10px 10px' , width:'20rem' }} fluid key={i} onClick={() => setGetNama(item,setGetChild(item.nama))}>
                               
                             <Card.Body>
                                 <Card.Title>
                                     {item.nama}
                                 </Card.Title>
                                 <Card.Text>Latitude = {item.latitude}</Card.Text>
                                 <Card.Text>Longitude = {item.longitude}</Card.Text>
                             </Card.Body>
                         </Card>
                         </Col>
                           ))}
                            </Row>
                           </Card> 
                          
                      
                
                     </Card>
                   
       </Container>
       </>
    )
}

export default Edit
