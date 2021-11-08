import React,{useState, useEffect, useContext} from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import './Dashboard.css'
import Navbarx from '../Component/Navbar';
import { database } from '../Firebase'

const Dashboard = () => {
  const [data, setData] = useState({});
  const getMaker = () => {
    database.ref('alat/id').on('value', snapshot => {
      let values = [];
      snapshot.forEach((child) => {
        values.get(child.val());
        setData( [...data, values.data ]);
      });
      console.log(values);
      setData(values);
    })
  }
useEffect(() => {
  getMaker();
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
            { data && data.map( data=>{
          <Marker position={[data.lat, data.lon]}>
              <Popup>
                <br />  
              </Popup>
            </Marker>
            })
          }
          
          </MapContainer>
          </div>
            </div>
            </>
            

        );
}
    

export default Dashboard;
