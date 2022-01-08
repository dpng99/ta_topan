import React,{useState, useEffect} from 'react'
import {Container, Card,Button, Row, Col} from 'react-bootstrap'
import Navbarx from '../Component/Navbar'
import CRUDHandler from '../Handler/CRUDHandler'
import 'bootstrap/dist/css/bootstrap.min.css';

const Edit = () => {
    const [getAlat,setGetAlat ] = useState(null)
    const [getKota, setGetKota] = useState('')

    
    useEffect(() => {
        const Alat = CRUDHandler.getLocation()
      
        Alat.on('value', snapshot =>{
            const Data = snapshot.child(getAlat).val()
            const getKota = []
   
            for(let id in Data) {
                getKota.push(Data[id])
            }
            setGetKota(getKota)
       
           
            
        })
     
        
        
        
    
        
             
        
    
    }, [getAlat]);
    
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
                    <Card className="p-4" fluid='xxl' >
                        <Row  xs={'auto'} md={'auto'} xl={'auto'} xxl={'auto'} >
                           {getKota && getKota.map((item, i) => (
                               <Col>
                             <Card className='border-2 border-primary p-3 shadow rounded-3 m-2'  fluid key={i}>
                               
                             <Card.Body>
                                 <Card.Header >
                                     {item.nama}
                                 </Card.Header>
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
