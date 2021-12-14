import React,{useEffect, useState} from 'react'
import { Button, Card, Container, Row, Col } from 'react-bootstrap'
import Navbarx from '../Component/Navbar'
import CRUDHandler from '../Handler/CRUDHandler'
import 'bootstrap/dist/css/bootstrap.min.css'
const Riwayat = () => {
    const [getData, setGetData] = useState([])
    const [setChild, setGetChild] = useState(null)

    useEffect(() => {
        const ewsApp = CRUDHandler.getEws()
        ewsApp.on('value', snapshot =>{
            const DataIsi = snapshot.child(setChild).val()
            const getData = []
            for(let id in DataIsi) {
                getData.push(DataIsi[id])
            }
            setGetData(getData)
            console.log(getData)
        })
    }, [setChild])
    return (
        <>
        <Navbarx/>
        <Container>
        <Container className='align-content-center justify-content-center d-flex' >
        <Button style={{ margin: '10px 10px 10px 10px' }} onClick={() =>setGetChild('flow-meter')}>Flow Meter</Button>
        <Button style={{ margin: '10px 10px 10px 10px' }} onClick={() =>setGetChild('panel-pompa')}>Panel Pompa</Button>
        <Button style={{ margin: '10px 10px 10px 10px' }} onClick={() =>setGetChild('pressure-solar')}>Pressure Solar</Button>
        <Button style={{ margin: '10px 10px 10px 10px' }} onClick={() =>setGetChild('pressurePoint')}>Pressure Point</Button>
        <Button style={{ margin: '10px 10px 10px 10px' }} onClick={() =>setGetChild('pressureSensor')}>Pressure Sensor</Button>
        </Container>
        <Container>     
        <Row xs={1} md={2} xl={4} xxl={4} className="g-4" style={{ marginTop:'10px' }}>
            {Object.keys(getData).map((item,index) => ( 
            <Col>
              
            <Card key={index}>
           
                <Card.Title>
                    {getData[item].nama}
                </Card.Title>
                <Card.Text>{getData[item].energyFlow ||getData[item].currentR || getData[item].current}</Card.Text>
                <Card.Text>{getData[item].flowRate || getData[item].currentS || getData[item].pressureBar}</Card.Text>
                <Card.Text>{getData[item].fluidSoundSpeed || getData[item].currentT || getData[item].pressurePsi}</Card.Text>
                <Card.Text>{getData[item].negativeAcc || getData[item].power || getData[item].voltage}</Card.Text> 
                <Card.Text>{getData[item].positiveAcc || getData[item].powerFactor}</Card.Text>
                <Card.Text>{getData[item].tempInlet || getData[item].voltR}</Card.Text>
                <Card.Text>{getData[item].tempOutlet || getData[item].voltS}</Card.Text>
                <Card.Text>{getData[item].velocity || getData[item].voltT}</Card.Text>
                  {getData[item].led1 && getData[item].led2 && getData[item].led3 && getData[item].led4 && getData[item].led5 && getData[item].led6 ? 
                  <>
                <Card.Text>{'Nama : '+ getData[item].led1.nama +' Status : '+ getData[item].led1.value}</Card.Text>
                <Card.Text>{'Nama : '+ getData[item].led2.nama +' Status : '+ getData[item].led2.value}</Card.Text>
                <Card.Text>{'Nama : '+ getData[item].led3.nama +' Status : '+ getData[item].led3.value}</Card.Text>
                <Card.Text>{'Nama : '+ getData[item].led4.nama +' Status : '+ getData[item].led4.value}</Card.Text>
                <Card.Text>{'Nama : '+ getData[item].led5.nama +' Status : '+ getData[item].led5.value}</Card.Text>
                <Card.Text>{'Nama : '+ getData[item].led6.nama +' Status : '+ getData[item].led6.value}</Card.Text> 
                </>
                : ""}       
                
           
            </Card>
          
            </Col>
         
        ))}
           </Row>
        </Container>
        </Container>
        </>
    )
}

export default Riwayat
