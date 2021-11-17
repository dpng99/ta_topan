import React,{useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import {Container, Form, Button, Card} from 'react-bootstrap'
import CRUDHandler from '../Handler/CRUDHandler'
import 'bootstrap/dist/css/bootstrap.min.css';  
import {toast} from 'react-toastify'
const initialState = {
    lat: '',
    lon:'',
    ket: ''
};
const Update = () => {
    const [newDataSet, setNewDataSet] = useState({})
    
   
    const [state, setState] = useState(initialState);
    const { lat, lon, ket } = state;
    
    
    const handleSubmit =() =>{

    }
    const {id} = useParams()
    useEffect(() => {
        const readData = CRUDHandler.getAll();
        readData.on('value', (snapshot) => {
          const dataSet = snapshot.val();
          const newDataSet = []
          for (let id in dataSet){
              newDataSet.push(dataSet[id]);
          }
          console.log(newDataSet);
          setNewDataSet(newDataSet);
        })
    }, [id])
    useEffect(() =>{
        if(id){
            setState({...newDataSet[id]})
        }else{
            setState({...initialState})
        }
        return()=>{
            setState({...initialState})
        }

    },[id, newDataSet])
    const handleUpdate =(e) => {
        e.preventDefault();
        if(!lat || !lon || !ket){

        }

        
    };
    return (
        <Container flex>
            <Card>
                <Card.Body>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Latitude</Form.Label>
                    <Form.Control value={lat || " "} onChange={handleUpdate} type="text"> </Form.Control>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label >Latitude</Form.Label>
                    <Form.Control value={lon || " "} onChange={handleUpdate} type="text"> </Form.Control>
                </Form.Group>
                <Button variant="primary" type="submit"></Button>
            </Form>
                </Card.Body>
            </Card>
        </Container>
    )
}

export default Update
