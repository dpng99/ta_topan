import React,{useState, useEffect} from 'react'
import { GoogleMap, LoadScript, Marker, InfoWindow} from '@react-google-maps/api'
import CRUDHandler from '../Handler/CRUDHandler';
import { Container } from 'react-bootstrap';

const MapContainer = () => {
  const [dataSet, setDataSet] = useState('');
  const [dataSet2, setDataSet2] = useState('');
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
        {Object.keys(dataSet).map((data) =>
          
        <>
        <Marker key={data} position={{lat: parseFloat(dataSet[data].latitude), lng: parseFloat(dataSet[data].longitude)}}
        onClick={() => handleActiveMarker(data)}
        >
          {activeMarker === data ? (<InfoWindow onCloseClick={() => setActiveMarker(null)}
          ><div style={divStyle}>
            <p>{dataSet[data].nama}</p>
            
        </div>
            
          </InfoWindow>) : null}
          
          </Marker>
        </>
        
        )}
        {Object.keys(dataSet2).map((data) =>
          
          <>
          <Marker key={data} position={{lat: parseFloat(dataSet2[data].latitude), lng: parseFloat(dataSet2[data].longitude)}}
          onClick={() => handleActiveMarker(data)}
          >
            {activeMarker === data ? (<InfoWindow onCloseClick={() => setActiveMarker(null)}
            ><div style={divStyle}>
              <p>{dataSet2[data].nama}</p>
              
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
