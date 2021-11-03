import React from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

const Dashboard = () => {
    return (
        <div tyle="background-color: #ffff00; border-width:1px; border-style: solid; border-color: #000000; height: 500px">
           
<MapContainer center={[111.4930317, -7.6300605]} zoom={13} scrollWheelZoom={false}>
  <TileLayer
    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />
  <Marker position={[111.4930317, -7.6300605]}>
    <Popup>
      A pretty CSS3 popup. <br /> Easily customizable.
    </Popup>
  </Marker>
</MapContainer> 
        </div>
    )
}

export default Dashboard
