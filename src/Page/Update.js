import React, { Component } from 'react'
import CRUDHandler from '../Handler/CRUDHandler';
import {Container, Form , Card, Button} from 'react-bootstrap'
export class Update extends Component {
    constructor(props) {
        super(props);
        this.onChangeLatitude = this.onChangeLatitude.bind(this)
        this.onChangeLongitude = this.onChangeLongitude.bind(this)
        this.onChangeKeterangan = this.onChangeKeterangan.bind(this)
        this.updateData = this.updateData.bind(this)

        this.state = {
            currentData:{
                key: null,
                lat:"",
                lon:"",
                ket: ""
            }
        }
    }
    static getDerivedStateFromProps(nextProps, prevState) {
        const {datum} = nextProps;
        if(prevState.currentData.key !== datum.key){
            return{
                currentData: datum,

            }
        }
        return prevState.currentData
    }
    componentDidMount() {
        this.setState({
            currentData: this.props.datum,
        });
    }
    updateData(){
        const dataCoord ={
            lat: this.state.currentData.lat,
            lon: this.state.currentData.lon,
            ket: this.state.currentData.ket
        };
        CRUDHandler.update(this.state.currentData.key, dataCoord)
        .then(() =>{
            this.setState({
                message: " UPDATE BERHASIL"
            });
        })
        .catch((e) =>{
            console.log(e)
        });

    }

    render() {
        const { currentData } = this.state;
        return (
        <Container fluid>
            <Card>
                {currentData ? (
                <Card.Body>
                    <Form>
                        <Form.Group className="md-3">
                            <Form.Label style={{ color: '#000' }}>Latitude</Form.Label>
                            <Form.Control type="text" value={currentData.lat} onChange={this.onChangeLatitude}/>
                        </Form.Group>
                        <Form.Group className="md-3">
                            <Form.Label style={{ color: '#000' }}>Latitude</Form.Label>
                            <Form.Control type="text" value={currentData.lon} onChange={this.onChangeLongitude}/>
                        </Form.Group>
                          <Form.Group className="md-3">
                            <Form.Label style={{ color: '#000' }}>Latitude</Form.Label>
                            <Form.Control type="text" value={currentData.ket} onChange={this.onChangeKeterangan}/>
                        </Form.Group>
                    </Form>
                    <Button onClick={this.updateData} >Save</Button>
                </Card.Body>
                ): (" ") }
            </Card>
        </Container>
            
        )
    }
}

export default Update
