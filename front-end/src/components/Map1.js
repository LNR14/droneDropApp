import React ,{ useState } from 'react'
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import { Icon } from "leaflet";
import {warehouses} from '../data/warehouses'
import homeIcon  from './icons/home.ico'
import warehouseIcon from './icons/warehouse.webp'
import './map.css'

function Map1({coordinates}) {
  const [activePark, setActivePark] = useState(null);
  const [activewarehouse,setActivewarehouse] = useState(null)
  const home = new Icon({
    iconUrl: homeIcon,
    iconSize: [25, 25]
  })
  const warehouseI = new Icon({
    iconUrl:warehouseIcon,
    iconSize: [25, 25]
  })

  
      return (
        <Map center={coordinates} zoom={8} >
                <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
           <Marker 
           key={1}
           position={coordinates}
           onClick={() => {
            setActivePark(1);
          }}
          icon ={home}
          /> 
          {warehouses.map(warehouse =>(
          <Marker 
           key={warehouse.name}
           position={warehouse.coordinates}
           onClick={() => {
            setActivewarehouse(warehouse);
          }}
          icon ={warehouseI}
          /> 
          ))}
        {activewarehouse && (
        <Popup
          position={activewarehouse.coordinates}
          onClose={() => {
            setActivewarehouse(null);
          }}
        >
          <div>
            <h4>{activewarehouse.name}</h4>
            <p>{activewarehouse.address}</p>
          </div>
        </Popup>
      )}
          


        {activePark && (
        <Popup
          position={coordinates}
          onClose={() => {
            setActivePark(null);
          }}
        >
          <div>
            <h3>your place</h3>
            <p></p>
          </div>
        </Popup>
      )}
        </Map>
        
      )
  }
  
  export default Map1
  