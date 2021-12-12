import React,{useState, useEffect, useRef} from 'react'
import {Container, Card,Button, Form} from 'react-bootstrap'
import Navbarx from '../Component/Navbar'
import CRUDHandler from '../Handler/CRUDHandler'

const Edit = () => {
    const [getAlat,setGetAlat ] = useState(null)
    const [getKota, setGetKota] = useState('')
    const [ getNama, setGetNama ] = useState(null)
    const [getData, setGetData ] = useState('')
    const [updateNama, setUpdateNama] = useState()
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
            for(let id in Data) {
                getKota.push(Data[id])
            }
            setGetKota(getKota)
            if(getNama != null){
            getData.push(getNama)
        }
            setGetData(getData)
            
            
        })
        if(updateNama != null){
      CRUDHandler.update(getData, updateNama)
    }
        
    
        
             
        
    
    }, [getAlat, getNama, updateNama]);
    
    return (
        <>
       <Navbarx/>
       <Container>
           <Button onClick={() => setGetAlat('LokasiDebit')}>Debit</Button>
           <Button onClick={() => setGetAlat('LokasiQuality')}>Quality</Button>
           
                    <Card fluid='lg'>
                           {getKota && getKota.map((item, i) => (
                             <Card fluid key={i} onClick={() => setGetNama(item)}>
                             <Card.Body>
                                 <Card.Title>
                                     {item.nama}
                                 </Card.Title>
                                 <Card.Text>{item.latitude}</Card.Text>
                                 <Card.Text>{item.longitude}</Card.Text>
                             </Card.Body>
                         </Card>
                               
                           ))}
                     </Card>
                     <Card fluid>
                         <Card.Body>
                         {Object.keys(getData) ? Object.keys(getData).map((i, key) => ( 
                             <>
                         <Form>
                         <Form.Group className="md-3">
                        <Form.Label style={{ color: '#000' }}>Keterangan</Form.Label>
                        <Form.Control key={key}  type="text" value={getData[i].nama}/>
                        </Form.Group>
                        <Form.Group className="md-3">
                        <Form.Label style={{ color: '#000' }}>Latitude</Form.Label>
                        <Form.Control  key={key} type="text" onChange={(e)=> setFormData({...formData, latitude: e.target.value})} defaultValue={getData[i].latitude} />
                        </Form.Group>
                        <Form.Group className="md-3">
                        <Form.Label style={{ color: '#000' }}>Longitude</Form.Label>
                        <Form.Control key={key} type="text" onChange={(e)=> setFormData({...formData, longitude: e.target.value})} defaultValue={getData[i].longitude} />
                        </Form.Group>
                        <Button onClick={()=>setUpdateNama(formData)}>Update</Button>
                         </Form>
                         </>
                         )): null}
                         
                         </Card.Body>

                     </Card>
       </Container>
       </>
    )
}

export default Edit
