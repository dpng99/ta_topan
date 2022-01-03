import React,{useEffect, useState} from 'react'
import { Button, Card, Container, Row, Col } from 'react-bootstrap'
import Navbarx from '../Component/Navbar'
import CRUDHandler from '../Handler/CRUDHandler'
import 'bootstrap/dist/css/bootstrap.min.css'

import {Chart} from 'react-google-charts'
const Riwayat2 = () => {
    const [getData, setGetData] = useState([])
    const [setChild, setGetChild] = useState(null)
    const [dataGauge, setDataGauge] = useState([])
    const [dataCard, setDataCard] = useState(null)
    const [getAllData, setGetAllData] = useState([])
    const [refresh, setRefresh] = useState([])
    const [key, setKey] = useState(null)

    useEffect(() => {
        const AllData = CRUDHandler.getEws()
        AllData.on('value', snapshot => {
            if(setChild !== null) {
            const FirstData = snapshot.child(setChild).val()
            const getData = []
            getData.push(FirstData)
            setGetData(getData)
            const x =  Object.keys(Object.assign({}, ...getData));
            setKey(x)
            if(dataCard !== null) {
            const SecondData = snapshot.child(setChild).child(dataCard).val()
            const getAllData = []
            getAllData.push(SecondData)
             setGetAllData(getAllData)
            }
            else{
                
            }
        }
           
      
        })
    }, [setChild, dataCard])
    return (
        <>
        <Navbarx/>
        <Container>
            <Card>
                <Container>
                <h1 className="fs-3 text">Ews Monitoring</h1> 
                </Container>
                <Container className="d-flex align-content-end justify-content-end">
                <Button className='btn rounded-3 ' style={{ margin: '10px 10px 10px 10px' }} onClick={() =>setGetChild('flow-meter')}>Flow Meter</Button>
                <Button className='btn rounded-3 ' style={{ margin: '10px 10px 10px 10px' }} onClick={() =>setGetChild('panel-pompa')}>Panel Pompa</Button>
                <Button className='btn rounded-3 ' style={{ margin: '10px 10px 10px 10px' }} onClick={() =>setGetChild('pressure-solar')}>Pressure Solar</Button>
                </Container>
                <Container className="d-flex align-content-end justify-content-end">
                    {key ? key.map((item) => 
                  <Button className='btn rounded-3 ' style={{ margin: '10px 10px 10px 10px' }} onClick={() =>setDataCard(item)}>{item}</Button>
                  ) : null}
                  </Container>
                  <Container>
       
            
            <Card className='border-2 border-primary p-3 shadow rounded-3 ' >
                {setChild === 'flow-meter'  ?
                        <>
                {Object.keys(getAllData) ? Object.keys(getAllData).map((item) => 
                    <>
                 <Card.Title>
                    {getAllData[item].nama}
                </Card.Title>
                <Card.Text>Energy Flow = {getAllData[item].energyFlow }</Card.Text>
                <Card.Text>Flow Rate = {getAllData[item].flowRate}</Card.Text>
                <Card.Text>Fluid Sound Speed = {getAllData[item].fluidSoundSpeed }</Card.Text>
                <Card.Text>Negative Acc = {getAllData[item].negativeAcc}</Card.Text> 
                <Card.Text>Positif Acc  {getAllData[item].positiveAcc}</Card.Text>
                <Card.Text>Temperatur InLet = {getAllData[item].tempInlet}</Card.Text>
                <Card.Text>Temperature Outlet = {getAllData[item].tempOutlet}</Card.Text>
                <Card.Text>Velocity = {getAllData[item].velocity}</Card.Text>
                <Container>
                <Chart 
                                    width={200}
                                    height={200}
                                    chartType="Gauge"
                                    data={[
                                        ['Label', 'Value'],
                                    ['temperature Inlet', parseFloat(getAllData[item].tempInlet)],
                                    ['temperature Outlet', parseFloat(getAllData[item].tempOutlet)],
                                    ['flow Rate', parseFloat(getAllData[item].flowRate)],
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
                                    width={200}
                                    height={200}
                                    chartType="Gauge"
                                    data={[
                                        ['Label', 'Value'],
                                    ['Energy flow', parseFloat(getAllData[item].energyFlow)],
                                    ['Fluid Soud', parseFloat(getAllData[item].fluidSoundSpeed)],
                                    
                                   
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
                                    </Container>
                                    </>
                
                ) : ''}
                </>
                 : ''}
                {setChild === 'panel-pompa' ? 
                <>
                 {Object.keys(getAllData) ? Object.keys(getAllData).map((item) => 
                  <>
                   <Card.Title>
                    {getAllData[item].nama}
                </Card.Title>
                <Card.Text>Current R = {getAllData[item].currentR}</Card.Text>
                <Card.Text>Current S = {getAllData[item].currentS}</Card.Text>
                <Card.Text>CurrentT = { getAllData[item].currentT}</Card.Text>
                <Card.Text>Frequency = {getAllData[item].frequency}</Card.Text>
                <Card.Text>Power = {getAllData[item].power}</Card.Text>
                <Card.Text>Power Factor = {getAllData[item].powerFactor}</Card.Text>
                <Card.Text> Volt R = {getAllData[item].voltR}</Card.Text> 
                <Card.Text>Volt S = {getAllData[item].voltS}</Card.Text> 
                <Card.Text>Volt T = {getAllData[item].voltT}</Card.Text> 
                { getAllData[item].led1 && getAllData[item].led2 && getAllData[item].led3 && getAllData[item].led4 && getAllData[item].led5 && getAllData[item].led6 ?
                    <>
                <Card.Text>{'Nama : '+ getAllData[item].led1.nama +' Status : '+ getAllData[item].led1.value}</Card.Text>
                <Card.Text>{'Nama : '+ getAllData[item].led2.nama +' Status : '+ getAllData[item].led2.value}</Card.Text>
                <Card.Text>{'Nama : '+ getAllData[item].led3.nama +' Status : '+ getAllData[item].led3.value}</Card.Text>
                <Card.Text>{'Nama : '+ getAllData[item].led4.nama +' Status : '+ getAllData[item].led4.value}</Card.Text>
                <Card.Text>{'Nama : '+ getAllData[item].led5.nama +' Status : '+ getAllData[item].led5.value}</Card.Text>
                <Card.Text>{'Nama : '+ getAllData[item].led6.nama +' Status : '+ getAllData[item].led6.value}</Card.Text>  
                    </>
            : null }
            <Container>
            <Chart 
                                    width={200}
                                    height={200}
                                    chartType="Gauge"
                                    data={[
                                        ['Label', 'Value'],
                                    ['Power', parseFloat(getAllData[item].power) ],
                                    ['volt R', parseFloat(getAllData[item].voltR) ],
                                    ['volt S', parseFloat(getAllData[item].voltS) ],
                                    ['volt T', parseFloat(getAllData[item].voltT) ],
                              
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
                                    width={200}
                                    height={200}
                                    chartType="Gauge"
                                    data={[
                                        ['Label', 'Value'],
                                    ['current T', parseFloat(getAllData[item].currentT)],
                                    ['current S', parseFloat(getAllData[item].currentS)],
                                    ['current R', parseFloat(getAllData[item].currentR)],
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
                                     </Container>


                </>
                 ) : ''}
                    </>
                : ''}
                { setChild === 'pressure-solar' 
                ? 
                <>
                {Object.keys(getAllData) ? Object.keys(getAllData).map((item) => 
                  <>
                   <Card.Title>
                    {getAllData[item].nama}
                </Card.Title>
                <Card.Text>Current = {getAllData[item].current}</Card.Text>
                <Card.Text>Pressure Bar = {getAllData[item].pressureBar}</Card.Text>
                <Card.Text>Pressure Psi = { getAllData[item].pressurePsi}</Card.Text>
                <Card.Text>Voltage = {getAllData[item].voltage}</Card.Text>
                <Container>
                <Chart              width={200}
                                    height={200}
                                    chartType="Gauge"
                                    data={[
                                    ['Label', 'Value'],
                                    ['pressure Bar', parseFloat(getAllData[item].pressureBar)],
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
                                    ['pressure Psi', parseFloat(getAllData[item].pressurePsi)],
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
                                    </Container>
                </>
                ) : ''}
                </>
                : ''}         
                  
           
            </Card>
           </Container>
            </Card>
        </Container>
        </>
    )
}

export default Riwayat2
