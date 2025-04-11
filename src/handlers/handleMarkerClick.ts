export const handleMarkerClick = (
    markerId: number,
    lat: number,
    lng: number,
    googleMap: google.maps.Map,
    setSelectedMarkerId: (id: number) => void
  ) => {
    
    
    googleMap.setZoom(18);

    const scale = Math.pow(2, googleMap.getZoom()!);
    const projection = googleMap.getProjection();
    if (!projection) return;
    const worldCoordinateCenter = projection.fromLatLngToPoint(new google.maps.LatLng(lat, lng));
    if (!worldCoordinateCenter) return;

    const mapDiv = googleMap.getDiv();
    const offsetY = (mapDiv.offsetHeight / 5) / scale;
  
    const targetPoint = new google.maps.Point(
      worldCoordinateCenter.x,
      worldCoordinateCenter.y - offsetY
    );
  
    const targetLatLng = projection.fromPointToLatLng(targetPoint);
    if (targetLatLng) {
      googleMap.panTo(targetLatLng);
    }
  googleMap.setOptions({
      gestureHandling: 'none',
      zoomControl: false,
    });
  
    setSelectedMarkerId(markerId);
  };
  