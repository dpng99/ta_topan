import React,{useState, useEffect} from 'react'
import { Container, Dropdown, Row,Col, Card, Table} from 'react-bootstrap'
import Navbarx from '../Component/Navbar'
import CRUDHandler from '../Handler/CRUDHandler'

const Monitoring = () => {
    
    const [DataSet, setDataSet] = useState('')
    const [ DataKey, setDataKey] = useState('')
    const [currentIndex, setCurrentIndex] = useState('')

    const settDataEdit = (index) => {
        
        const dataBind = CRUDHandler.getMonitor()
        dataBind.on('value', (snapshot) => {
            const DataBinning = snapshot.child('LokasiDebit').child(index).child('Submitted').val()
           const currentIndex = []
            for(let id in DataBinning) {
                    currentIndex.push(DataBinning[id])      
            }
            setCurrentIndex(currentIndex)
            
        })
        
        
        
    }
    const settingDataEdit = (index) => {
        
        const dataBind = CRUDHandler.getMonitor()
        dataBind.on('value', (snapshot) => {
            const DataBinning = snapshot.child('LokasiQuality').child(index).child('Submitted').val()
           const currentIndex = []
            for(let id in DataBinning) {
                    currentIndex.push(DataBinning[id])      
            }
            setCurrentIndex(currentIndex)
            
        })
        
        
        
    }
 
     
  
    useEffect(() => {
        const enumerate = CRUDHandler.getLocation()
        
        enumerate.on('value', (snapshot) => {
            const dataSnip = snapshot.child('LokasiDebit').val();
            const dataSnip2 = snapshot.child('LokasiQuality').val();
            const DataSet = [];
            const DataKey = [];
            for(let id in dataSnip) {
                DataSet.push(dataSnip[id])
            }
            for(let id in dataSnip2) {
                DataKey.push(dataSnip2[id])
            }
        
            setDataSet(DataSet)
            setDataKey(DataKey)
            
            
        })
        
      
     

    }, [])

    
    return (
        <>
        <Navbarx/>
        <Container >
    <Card className="p-4 shadow" style={{ marginTop: '20px' , background: 'white'}}>
        <Container className="d-flex align-content-start justify-content-start position-relative ">
   <h1 className="fs-3 text">Portable Monitoring</h1> 
   </Container>
   <Container fluid className="d-flex align-content-end justify-content-end">
            <Dropdown fluid >
            <Dropdown.Toggle  variant="primary" id="dropdown-basic" className="m-1">
             Lokasi Debit
             </Dropdown.Toggle>

         <Dropdown.Menu >
             {Object.keys(DataSet).map((item, index) => (
             <Dropdown.Item key={item} onClick={() => settDataEdit(DataSet[item].nama)
            }>
                {DataSet[item].nama}
                </Dropdown.Item>
         ))}
        </Dropdown.Menu>
        </Dropdown>
        <Dropdown fluid  >
            <Dropdown.Toggle variant="primary" id="dropdown-basic" className="m-1" >
             Lokasi Quality
             </Dropdown.Toggle>

         <Dropdown.Menu>
             {Object.keys(DataKey).map((item, index) => (
                <Dropdown.Item key={index} onClick={() => settingDataEdit(DataKey[item].nama)
                } >{DataKey[item].nama}</Dropdown.Item>
             ))}
        
        </Dropdown.Menu>
        </Dropdown>
       
        </Container>

        <Table>
       
                {Object.keys(currentIndex) ? Object.keys(currentIndex).map((item, index)=>
                
                 <>
                
                
                    { currentIndex[item].pipa && currentIndex[item].date && currentIndex[item].time && currentIndex[item].temperature && currentIndex[item].flowrate && currentIndex[item].fss && currentIndex[item].velocity && currentIndex[item].flowestimasi ?
                    <>
                     <thead>
                        <tr>
                      <th>No</th>
                      <th>Pipa</th>
                      <th>Tanggal</th>
                      <th>Waktu</th>
                      <th>Temperature</th>
                      <th>Flowrate</th>
                      <th>FSS</th>
                      <th>Velocity</th>
                      <th>Flowestimasi</th>
                      </tr>
                  </thead>
                  <tbody>
                    <tr>
                    <td>{index + 1}</td>
                    <td>{currentIndex[item].pipa}</td>
                    <td>{currentIndex[item].date}</td>
                    <td>{currentIndex[item].time}</td>
                    <td>{currentIndex[item].temperature}</td>
                    <td>{currentIndex[item].flowrate}</td>
                    <td>{currentIndex[item].fss}</td>
                    <td>{currentIndex[item].velocity}</td>
                    <td>{currentIndex[item].flowestimasi}</td>
                    </tr>
                  </tbody>
                 
                  </>
                   : null }
                    { currentIndex[item].orp && currentIndex[item].ph && currentIndex[item].tds ?
                      <>
                      <thead>
                          <tr>
                      <th>No</th>
                       <th>Sumur</th>
                       <th>Tanggal</th>
                       <th>Waktu</th>
                       <th>Temperature</th>
                       <th>orp</th>
                       <th>PH</th>
                       <th>TDS</th>
                       </tr>
                       </thead>
                       <tbody>
                        <tr>
                        <td>{index + 1}</td>
                        <td>{currentIndex[item].sumur}</td>
                        <td>{currentIndex[item].date}</td>
                        <td>{currentIndex[item].time}</td>
                        <td>{currentIndex[item].temperature}</td>
                        <td>{currentIndex[item].orp}</td>
                        <td>{currentIndex[item].ph}</td>
                        <td>{currentIndex[item].tds}</td>
                        </tr>
                      </tbody>
                      </>
                  : null  }
                    
                        </>
                )
               

                : null}
               </Table> 

        </Card>
        </Container>
        </>
    )
}

export default Monitoring
