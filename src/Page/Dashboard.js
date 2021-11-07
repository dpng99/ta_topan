import React from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import './Dashboard.css'
const Dashboard = () => {
      

        return (
            <div className= "leaflet-container ">
              <div className="leaflet-wrapper">
<           MapContainer center={[-7.6300605, 111.4930317]} zoom={13} scrollWheelZoom={false}>
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[-7.6300605, 111.4930317]}>
              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
            </Marker>
          </MapContainer>
          </div>
            </div>
            

        );
}
    

export default Dashboard;
