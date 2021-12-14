import React,{useState, useEffect, useRef} from 'react'
import {Container, Card,Button, Form} from 'react-bootstrap'
import Navbarx from '../Component/Navbar'
import CRUDHandler from '../Handler/CRUDHandler'

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
           <Button onClick={() => setGetAlat('LokasiDebit')}>Debit</Button>
           <Button onClick={() => setGetAlat('LokasiQuality')}>Quality</Button>
           
                    <Card fluid='lg'>
                           {getKota && getKota.map((item, i) => (
                             <Card fluid key={i} onClick={() => setGetNama(item,setGetChild(item.nama))}>
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
                
       </Container>
       </>
    )
}

export default Edit
