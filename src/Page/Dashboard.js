import React,{useState, useEffect, useContext} from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import './Dashboard.css'
import Navbarx from '../Component/Navbar';
import CRUDHandler from '../Handler/CRUDHandler';

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
    })
}, [])



        return (
           <>
          <Navbarx />
          <div className= "leaflet-container ">
              <div className="leaflet-wrapper">
<           MapContainer center={[-7.6300605, 111.4930317]} zoom={13} scrollWheelZoom={false}>
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            { newDataSet ? newDataSet.map( (data)=>
           
          <Marker position={[<>{data.lat}</>, <>{data.lon}</>]}>
              <Popup>
                <br />  
              </Popup>
            </Marker>
            ) : ''
          }
          
          </MapContainer>
          </div>
            </div>
            </>
            

        );
}
    

export default Dashboard;
