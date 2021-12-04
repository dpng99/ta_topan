import React,{useState, useEffect} from 'react'
import { GoogleMap, LoadScript, Marker, InfoWindow} from '@react-google-maps/api'
import CRUDHandler from '../Handler/CRUDHandler';

const MapContainer = () => {
  const [dataSet, setDataSet] = useState('');
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
    width: '500px',
    height: '500px'
  }
  return (
    <LoadScript googleMapsApiKey={"AIzaSyAE3h-DKyyi1NqTEJcxRAMCCHi7bmVsj2I"}>
      <GoogleMap
      center={{ lat: -7.6300605, lng: 111.4930318 }}
      mapContainerStyle={stylingMaps}
      zoom={13}>
        {dataSet ? dataSet.map((data) =>
        <>
        <Marker position= { {lat: data.lat, lng: data.lon} }/>

        </>
        ): ''}
          
      </GoogleMap>
    </LoadScript>
  )
}

export default MapContainer
