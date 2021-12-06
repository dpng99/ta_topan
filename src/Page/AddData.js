import React, { Component } from 'react'
import CRUDHandler from '../Handler/CRUDHandler'
import Navbarx from '../Component/Navbar'
import {Card, Container, Form, Button} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';  
export class AddData extends Component {
    constructor(props) {
        super(props);
        this.onChangeLatitude = this.onChangeLatitude.bind(this)
        this.onChangeLongitude = this.onChangeLongitude.bind(this)
        this.onChangeKeterangan = this.onChangeKeterangan.bind(this)
        this.saveData = this.saveData.bind(this)
        this.state ={
            lat: 0,
            lon: 0,
            ket:''
        }
    }
    onChangeLatitude(e){
        this.setState({
            lat: e.target.value,
        });
    }
    onChangeLongitude(e){
        this.setState({
            lon: e.target.value,
        });
    }
    onChangeKeterangan(e){
        this.setState({
            ket: e.target.value
        });
    }
    saveData(){
        let data ={
            lat: this.state.lat,
            lon: this.state.lon,
            ket: this.state.ket
        }
        CRUDHandler.create(data)
        .then(() =>{
            console.log("data berhasil dimasukkan")
        }).catch((e) =>{
            console.log(e)
        })
    }

    render() {
        return (
            <>
             <Navbarx/>
            <Container fluid>
                <Card>
                    <Card.Body>
                        <Form>
                            <Form.Group className="md-3">
                                <Form.Label style={{ color: '#000' }}>Latitude</Form.Label>
                                <Form.Control type="number" value={this.state.lat} onChange={this.onChangeLatitude}/>
                            </Form.Group>
                            <Form.Group className="md-3">
                                <Form.Label style={{ color: '#000' }}>Longitude</Form.Label>
                                <Form.Control type="number" value={this.state.lon} onChange={this.onChangeLongitude}/>
                            </Form.Group>
                              <Form.Group className="md-3">
                                <Form.Label style={{ color: '#000' }}>Keterangan</Form.Label>
                                <Form.Control type="text" value={this.state.ket} onChange={this.onChangeKeterangan}/>
                            </Form.Group>
                        </Form>
                        <Button onClick={this.saveData} >Save</Button>
                    </Card.Body>
                </Card>
            </Container>
            </>
        )
    }
}

export default AddData
