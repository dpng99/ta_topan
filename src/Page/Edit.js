import { Container, Button, ListGroup, Card } from 'react-bootstrap'
import Navbarx from '../Component/Navbar'
import CRUDHandler from '../Handler/CRUDHandler'
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react'
import Update from './Update'

export class Edit extends Component {   
    constructor(props){
    super(props);
    this.refreshlist = this.refreshlist.bind(this)
    this.setDataEdit = this.setDataEdit.bind(this)
    this.onDataChange = this.onDataChange.bind(this)
    this.state = {
    dataSet: [],
    currentData: null,
    currentIndex: -1,
    };
}
componentDidMount(){
   CRUDHandler.getAll().on('value', this.onDataChange)
}
componentDidUnmount(){
   CRUDHandler.getAll().off('value', this.onDataChange)
}
onDataChange(items){
   let dataset =[];
   items.forEach((item) =>{
       let key = item.key
        let data = item.val();
        dataset.push({
            key: key,
            lat: data.lat,
            lon: data.lon,
            ket: data.ket
        })
    })
    this.setState({dataset: dataset})
}
refreshlist(){
   this.setState({
        currentData: null,
        currentIndex: -1
   })
}
setDataEdit(datum, index){
   this.setState({
       currentData: datum,
       currentIndex: index,
   });
}

    render() {
        const {dataset, currentData, currentIndex} = this.state
        return (
           <Container fluid="xxl">
               <Navbarx/>
               <Card>
                   <Card.Body>
                       <ListGroup as="ul">
                           {dataset && dataset.map((datum, index) =>(
                           <ListGroup.Item as={'li' + (index === currentIndex ? "active" : "")}
                           onClick={() => this.setDataEdit(datum, index)}
                           key={index}
                           >
                               {datum.ket}
                           </ListGroup.Item>
                           ))}
                       </ListGroup>
                       {currentData ? (
                        <Update datum={currentData}
                            refreshList={this.refreshList}
                        />
                       ) : (" ")}
                   </Card.Body>
               </Card>
           </Container>
        )
    }
}

export default Edit

