import React,{useState, useEffect} from 'react'
import {Container, Card, ListGroup, CardGroup, Dropdown, Button} from 'react-bootstrap'
import Navbarx from '../Component/Navbar'
import CRUDHandler from '../Handler/CRUDHandler'

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
            console.log(getKota)
        })
    
    }, [getAlat])
    return (
        <>
       <Navbarx/>
       <Container>
           <Button onClick={() => setGetAlat('LokasiDebit')}>Debit</Button>
           <Button onClick={() => setGetAlat('LokasiQuality')}>Quality</Button>
           
           <Card>
                           {getKota && getKota.map((item, i) => (
                             <Card fluid key={i} >
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
