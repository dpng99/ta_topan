/* eslint-disable no-const-assign */
import React,{useState, useEffect} from 'react'
import { Container, Card, Form, Button } from 'react-bootstrap'
import Navbarx from '../Component/Navbar'
import CRUDHandler from '../Handler/CRUDHandler'

const AddData = () => {
    const [ getAlat, setGetAlat] = useState (null)
    const [formData, setFormData ]  = useState ({
        latitude: '',
        longitude: ''
    })   
    const [ latitude, setLatitude] = useState ('')
    const [ longitude, setLongitude] = useState ('')
    const [listData, setListData] = useState ([])
    const [setChild, setChildData] = useState(null)
    useEffect(() => {
        const getAll = CRUDHandler.getEws()
        getAll.on('value', snapshot => {
           const Isi = snapshot.child(getAlat).val()
            const listData = []
            for(let child in Isi) {
                listData.push(Isi[child])
            }
            setListData(listData)
            console.log(listData)
        })
       
       
    }, [getAlat, setChild])
    const handleSubmit = (e) =>{
        e.preventDefault()
        CRUDHandler.create(getAlat, setChild, formData)
        
    }
    return (
        <>
        <Navbarx/>
        <Container>
            <Container className="align-item-center justify-content-center d-flex">
                <Button onClick={() => setGetAlat('flow-meter')}>Flow meter</Button>
                <Button onClick={() => setGetAlat('panel-pompa')}>Panel Pompa</Button>
                <Button onClick={() => setGetAlat('pressure-solar')}>Pressure Solar</Button>
                <Button onClick={() => setGetAlat('pressurePoint')}>Pressure Point</Button>
                <Button onClick={() => setGetAlat('pressureSensor')}>Pressure Sensor</Button>
            </Container>
            {listData ? listData.map((item, index) =>
            <>
            <Container className="align-item-center justify-content-center d-flex">
            <Button key={index} onClick={()=> setChildData(`${item.nama}`)}>{item.nama}</Button>
            </Container>
            
            </>
            ): null}
            <Card fluid>
             <Form onSubmit={handleSubmit}>
                 <Form.Group>
                     <Form.Label className='text-black font-monospace size-2'>Latitude</Form.Label>
                     <Form.Control type="text"  onChange={(e)=> setFormData({...formData, latitude: e.target.value})} value={formData.latitude} />
                 </Form.Group>
                 <Form.Group>
                     <Form.Label className='text-black font-monospace size-2'>Longitude</Form.Label>
                     <Form.Control type="text"  onChange={(e)=> setFormData({...formData, longitude: e.target.value})} value={formData.longitude}/>
                 </Form.Group>
                 <Button type='submit' value="submit">Submit</Button>
             </Form>
             </Card>
        </Container>
        </>
    )
}

export default AddData
