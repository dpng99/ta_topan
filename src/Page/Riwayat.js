import React,{useEffect, useState} from 'react'
import { Button, Card, Container, Accordion, Table } from 'react-bootstrap'
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
        <Container>
     <Card fluid className="p-4 shadow" style={{ marginTop: '20px' , background: 'white'}}>
        <Container className="d-flex align-content-start justify-content-start position-relative "> 
         <h1 className="fs-3 text">Ews Monitoring</h1>       
         </Container>
         <Container className="d-flex align-content-end justify-content-end">
        <Button className='btn rounded-3 ' style={{ margin: '10px 10px 10px 10px' }} onClick={() =>setGetChild('flow-meter')}>Flow Meter</Button>
        <Button className='btn rounded-3 ' style={{ margin: '10px 10px 10px 10px' }} onClick={() =>setGetChild('panel-pompa')}>Panel Pompa</Button>
        <Button className='btn rounded-3 ' style={{ margin: '10px 10px 10px 10px' }} onClick={() =>setGetChild('pressure-solar')}>Pressure Solar</Button>
        </Container>
       <Container>
            {Object.keys(getData) ? Object.keys(getData).map((item,index) => ( 
            
              <Accordion defaultActiveKey={index}>
                  <Accordion.Item eventKey={index}>
                  <Accordion.Header>{getData[item].nama}</Accordion.Header>
                  <Accordion.Body>
                  
            <Card className='border-2 border-primary p-3 shadow rounded-3 d-flex'>
                
                <Card.Title>
                    {getData[item].nama}
                </Card.Title>
                {setChild === 'flow-meter'  ?
                <>
                
                <Container className='align-items-start justify-form-content-right '>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                        <th>Energy Flow</th>
                        <th>FlowRate</th>
                        <th>Fluid Sound</th>
                        <th>Negative Acc</th>
                        <th>Positive Acc</th>
                        <th>Temp Inlet</th>
                        <th>Temp Outlet</th>
                        <th>Velocity</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <td>{getData[item].energyFlow }</td>
                        <td>{getData[item].flowRate}</td>
                        <td>{getData[item].fluidSoundSpeed }</td>
                        <td>{getData[item].negativeAcc}</td>
                        <td>{getData[item].positiveAcc}</td>
                        <td>{getData[item].tempInlet}</td>
                        <td>{getData[item].tempOutlet}</td>
                        <td>{getData[item].velocity}</td>
                        </tr>
                    </tbody>
                    </Table>
                </Container>
                <Container className='align-items-center justify-content-center d-flex'>
                    <Chart 
                                    width={200}
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
                                    width={200}
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
                </Container>
               
                
                </>
                 : null}
                {setChild === 'panel-pompa' ? 
                  <>
                  <Table striped bordered hover>
                    <thead>
                        <tr>
                        <th>Current R</th>
                        <th>Current S</th>
                        <th>Current T</th>
                        <th>Frequency</th>
                        <th>Power</th>
                        <th>Power Factor</th>
                        <th>Volt R</th>
                        <th>Volt S</th>
                        <th>Volt T</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <td>{getData[item].currentR}</td>
                        <td>{getData[item].currentS}</td>
                        <td>{ getData[item].currentT}</td>
                        <td>{getData[item].frequency}</td>
                        <td>{getData[item].power}</td>
                        <td>{getData[item].powerFactor}</td>
                        <td>{getData[item].voltR}</td>
                        <td>{getData[item].voltS}</td>
                        <td>{getData[item].voltT}</td>
                     
                        </tr>
                    </tbody>
                    </Table> 
                { getData[item].led1 && getData[item].led2 && getData[item].led3 && getData[item].led4 && getData[item].led5 && getData[item].led6 ?
                    <>
                    <Table striped bordered hover>
                    <thead>
                        <tr>
                        <th>{getData[item].led1.nama}</th>
                        <th>{getData[item].led2.nama}</th>
                        <th>{getData[item].led3.nama}</th>
                        <th>{getData[item].led4.nama}</th>
                        <th>{getData[item].led5.nama}</th>
                        <th>{ getData[item].led6.nama}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <td>{+getData[item].led1.value}</td>
                        <td>{+getData[item].led2.value}</td>
                        <td>{+getData[item].led3.value}</td>
                        <td>{+getData[item].led4.value}</td>
                        <td>{+getData[item].led5.value}</td>
                        <td>{+getData[item].led6.value}</td>
                        </tr>
                    </tbody>
                    </Table>  
                    </>
            : null }
            {getData[item].relay1 || getData[item].relay2 ? 
            <> 
         <Table striped bordered hover>
                    <thead>
                        <tr>
                        <th>{getData[item].relay1.nama}</th>
                        <th>{getData[item].relay2.nama}</th>
                 
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <td>{+getData[item].relay1.trigger}</td>
                        <td>{+getData[item].relay2.trigger}</td>
                  
                        </tr>
                    </tbody>
                    </Table>  
        </> : null}
            <Container>
            <Chart 
                                    width={200}
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
                                    width={200}
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
                                     </Container>


                </>

                : null}
                { setChild === 'pressure-solar' 
                ? 
                  <>
                  <Container>
                  <Table striped bordered hover>
                    <thead>
                        <tr>
                        <th>Current</th>
                        <th>Pressure Bar</th>
                        <th>Pressure Psi</th>
                        <th>Voltage</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <td>{getData[item].current}</td>
                        <td>{getData[item].pressureBar}</td>
                        <td>{ getData[item].pressurePsi}</td>
                        <td>{getData[item].voltage}</td>
                        </tr>
                    </tbody>
                    </Table>
                    </Container>
                <Container>
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
                                    </Container>
                </>
                : null}         
                  
            </Card>
            </Accordion.Body>
            </Accordion.Item>
            </Accordion>
         
        )) : null}

           </Container>
           </Card>
        </Container>
   
        </>
    )
}

export default Riwayat
