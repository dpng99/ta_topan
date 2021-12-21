import React,{useEffect, useState} from 'react'
import { Button, Card, Container, Row, Col } from 'react-bootstrap'
import Navbarx from '../Component/Navbar'
import CRUDHandler from '../Handler/CRUDHandler'
import 'bootstrap/dist/css/bootstrap.min.css'

import {Chart} from 'react-google-charts'
const Riwayat = () => {
    const [getData, setGetData] = useState([])
    const [setChild, setGetChild] = useState(null)
    const [dataGauge, setDataGauge] = useState([])

    useEffect(() => {
        const ewsApp = CRUDHandler.getEws()
        ewsApp.on('value', snapshot =>{
            const DataIsi = snapshot.child(setChild).val()
            const getData = []
            for(let id in DataIsi) {
                getData.push(DataIsi[id])
            }
            setGetData(getData)

        })
        
    }, [setChild, dataGauge])
    return (
        <>
        <Navbarx/>
        <Container >
     <Card className="p-4 shadow" style={{ marginTop: '20px' , background: 'white'}}>
        <Container className="d-flex align-content-start justify-content-start position-relative "> 
         <h1 className="fs-3 text">Ews Monitoring</h1>       
         </Container>
         <Container className="d-flex align-content-end justify-content-end">
        <Button className='btn rounded-3 ' style={{ margin: '10px 10px 10px 10px' }} onClick={() =>setGetChild('flow-meter')}>Flow Meter</Button>
        <Button className='btn rounded-3 ' style={{ margin: '10px 10px 10px 10px' }} onClick={() =>setGetChild('panel-pompa')}>Panel Pompa</Button>
        <Button className='btn rounded-3 ' style={{ margin: '10px 10px 10px 10px' }} onClick={() =>setGetChild('pressure-solar')}>Pressure Solar</Button>
        <Button className='btn rounded-3 ' style={{ margin: '10px 10px 10px 10px' }} onClick={() =>setGetChild('pressurePoint')}>Pressure Point</Button>
        <Button className='btn rounded-3 ' style={{ margin: '10px 10px 10px 10px' }} onClick={() =>setGetChild('pressureSensor')}>Pressure Sensor</Button>
        </Container>
       
        <Row xs={1} md={2} xl={'auto'} xxl={'auto'} className="g-4 " style={{ marginTop:'10px' }}>
            {Object.keys(getData) ? Object.keys(getData).map((item,index) => ( 
            <Col>
              
            <Card key={index} className='border-2 border-primary p-3 shadow rounded-3 ' style={{ margin: '10px 10px 10px 10px' , width:'30rem' }} onClick={() => setDataGauge(getData[item])}>
           
                <Card.Title>
                    {getData[item].nama}
                </Card.Title>
                {setChild === 'flow-meter'  ?
                <>
                <Card.Text>Energy Flow = {getData[item].energyFlow }</Card.Text>
                <Card.Text>Flow Rate = {getData[item].flowRate}</Card.Text>
                <Card.Text>Fluid Sound Speed = {getData[item].fluidSoundSpeed }</Card.Text>
                <Card.Text>Negative Acc = {getData[item].negativeAcc}</Card.Text> 
                <Card.Text>Positif Acc  {getData[item].positiveAcc}</Card.Text>
                <Card.Text>Temperatur InLet = {getData[item].tempInlet}</Card.Text>
                <Card.Text>Temperature Outlet = {getData[item].tempOutlet}</Card.Text>
                <Card.Text>Velocity = {getData[item].velocity}</Card.Text>
                <Chart 
                                    width={350}
                                    height={200}
                                    chartType="Gauge"
                                    data={[
                                        ['Label', 'Value'],
                                    ['temperature Inlet', parseFloat(getData[item].tempInlet)],
                                    ['temperature Outlet', parseFloat(getData[item].tempOutlet)],
                                    ['flow Rate', parseFloat(getData[item].flowRate)],
                                    ]}
                                    options={{
                                        redFrom: 90,
                                        redTo: 100,
                                        yellowFrom: 75,
                                        yellowTo: 90,
                                        minorTicks: 5,
                                    }}
                                    />
                                     <Chart 
                                    width={300}
                                    height={200}
                                    chartType="Gauge"
                                    data={[
                                        ['Label', 'Value'],
                                    ['Energy flow', parseFloat(getData[item].energyFlow)],
                                    ['Fluid Soud', parseFloat(getData[item].fluidSoundSpeed)],
                                    
                                   
                                    ]}
                                    options={{
                                        max: 300,
                                        redFrom: 250,
                                        redTo: 300,
                                        yellowFrom: 225,
                                        yellowTo: 250,
                                        minorTicks: 100,
                                        min: 100
                                    }}
                                    />
                
                </>
                 : null}
                {setChild === 'panel-pompa' ? 
                  <>
                <Card.Text>Current R = {getData[item].currentR}</Card.Text>
                <Card.Text>Current S = {getData[item].currentS}</Card.Text>
                <Card.Text>CurrentT = { getData[item].currentT}</Card.Text>
                <Card.Text>Frequency = {getData[item].frequency}</Card.Text>
                <Card.Text>Power = {getData[item].power}</Card.Text>
                <Card.Text>Power Factor = {getData[item].powerFactor}</Card.Text>
                <Card.Text> Volt R = {getData[item].voltR}</Card.Text> 
                <Card.Text>Volt S = {getData[item].voltS}</Card.Text> 
                <Card.Text>Volt T = {getData[item].voltT}</Card.Text> 
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
            <Chart 
                                    width={350}
                                    height={200}
                                    chartType="Gauge"
                                    data={[
                                        ['Label', 'Value'],
                                    ['Power', parseFloat(getData[item].power) ],
                                    ['volt R', parseFloat(getData[item].voltR) ],
                                    ['volt S', parseFloat(getData[item].voltS) ],
                                    ['volt T', parseFloat(getData[item].voltT) ],
                              
                                    ]}
                                    options={{
                                        max: 300,
                                        redFrom: 275,
                                        redTo: 300,
                                        yellowFrom: 250,
                                        yellowTo: 275,
                                        minorTicks: 100,
                                        min: 100,
                                    }}
                                    />
                                    <Chart 
                                    width={350}
                                    height={200}
                                    chartType="Gauge"
                                    data={[
                                        ['Label', 'Value'],
                                    ['current T', parseFloat(getData[item].currentT)],
                                    ['current S', parseFloat(getData[item].currentS)],
                                    ['current R', parseFloat(getData[item].currentR)],
                                    ]}
                                    options={{
                                        max: 3000,
                                        min: 100,
                                        redFrom: 2750,
                                        redTo: 3000,
                                        yellowFrom: 2500,
                                        yellowTo: 2750,
                                        minorTicks: 100,
                                    }}
                                    />
                                     


                </>

                : null}
                { setChild === 'pressure-solar' 
                ? 
                  <>
                <Card.Text>Current = {getData[item].current}</Card.Text>
                <Card.Text>Pressure Bar = {getData[item].pressureBar}</Card.Text>
                <Card.Text>Pressure Psi = { getData[item].pressurePsi}</Card.Text>
                <Card.Text>Voltage = {getData[item].voltage}</Card.Text>
                <Chart              width={200}
                                    height={200}
                                    chartType="Gauge"
                                    data={[
                                    ['Label', 'Value'],
                                    ['pressure Bar', parseFloat(getData[item].pressureBar)],
                                    ]}
                                    options={{
                                        max: 10.0,
                                        redFrom: 9.0,
                                        redTo: 10.0,
                                        yellowFrom: 8.0,
                                        yellowTo: 9.0,
                                        minorTicks: 0.0,
                                        min: 0.0,
                                    }}
                                    />
                                    <Chart 
                                    width={200}
                                    height={200}
                                    chartType="Gauge"
                                    data={[
                                    ['Label', 'Value'],
                                    ['pressure Psi', parseFloat(getData[item].pressurePsi)],
                                    ]}
                                    options={{
                                        max: 200,
                                        redFrom: 175,
                                        redTo: 200,
                                        yellowFrom: 150,
                                        yellowTo: 175,
                                        minorTicks: 0,
                                        min: 0.0,
                                    }}
                                    />
                </>
                : null}         
                  
           
            </Card>
          
            </Col>
         
        )) : null}
           </Row>
    
           </Card>

        </Container>
   
        </>
    )
}

export default Riwayat
