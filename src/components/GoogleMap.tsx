import {useEffect, useRef, useState} from "react";
import { markerData } from '../place/place';
import { handleMarkerClick } from '../handlers/handleMarkerClick';
import './GoogleMapStyle.css';
function GoogleMap(){

  const ref = useRef<HTMLDivElement>(null);
  const [googleMap, setGoogleMap] = useState<google.maps.Map>();
  const [markerInstances, setMarkerInstances] = useState<MarkerInstances>({});
  const [selectedMarkerId, setSelectedMarkerId] = useState<number | null>(null);

  useEffect(() => {
    if (ref.current) {
      const map = new window.google.maps.Map(ref.current, {
        center: center,
        zoom: 16,
        mapId: process.env.REACT_APP_MAP_ID || "",
        mapTypeControl: false,
      });
      
      setGoogleMap(map);
    }
  }, []);

  useEffect(()=>{
    if(googleMap){
      const newMarkerInstances: MarkerInstances = {...markerInstances};

      Object.keys(markerInstances).forEach((id)=>{
        if(!data.find((item)=> item.markerId.toString() === id)){
          markerInstances[Number(id)].map = null;
          delete newMarkerInstances[Number(id)];
        }
      });

      data.forEach((item: (typeof data)[number])=>{
        if(!newMarkerInstances[item.markerId]){
          const markerInstances = new google.maps.marker.AdvancedMarkerElement({
            position:{
              lat:Number(item.latitude),
              lng:Number(item.longitude),
            },
            map: googleMap,
          });
          newMarkerInstances[item.markerId] = markerInstances;
          markerInstances.addListener('click', () => {
            handleMarkerClick(item.markerId, item.latitude, item.longitude, googleMap, setSelectedMarkerId);
          });
        }
      });
    setMarkerInstances(newMarkerInstances);
    }
  }, [googleMap, data]);

  return (
    <>
      <div ref={ref} id="map" style={{ minHeight: '100vh' }}>

      {selectedMarkerId !== null && (
        <div className="topBox">
          <div className="smallLeftNav">
          </div>
          <div className="markerBox">
            <div>
              <p style={{ fontWeight: 'bold', fontSize: '16px' }}>
                📍 Marker {selectedMarkerId} clicked!
              </p>
              <p>Hello from the center box!</p>
            </div>
            <button onClick={() => {
              if (googleMap) {
                googleMap.setOptions({
                  gestureHandling: 'greedy',
                  zoomControl: true,
                });
              }
              setSelectedMarkerId(null)}}
              className="exitButton">
              <p style={{
                color : "white",
              }}>닫기</p>
            </button>
          </div>
          <div className="smallRightNav">
          </div>
        </div>
      )}      
      </div>
    </>
  );
  
}

const center = {
  lat : markerData[0].latitude,
  lng : markerData[0].longitude,
}
interface MarkerInstances {
  [key: number]: google.maps.marker.AdvancedMarkerElement;
} 

const data = Array.from({ length: markerData.length }, (_, index) => ({
  markerId: index + 1,
  latitude: markerData[index].latitude,// 서울의 위도 범위 내에서 랜덤 값
  longitude: markerData[index].longitude, // 서울의 경도 범위 내에서 랜덤 값
}));


export default GoogleMap;