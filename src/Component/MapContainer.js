import React,{useState, useEffect} from 'react'
import { GoogleMap, LoadScript, Marker, InfoWindow} from '@react-google-maps/api'
import CRUDHandler from '../Handler/CRUDHandler';
import { Container } from 'react-bootstrap';

const MapContainer = () => {
  const [dataSet, setDataSet] = useState('');
  const [activeMarker, setActiveMarker] = useState(null)
  const handleActiveMarker = (marker) => {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
  };
  useEffect(() => {
    const getData = CRUDHandler.getLocation();
    getData.on('value', (snapshot) =>{
      const dataValue = snapshot.val()
      const dataSet = []
      for(let id in dataValue){
        dataSet.push(dataValue[id])
      }
      setDataSet(dataSet)
      console.log(dataSet)
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
        {dataSet ? dataSet.map((data, index) =>
        <>
        <Marker key={index} position= { {lat: parseFloat(data.latitude), lng: parseFloat(data.longitude)} }
        onClick={() => handleActiveMarker(data)}
        >
          {activeMarker === data ? (<InfoWindow onCloseClick={() => setActiveMarker(null)}
          ><div style={divStyle}>
        </div>
            
          </InfoWindow>) : null}
          
          </Marker>
        </>
        ): ''}
          
      </GoogleMap>
    </LoadScript>
  )
}

export default MapContainer
