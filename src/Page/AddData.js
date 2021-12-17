/* eslint-disable no-const-assign */
import React,{useState, useEffect} from 'react'
import { Container, Card, Form, Button } from 'react-bootstrap'
import Navbarx from '../Component/Navbar'
import CRUDHandler from '../Handler/CRUDHandler'
import ReactLogger from 'react-terminal-logger/console-logger'
const AddData = () => {
    const [ getAlat, setGetAlat] = useState (null)
    const [formData, setFormData ]  = useState ({
        latitude: '',
        longitude: ''
    })   
    const [ latitude, setLatitude] = useState ('')
    const [ longitude, setLongitude] = useState ('')
    const [listData, setListData] = useState (null)
    const [setChild, setChildData] = useState(null)
    const [dataIsi, setDataIsi] = useState([])
    const [ key, getKey] = useState(null)
  
    useEffect(() => {
        const getAll = CRUDHandler.getEws().orderByKey()
        getAll.once('value', snapshot => {
             const Oalah = snapshot.child(getAlat)
             const KeyState = snapshot.child(getAlat).forEach(function (data){
                const key = data.key
                getKey(key)
                
             })
             const allData = Oalah.val()
             const listData = []
             const arrayKosong = []
             for(let id in allData) {
                listData.push(allData[id])
           }
           
     console.log(arrayKosong)
        setListData(listData)
         // ReactLogger.start(listData)
         console.log(listData)
 
        })
       
        
        
                
    }, [getAlat])
 

    const handleSubmit = (e) =>{
        e.preventDefault()
         
        
        CRUDHandler.create(getAlat,setChild,formData)
      
        
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
            {listData && key ? listData.map((item, index) =>
         
            <>
            <Container className="align-item-center justify-content-center d-flex">
            <Button key={key} onClick={()=> setChildData(`${key}`)}>{item.nama}</Button>
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
