import React, { useState } from 'react'
import IndiaMap from '../components/map/IndiaMap'
import './home.css';
import Sidebar from '../components/sidebar/Sidebar';

const Home = () => {
    const [doctorsData, setDoctorsData] = useState([]);
  return (
    <div className='main-container'>
        <IndiaMap doctorsData={doctorsData} setDoctorsData={setDoctorsData}/>
        <Sidebar doctorsData={doctorsData}/>
    </div>
  )
}

export default Home