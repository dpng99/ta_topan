import React,{useState, useEffect} from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import './Dashboard.css'
import Navbarx from '../Component/Navbar';
import CRUDHandler from '../Handler/CRUDHandler';
import L from 'leaflet'

const Dashboard = () => {
  const [newDataSet, setNewDataSet]= useState('');
  
  useEffect(() => {
    const readData = CRUDHandler.getAll();
    
    readData.on('value', (snapshot) => {
      const dataSet = snapshot.val();
      const newDataSet = []
      for (let id in dataSet){
          newDataSet.push(dataSet[id]);
      }
      
      setNewDataSet(newDataSet);
      console.log(newDataSet);
    })
}, [])
const greenIcon = L.icon({
  iconUrl: 'img/marker.png',
  iconSize:     [40, 40], // size of the icon
  iconAnchor:   [50, 94], // point of the icon which will correspond to marker's location
  popupAnchor:  [-1, -76] // point from which the popup should open relative to the iconAnchor
});
        return (
           <>
          <Navbarx />
          <div className= "leaflet-container ">
              <div className="leaflet-wrapper">
<           MapContainer center={[-7.6300605, 111.4930317]} zoom={13} scrollWheelZoom={true}>
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
           
           {newDataSet ? newDataSet.map((data) => 
        <>
        <Marker icon={greenIcon} position={[data.lat, data.lon]}>

              <Popup>
               {data.ket}  
              </Popup>
            </Marker>
        </>
         ):'' }
         
      
           
          
       
          
          </MapContainer>
          </div>
            </div>
            </>
            

        );
}
    

export default Dashboard;
