import {MapContainer, TileLayer, Marker, Popup, Polygon} from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'
import "leaflet-defaulticon-compatibility";
import {useState} from "react";

function MarkerItem(props) {
    const [marker] = useState(props.data)
    return (
        marker.position.length > 0 ? (
            <Marker position={marker.position}>
                <Popup >
                    <b>Organización: </b> {marker.nombre} <br />
                    <b>Sector: </b> {marker.sector} <br />
                    <b>Subsector: </b> {marker.subsector} <br />
                    <b>Núm. Empleados: </b> {marker.num_empleados} <br />
                </Popup>
            </Marker>
        ) : (
            <></>
        )
    );
}

function setColor(value) {
    let color = "#3ac02c";
    if(value < 5) {
        color = "#3ac02c"
    } else if(value < 10) {
        color = "#c2b80d"
    } else if(value < 15) {
        color = "#349bd3"
    } else if(value < 20) {
        color = "#d54949"
    } else {
        color = "#e51a39"
    }
    return color;
}
const Map = (props) => {
    // const positionInitialMap = [-1.80, -78.51];
    const [dataMap] = useState(props.data);
    const [markersMap] = useState(props.markers);
    return (
        <MapContainer center={dataMap.positionMap} zoom={dataMap.zoomMap} scrollWheelZoom={true} style={{ height: "100%", width: "100%" }}>
            <TileLayer
                // attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                attribution='&copy; <a href="https://www.cedia.edu.ec/">CEDIA</a> UTA - UTC'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {
                markersMap.map((marker, index) => (
                    <MarkerItem key={index} data={marker} />
                ))
            }
            {
                dataMap.isMultipolygon ? (
                    dataMap.multipolygonMap.map((polygon, index) => (
                        <Polygon key={index} color={setColor(polygon.total)} positions={polygon.polygon} />
                    ))
                ) : (
                    <Polygon color={dataMap.color} positions={dataMap.polygonMap} />
                )
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