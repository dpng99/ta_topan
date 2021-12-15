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
        <Button className='shadow ' style={{ margin: '10px 10px 10px 10px' }} onClick={() =>setGetChild('flow-meter')}>Flow Meter</Button>
        <Button style={{ margin: '10px 10px 10px 10px' }} onClick={() =>setGetChild('panel-pompa')}>Panel Pompa</Button>
        <Button style={{ margin: '10px 10px 10px 10px' }} onClick={() =>setGetChild('pressure-solar')}>Pressure Solar</Button>
        <Button style={{ margin: '10px 10px 10px 10px' }} onClick={() =>setGetChild('pressurePoint')}>Pressure Point</Button>
        <Button style={{ margin: '10px 10px 10px 10px' }} onClick={() =>setGetChild('pressureSensor')}>Pressure Sensor</Button>
        </Container>
        <Container>     
        <Row xs={1} md={2} xl={4} xxl={4} className="g-4" style={{ marginTop:'10px' }}>
            {Object.keys(getData) ? Object.keys(getData).map((item,index) => ( 
            <Col>
              
            <Card key={index}>
           
                <Card.Title>
                    {getData[item].nama}
                </Card.Title>
                {setChild === 'flow-meter'  ?
                <>
                <Card.Text>Energy Flow : {getData[item].energyFlow }</Card.Text>
                <Card.Text>Flow Rate :{getData[item].flowRate}</Card.Text>
                <Card.Text>Fluid Sound Speed :{getData[item].fluidSoundSpeed }</Card.Text>
                <Card.Text>Negative Acc : {getData[item].negativeAcc}</Card.Text> 
                <Card.Text>Positif Acc : {getData[item].positiveAcc}</Card.Text>
                <Card.Text>Temperatur InLet : {getData[item].tempInlet}</Card.Text>
                <Card.Text>Temperature Outlet : {getData[item].tempOutlet}</Card.Text>
                <Card.Text>Velocity : {getData[item].velocity}</Card.Text>
                </>
                 : null}
                {setChild === 'panel-pompa' ? 
                  <>
                <Card.Text>Current R : {getData[item].currentR}</Card.Text>
                <Card.Text>Current S : {getData[item].currentS}</Card.Text>
                <Card.Text>CurrentT : { getData[item].currentT}</Card.Text>
                <Card.Text>Frequency : {getData[item].frequency}</Card.Text>
                <Card.Text>Power : {getData[item].power}</Card.Text>
                <Card.Text>Power Factor : {getData[item].powerFactor}</Card.Text>
                <Card.Text> Volt R : {getData[item].voltR}</Card.Text> 
                <Card.Text>Volt S : {getData[item].voltS}</Card.Text> 
                <Card.Text>Volt T : {getData[item].voltT}</Card.Text> 
                { getData[item].led1 && getData[item].led2 && getData[item].led3 && getData[item].led4 && getData[item].led5 && getData[item].led6 ?
                    <>
                <Card.Text>{'Nama : '+ getData[item].led1.nama +' Status : '+ getData[item].led1.value}</Card.Text>
                <Card.Text>{'Nama : '+ getData[item].led2.nama +' Status : '+ getData[item].led2.value}</Card.Text>
                <Card.Text>{'Nama : '+ getData[item].led3.nama +' Status : '+ getData[item].led3.value}</Card.Text>
                <Card.Text>{'Nama : '+ getData[item].led4.nama +' Status : '+ getData[item].led4.value}</Card.Text>
                <Card.Text>{'Nama : '+ getData[item].led5.nama +' Status : '+ getData[item].led5.value}</Card.Text>
                <Card.Text>{'Nama : '+ getData[item].led6.nama +' Status : '+ getData[item].led6.value}</Card.Text>  
                    </>
            : null }
                </>

                : null}
                { setChild === 'pressure-solar' 
                ? 
                  <>
                <Card.Text>Current : {getData[item].current}</Card.Text>
                <Card.Text>Pressure Bar : {getData[item].pressureBar}</Card.Text>
                <Card.Text>Pressure Psi : { getData[item].pressurePsi}</Card.Text>
                <Card.Text>Voltage : {getData[item].voltage}</Card.Text>
                
                </>
                : null}         
                  
           
            </Card>
          
            </Col>
         
        )) : null}
           </Row>
        </Container>
        </Container>
        </>
    )
}

export default Riwayat
