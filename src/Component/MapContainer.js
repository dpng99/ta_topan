import React,{useState, useEffect} from 'react'
import { GoogleMap, LoadScript, Marker, InfoWindow} from '@react-google-maps/api'
import CRUDHandler from '../Handler/CRUDHandler';
import { Container } from 'react-bootstrap';

const MapContainer = () => {
  const [dataSet, setDataSet] = useState([]);
  const [dataSet2, setDataSet2] = useState([]);
  const [activeMarker, setActiveMarker] = useState(null)
  const [ews, setEwsEvents] = useState([])
  const handleActiveMarker = (marker) => {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
  };
  useEffect(() => {
    const Ews = CRUDHandler.getEws()
    const getData = CRUDHandler.getLocation();
    getData.on('value', (snapshot) =>{
      const dataValue = snapshot.child('LokasiDebit').val()
      const DataValue2 = snapshot.child('LokasiQuality').val()
      const dataSet2 = []
      const dataSet = []
      for(let id in dataValue){
        dataSet.push(dataValue[id])
      }
      for(let id in DataValue2){
        dataSet2.push(DataValue2[id])
      }
      setDataSet2(dataSet2)
      setDataSet(dataSet)
    })
    Ews.on('value', snapshot =>{
      const flowMeter = snapshot.child('flow-meter').val()
      const panelPompa = snapshot.child('panel-pompa').val()
      const pressureSolar = snapshot.child('pressure-solar').val()
      const pressurePoint = snapshot.child('pressurePoint').val()
      const pressureSensor = snapshot.child('pressureSensor').val()
      const ews = []
      for(let id in flowMeter){
          ews.push(flowMeter[id])
      }
      for(let id in panelPompa){
          ews.push(panelPompa[id])
      }
      for(let id in pressureSolar){
          ews.push(pressureSolar[id])
      }
      for(let id in pressurePoint){
          ews.push(pressurePoint[id])
      }
      for(let id in pressureSensor){
          ews.push(pressureSensor[id])
      }
      setEwsEvents(ews)
  })
  
  }, [])
  const stylingMaps = {
    maxWidth: '1420px',
    height: '640px'
  }
  const onLoad = infoWindow =>{
    console.log('infoWindows', infoWindow)
  }
  const divStyle = {
    background: `white`,
    border: `1px solid #ccc`,
    padding: 15
  }
  return (

    <LoadScript googleMapsApiKey={"AIzaSyAE3h-DKyyi1NqTEJcxRAMCCHi7bmVsj2I"}>
      <GoogleMap
      center={{ lat: -7.6300605, lng: 111.4930318 }}
      mapContainerStyle={stylingMaps}
      zoom={13}>
        {Object.keys(dataSet).map((data, index) =>
        <>
        <Marker key={index} position={{lat: parseFloat(dataSet[data].latitude), lng: parseFloat(dataSet[data].longitude)}}
        onClick={() => handleActiveMarker(data)}
        >
          {activeMarker === data ? (<InfoWindow onCloseClick={() => setActiveMarker(null)}
          ><div style={divStyle}>
            <p>{dataSet[data].nama}</p>
            <p>{dataSet[data].alamat}</p>
            
        </div>
            
          </InfoWindow>) : null}
          
          </Marker>
        </>
        
        )}
        {Object.keys(dataSet2).map((data, index) =>
          
          <>
          <Marker key={index} position={{lat: parseFloat(dataSet2[data].latitude), lng: parseFloat(dataSet2[data].longitude)}}
          onClick={() => handleActiveMarker(data)}
          >
            {activeMarker === data ? (<InfoWindow onCloseClick={() => setActiveMarker(null)}
            ><div style={divStyle}>
              <p>{dataSet2[data].nama}</p>
              <p>{dataSet2[data].alamat}</p>
          </div>
              
            </InfoWindow>) : null}
            
            </Marker>
          </>
          
          )}
          {Object.keys(ews).map((data, index) =>
          
          <>
          <Marker key={index} position={{lat: parseFloat(ews[data].latitude), lng: parseFloat(ews[data].longitude)}}
          onClick={() => handleActiveMarker(data)}
          >
            {activeMarker === data ? (<InfoWindow onCloseClick={() => setActiveMarker(null)}
            ><div style={divStyle}>
              <p>{ews[data].nama}</p>
              
          </div>
              
            </InfoWindow>) : null}
            
            </Marker>
          </>
          
          )}
          
      </GoogleMap>
    </LoadScript>
  )
}

export default MapContainer
