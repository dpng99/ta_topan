import React, { useState, useEffect } from "react";
import { GoogleMap, LoadScript, Marker, InfoWindow } from "@react-google-maps/api";

import CRUDHandler from "../Handler/CRUDHandler";
import { Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const MapContainer = () => {
  const [dataSet, setDataSet] = useState([]);
  const [dataSet2, setDataSet2] = useState([]);
 
  const [activeMarker, setActiveMarker] = useState(null);
  const [ews, setEwsEvents] = useState([]);
  const anjing = [];
  const handleActiveMarker = (marker) => {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
  };

  useEffect(() => {
    const Ews = CRUDHandler.getEws();
    const getData = CRUDHandler.getLocation();
    getData.on("value", (snapshot) => {
      const dataValue = snapshot.child("LokasiDebit").val();
      const DataValue2 = snapshot.child("LokasiQuality").val();
      const dataSet2 = [];
      const dataSet = [];
      for (let id in dataValue) {
        dataSet.push(dataValue[id]);
      }
      for (let id in DataValue2) {
        dataSet2.push(DataValue2[id]);
      }

      setDataSet2(dataSet2);
      setDataSet(dataSet);

    });
    Ews.on("value", (snapshot) => {
      const flowMeter = snapshot.child("flow-meter").val();
      const panelPompa = snapshot.child("panel-pompa").val();
      const pressureSolar = snapshot.child("pressure-solar").val();
      const ews = [];
      for (let id in flowMeter) {
        ews.push(flowMeter[id]);
      }
      for (let id in panelPompa) {
        ews.push(panelPompa[id]);
      }
      for (let id in pressureSolar) {
        ews.push(pressureSolar[id]);
      }
      setEwsEvents(ews);
    
    });
    return() => {
        Ews.off();
        getData.off();
    }
  }, []);
  const stylingMaps = {
    maxWidth: "3840px",
    height: "1080px",
  };
  const onLoad = (infoWindow) => {
    console.log("infoWindows", infoWindow);
  };
  const divStyle = {
    background: `white`,
    border: `1px solid #ccc`,
    padding: 15,
  };

  return (
    <LoadScript googleMapsApiKey={"AIzaSyAE3h-DKyyi1NqTEJcxRAMCCHi7bmVsj2I"}>
      <GoogleMap center={{ lat: -7.6300605, lng: 111.4930318 }} mapContainerClassName="container-fluid position-absolute h-100 w-100" zoom={13}>
        {Object.keys(dataSet).map((data, index) => (
          <>
            <Marker icon="img/marker.png" key={index} position={{ lat: parseFloat(dataSet[data].latitude), lng: parseFloat(dataSet[data].longitude) }} onClick={() => handleActiveMarker(dataSet[data])}>
              {activeMarker === dataSet[data] ? (
                <InfoWindow onCloseClick={() => setActiveMarker(null)}>
                  <div style={divStyle}>
                    <p>PORTABLE DEBIT</p>
                    <p>Lokasi : {dataSet[data].nama}</p>
                    <p>Alamat : {dataSet[data].alamat}</p>
                    {dataSet[data].LastSubmit ? (
                      <>
                        <p>Tanggal : {dataSet[data].LastSubmit.date}</p>
                        <p>Waktu : {dataSet[data].LastSubmit.time}</p>
                        <p>Pipa : {dataSet[data].LastSubmit.pipa}</p>
                        <p>Flowestimasi : {dataSet[data].LastSubmit.flowestimasi} (m^3)</p>
                        <p>Flowrate : {dataSet[data].LastSubmit.flowrate} (m^3/h)</p>
                        <p>FSS : {dataSet[data].LastSubmit.fss} (m/s)</p>
                        <p>Temperature : {dataSet[data].LastSubmit.temperature} (°C)</p>
                        <p>Velocity : {dataSet[data].LastSubmit.velocity} (m/s)</p>
                        <p>Dynamicpressure : {dataSet[data].LastSubmit.dynamicpressure}</p>
                      </>
                    ) : null}
                  </div>
                </InfoWindow>
              ) : null}
            </Marker>
          </>
        ))}
        {Object.keys(dataSet2).map((data, index) => (
          <>
            <Marker icon="img/marker.png" key={index} position={{ lat: parseFloat(dataSet2[data].latitude), lng: parseFloat(dataSet2[data].longitude) }} onClick={() => handleActiveMarker(dataSet2[data])}>
              {activeMarker === dataSet2[data] ? (
                <InfoWindow onCloseClick={() => setActiveMarker(null)}>
                  <div style={divStyle}>
                    <p>PORTABLE QUALITY</p>
                    <p>Lokasi : {dataSet2[data].nama}</p>
                    <p>Alamat : {dataSet2[data].alamat}</p>
                    {dataSet2[data].LastSubmit ? (
                      <>
                        <p>Tanggal : {dataSet2[data].LastSubmit.date}</p>
                        <p>Sumur : {dataSet2[data].LastSubmit.sumur}</p>
                        <p>Klorin : {dataSet2[data].LastSubmit.klorin}</p>
                        <p>ORP : {dataSet2[data].LastSubmit.orp}</p>
                        <p>TDS : {dataSet2[data].LastSubmit.tds}</p>
                        <p>temperature: {dataSet2[data].LastSubmit.temperature}</p>
                        <p>Waktu : {dataSet2[data].LastSubmit.time}</p>
                        <p>Turbidity: {dataSet2[data].LastSubmit.turbidity}</p>
                      </>
                    ) : null}
                  </div>
                </InfoWindow>
              ) : null}
            </Marker>
          </>
        ))}
        {Object.keys(ews).map((data, index) => (
          <>
            <Marker key={index} position={{ lat: parseFloat(ews[data].latitude), lng: parseFloat(ews[data].longitude) }} onClick={() => handleActiveMarker(ews[data])}>
              {activeMarker === ews[data] ? (
                <InfoWindow onCloseClick={() => setActiveMarker(null)}>
                  <div style={divStyle}>
                    <p>{ews[data].nama}</p>
                    {ews[data].energyFlow || ews[data].flowRate || ews[data].fluidSoundSpeed || ews[data].negativeAcc || ews[data].positiveAcc || ews[data].tempInlet || ews[data].tempOutlet || ews[data].velocity ? (
                      <>
                        <p>Energi Flow : {ews[data].energyFlow}</p>
                        <p>Flow Rate :{ews[data].flowRate}</p>
                        <p>Fluid Sound Speed : {ews[data].fluidSoundSpeed}</p>
                        <p>Negative Acc : {ews[data].negativeAcc}</p>
                        <p>Positif Acc : {ews[data].positiveAcc}</p>
                        <p>TempInLet : {ews[data].tempInlet}</p>
                        <p>TempOutLet : {ews[data].tempOutlet}</p>
                        <p>Velocity : {ews[data].velocity}</p>
                      </>
                    ) : null}
                    {ews[data].currentR || ews[data].currentS || ews[data].currentT || ews[data].frequency || ews[data].power || ews[data].powerFactor || ews[data].voltR || ews[data].voltS || ews[data].voltT ? (
                      <>
                        <p>Current R : {ews[data].currentR}</p>
                        <p>Current S : {ews[data].currentS}</p>
                        <p>Current T : {ews[data].currentT}</p>
                        <p>Frequency :{ews[data].frequency}</p>
                        <p>Power : {ews[data].power}</p>
                        <p>Power Factor : {ews[data].powerFactor}</p>
                        <p>Volt R : {ews[data].voltR}</p>
                        <p>Volt S : {ews[data].voltS}</p>
                        <p>Volt T : {ews[data].voltT}</p>
                        {ews[data].led1 || ews[data].led2 || ews[data].led3 || ews[data].led4 || ews[data].led5 || ews[data].led6 ? (
                          <>
                            <p>{"Nama : " + ews[data].led1.nama + " Status : " + ews[data].led1.value}</p>
                            <p>{"Nama : " + ews[data].led2.nama + " Status : " + ews[data].led2.value}</p>
                            <p>{"Nama : " + ews[data].led3.nama + " Status : " + ews[data].led3.value}</p>
                            <p>{"Nama : " + ews[data].led4.nama + " Status : " + ews[data].led4.value}</p>
                            <p>{"Nama : " + ews[data].led5.nama + " Status : " + ews[data].led5.value}</p>
                            <p>{"Nama : " + ews[data].led6.nama + " Status : " + ews[data].led6.value}</p>
                          </>
                        ) : null}
                        {ews[data].relay1 || ews[data].relay2 ? (
                          <>
                            <p>{"Nama : " + ews[data].relay1.nama + " Status : " + ews[data].relay1.trigger}</p>
                            <p>{"Nama : " + ews[data].relay2.nama + " Status : " + ews[data].relay2.trigger}</p>
                          </>
                        ) : null}
                      </>
                    ) : null}
                    {ews[data].current || ews[data].pressureBar || ews[data].pressurePascal || ews[data].pressurePsi || ews[data].voltage ? (
                      <>
                        <p>Current : {ews[data].current}</p>
                        <p>Pressure Bar : {ews[data].pressureBar}</p>
                        <p>Pressure Pascal : {ews[data].pressurePascal}</p>
                        <p>Pressure Psi : {ews[data].pressurePsi}</p>
                        <p>Volatage : {ews[data].voltage}</p>
                      </>
                    ) : null}
                  </div>
                </InfoWindow>
              ) : null}
            </Marker>
          </>
        ))}
      </GoogleMap>
    </LoadScript>
  );
};

export default MapContainer;
