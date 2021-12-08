import { Container, ListGroup, Card } from 'react-bootstrap'
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
CRUDHandler.getLocation().on('value', this.onDataChange)

}
componentWillUnmount(){
   CRUDHandler.getLoca().off('value', this.onDataChange)
}
onDataChange(items){
   let dataset =[];
   items.forEach((item) =>{
       let key = item.key
        let data = item.child('/Submitted').val();
        dataset.push({
            key: key,
            date: data.date,
            orp: data.orp,
            ph: data.ph,
            nama: data.sumur,
            tds: data.tds,
            temperature: data.temperature,
            waktu: data.time,
            turbidity: data.turbidity

         
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
                               {datum.nama}
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

