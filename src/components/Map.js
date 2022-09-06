import { MapContainer, TileLayer,Marker,Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'
import "leaflet-defaulticon-compatibility";
import {useState} from "react";

const Map = (props) => {
    const positionInitialMap = [-1.80, -78.51];
    const [mapMarkers] = useState(props.data);
    return (
        <MapContainer center={positionInitialMap} zoom={7} scrollWheelZoom={false} style={{ height: "100%", width: "100%" }}>
            <TileLayer
                // attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                attribution='&copy; <a href="https://www.cedia.edu.ec/">CEDIA</a> UTA - UTC'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {
                mapMarkers.map((marker, index) => (
                    marker.position.length > 0 ? (
                        <Marker key={index}  position={marker.position}>
                            <Popup>
                                <b>Organización: </b> {marker.nombre} <br />
                                <b>Sector: </b> {marker.sector} <br />
                                <b>Subsector: </b> {marker.subsector} <br />
                                <b>Núm. Empleados: </b> {marker.num_empleados} <br />
                            </Popup>
                        </Marker>
                    ) : (
                        <></>
                    )
                ))
            }
            {/*<Marker position={[-0.1860160474609731,-78.67458062644613]}>*/}
            {/*    <Popup>*/}
            {/*        /!*<b>Organización: </b> {marker.nombre} <br />*!/*/}
            {/*        /!*<b>Sector: </b> {marker.sector} <br />*!/*/}
            {/*        /!*<b>Subsector: </b> {marker.subsector} <br />*!/*/}
            {/*        /!*<b>Núm. Empleados: </b> {marker.num_empleados} <br />*!/*/}
            {/*    </Popup>*/}
            {/*</Marker>*/}
        </MapContainer>
    )
}

export default Map