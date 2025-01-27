import React from 'react'
import './sidebar.css'
const Sidebar = ({doctorsData}) => {
  return (
<div className="table-container">
<table className="indian-states-table">
  <thead>
    <tr>
      <th colSpan={3} className="main-header">DATA</th>
    </tr>
    <tr>
      <th>PinCode</th>
      <th>Visits</th>
    </tr>
  </thead>
  <tbody>
    {doctorsData.map((item, index) => (
      <tr key={item.pin_code} className={index % 2 === 0 ? 'even-row' : 'odd-row'}>
        <td>{item.pin_code}</td>
        <td className="info-cell">{item.count}</td>
      </tr>
    ))}
  </tbody>
</table>
</div>
  )
}

export default Sidebar