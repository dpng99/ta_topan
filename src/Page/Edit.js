import { Container, ListGroup, Card, Button } from 'react-bootstrap'
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
    this.onDataChange2 = this.onDataChange2.bind(this)
    this.setAlat = this.setAlat.bind(this)
    this.state = {
    dataSet: [],
    dataSet2: [], 
    currentData: null,
    currentIndex: -1,
    dataDebit: null,
    dataQuality: null
    };
}
componentDidMount(){
CRUDHandler.getLocation().child('LokasiDebit').on('value', this.onDataChange) 
CRUDHandler.getLocation().child('LokasiQuality').on('value', this.onDataChange2)
CRUDHandler.getLocation().on('value', this.setAlat)

}
componentWillUnmount(){
   CRUDHandler.getLocation().off('value', this.onDataChange)
   CRUDHandler.getLocation().off('value', this.onDataChange2)
}

onDataChange(items){
   let dataset =[];
   items.forEach((item) =>{
       let key = item.key
        let data = item.val();
        dataset.push({
            key: key,
             nama: data.nama,
             latitude: data.latitude,
             longitude: data.longitude,

         
        })
    })
    this.setState({dataset: dataset})
    console.log(dataset)
}
onDataChange2(items){
    let dataset =[];
    items.forEach((item) =>{
        let key = item.key
         let data = item.val();
         dataset.push({
             key: key,
             nama: data.nama,
             latitude: data.latitude,
             longitude: data.longitude,
          
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
setAlat(item){
     let dataSet2 = []
     item.forEach((item) =>{
         let key = item.key
         let data = item.val()
        
     })
     this.setState({dataSet2: dataSet2})
     console.log(dataSet2)
}

 

    render() {
        const {dataset,dataSet2, currentData, currentIndex, dataDebit, dataQuality} = this.state
        return (
           <Container fluid="xxl">
               <Navbarx/>
               {dataSet2.map((item, key) => 
               <>
               <Button key={key} onClick={() => this.setAlat(dataDebit)}>{item.nama}</Button>
               </>
             
               )}
               
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

