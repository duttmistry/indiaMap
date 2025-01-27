import { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet"

const Legend = ({maxVisit}) => {
    const map = useMap();
  
    useEffect(() => {
      const legend = L.control({ position: "bottomright" });
  
      legend.onAdd = function () {
        const div = L.DomUtil.create("div", "info legend");
        const tenPercent = Math.floor(maxVisit * 0.1); // Floor for 10%
        const ninetyPercent = maxVisit - tenPercent;
        const grades = [
          { range: `<${tenPercent}`, color: "#5dc2a5" },
          { range: `${tenPercent}-${ninetyPercent}`, color: "#13a362" },
          { range: `>${ninetyPercent}`, color: "#006d30" },
        ];
  
        div.innerHTML = "<h4>Visit Counts</h4>";
        grades.forEach((grade) => {
          div.innerHTML += `
            <i style="background:${grade.color};width:18px;height:18px;display:inline-block;margin-right:8px;border:1px solid #000"></i>
            ${grade.range}<br>
          `;
        });
  
        return div;
      };
  
      legend.addTo(map);
  
      // Clean up to remove the legend when the component is unmounted
      return () => {
        legend.remove();
      };
    }, [map]);
  
    return null;
  };
  
  export default Legend