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
    const getData = CRUDHandler.getAll();
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
    width: '100%',
    height: '100%'
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
    <Container>
    <LoadScript googleMapsApiKey={"AIzaSyAE3h-DKyyi1NqTEJcxRAMCCHi7bmVsj2I"}>
      <GoogleMap
      center={{ lat: -7.6300605, lng: 111.4930318 }}
      mapContainerStyle={stylingMaps}
      zoom={13}>
        {dataSet ? dataSet.map((data) =>
        <>
        <Marker position= { {lat: data.lat, lng: data.lon} }
        onClick={() => handleActiveMarker(data)}
        >
          {activeMarker === data ? (<InfoWindow onCloseClick={() => setActiveMarker(null)}
          ><div style={divStyle}>
          <h1>{data.ket}</h1>
        </div>
            
          </InfoWindow>) : null}
          
          </Marker>
        </>
        ): ''}
          
      </GoogleMap>
    </LoadScript>
    </Container>
  )
}

export default MapContainer
