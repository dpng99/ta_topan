/* eslint-disable no-const-assign */
import React,{useState, useEffect} from 'react'
import { Container, Card, Form, Button, ToggleButton, Modal  } from 'react-bootstrap'
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
    const [listData, setListData] = useState (null)
    const [setChild, setChildData] = useState('')
    const [ key, getKey] = useState(null)
    const [ isOpen, setIsOpen] = useState(false)
    const x = null
    useEffect(() => {
        const getAll = CRUDHandler.getEws().orderByKey()
        getAll.on('value', snapshot => {
            const allData = snapshot.child(getAlat).val()
            const listData = []
            listData.push(allData)
            setListData(listData)
            const x = Object.keys(Object.assign({}, ...listData));
            getKey(x)
            console.log(key)
            
          
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
                <Button  style={{ margin: '10px 10px 10px 10px' }} onClick={() => setGetAlat('flow-meter')}>Flow meter</Button>
                <Button style={{ margin: '10px 10px 10px 10px' }}  onClick={() => setGetAlat('panel-pompa')}>Panel Pompa</Button>
                <Button style={{ margin: '10px 10px 10px 10px' }}  onClick={() => setGetAlat('pressure-solar')}>Pressure Solar</Button>
                <Button style={{ margin: '10px 10px 10px 10px' }}  onClick={() => setGetAlat('pressurePoint')}>Pressure Point</Button>
                <Button style={{ margin: '10px 10px 10px 10px' }}  onClick={() => setGetAlat('pressureSensor')}>Pressure Sensor</Button>
            </Container>
            {key ? key.map((item) =>
            
            <>
            <Container className="align-item-center justify-content-center d-flex">
            <ToggleButton
            key={item}
            type="radio"
            variant={item % 2 ? 'outline-success' : 'outline-danger'}
            name="radio"
            onClick={(e) => setChildData(item)}
          >
            {item}
          </ToggleButton>
            </Container>
            </>
        ): null}
        
       <Modal show={isOpen} onHide={isOpen}>
             <Modal.Dialog className="alert overflow-auto position-sticky">
                    <Modal.Header closeButton onClick={()=> setIsOpen(false)}>
                      <Modal.Title>{getAlat}</Modal.Title>
                     </Modal.Header>

                    <Modal.Body>
                            <p>{setChild}</p>
                            <p>{formData.latitude}</p>
                            <p>{formData.longitude}</p>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button  variant="primary" onClick={()=>setIsOpen(false)}>Save changes</Button>
                        </Modal.Footer>
                        </Modal.Dialog>
                        </Modal>
                    
                      
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
                 <Button type='submit' value="submit" onClick={() => setIsOpen(true)}>Submit</Button>
             </Form>
             </Card>
             
        </Container>
        </>
    )
}

export default AddData
