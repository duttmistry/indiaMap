import React, { useEffect, useState } from "react";
import { MapContainer, GeoJSON } from "react-leaflet";
import hydrebad from "./hydrebad.json"; // GeoJSON file for Hyderabad pin codes
import indian_States from "./in.json"; // GeoJSON file for Hyderabad pin codes
import doctorData from "./doctor_pincode_mapping.json";
import Legend from "./Legend";
import "./map.css";
import "leaflet/dist/leaflet.css";

const pincodeList = hydrebad.features.map(
  (feature) => feature.properties.pin_code
);

const IndiaMap = ({ doctorsData, setDoctorsData }) => {
  // const [doctorsData, setDoctorsData] = useState([]);
  const [maxVisit, setMexVisit] = useState(0);

  // Function to style pin codes based on doctor count
  const stylePinCode = (feature) => {
    const pinCode = feature?.properties?.pin_code; // Replace with your GeoJSON property for pin code
    let doctor = doctorsData.find((item) => item.pin_code === pinCode);
    const doctorCount = doctor?.count || 0;
    const tenPercent = Math.floor(maxVisit * 0.1); // Floor for 10%
    const ninetyPercent = maxVisit - tenPercent;
    let fillColor = "white"; // Default color
    if (doctorCount < tenPercent) {
      fillColor = "#5dc2a5"; // < 5 doctors
    } else if (doctorCount >= tenPercent && doctorCount <= ninetyPercent) {
      fillColor = "#13a362"; // < 10 doctors
    } else if (doctorCount > ninetyPercent) {
      fillColor = "#006d30"; // < 20 doctors
    }

    return {
      fillColor,
      weight: 1,
      color: "white", // Border color
      fillOpacity: 0.8,
    };
  };

  useEffect(() => {
    const pripeidData = () => {
      let groupedData = {};
      Array.from(
        new Map(doctorData.map((item) => [item.DOCTOR_OCE_ID, item])).values()
      ).forEach((row) => {
        const { DOCTOR_OCE_ID, DOCTOR_NAME, Pincode } = row; // Adjust column names as per your Excel file
        const key = `${Pincode}`;

        if (!groupedData[key]) {
          groupedData[key] = {
            doctorId: DOCTOR_OCE_ID,
            name: DOCTOR_NAME,
            pin_code: `${Pincode}`,
            count: 0,
          };
        }
        groupedData[key].count++;
      });
      let doctorsData = Object.values(groupedData);
      // console.log('doctorsData: ', doctorsData);
      // console.log('pincodeList: ', pincodeList);
      doctorsData = doctorsData.filter((item) =>
        pincodeList.includes(item.pin_code)
      );
      let visitsCount = doctorsData.map((visit) => visit.count);
      const maxVisitCount = Math.max(...visitsCount);
      setMexVisit(maxVisitCount);
      // console.log('doctorsData: ', doctorsData);
      setDoctorsData(doctorsData);
    };
    pripeidData();
  }, []);

  return (
    <MapContainer
      style={{ height: "100vh", width: "85%" }}
      center={[20.5937, 78.9629]}
      zoom={5}
      bounds={[
        [17.2, 78.3],
        [17.6, 78.7],
      ]} // Adjust bounds to Hyderabad area
      zoomControl={true}
    >
      <div
        style={{
          marginBottom: "10px",
          marginTop: "10px",
          marginLeft: "50px",
          position: "absolute",
        }}
      >
        <button
          style={{
            padding: "10px 20px",
            margin: "0 5px",
            backgroundColor: "#ccc",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Dataset 1
        </button>
        <button
          style={{
            padding: "10px 20px",
            margin: "0 5px",
            backgroundColor: "#ccc",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Dataset 2
        </button>
        <button
          style={{
            padding: "10px 20px",
            margin: "0 5px",
            backgroundColor: "#ccc",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Dataset 3
        </button>
      </div>
      <GeoJSON
        data={indian_States}
        onEachFeature={(feature, layer) => {
          layer.bindTooltip(feature.properties.name, {
            permanent: true,
            direction: "center",
          });
        }}
      />
      <GeoJSON
        style={stylePinCode}
        data={hydrebad}
        onEachFeature={(feature, layer) => {
          const pinCode = feature.properties?.pin_code;
          let doctor = doctorsData.find((item) => item.pin_code === pinCode);
          const doctorCount = doctor?.count || 0;
          layer.bindTooltip(`${doctorCount}`, {
            permanent: true,
            direction: "center",
            className: "custom-tooltip",
          });
        }}
      />
      <Legend maxVisit={maxVisit} />
    </MapContainer>
  );
};

export default IndiaMap;
