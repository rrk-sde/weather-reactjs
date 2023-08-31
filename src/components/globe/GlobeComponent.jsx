import React, { useState, useEffect } from 'react';
import Globe from 'react-globe.gl';

const GlobeComponent = ({ specificLocation, width, height }) => {

    const [initialCoordinates, setInitialCoordinates] = useState(specificLocation);
    const [zoomLevel, setZoomLevel] = useState(5);
    const initialMarker = { lat: specificLocation.lat, lng: specificLocation.lon, value: 100 };

    useEffect(() => {
        const newZoom = Math.min(1, 10 / zoomLevel);
        setZoomLevel(newZoom);
    }, [specificLocation]);

    return (
        <Globe
            width={width}
            height={height}
            globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
            backgroundColor="rgba(0, 0, 0, 0)"
            initialCoordinates={specificLocation}
            markers={[{ lat: specificLocation.lat, lng: specificLocation.lng, value: 100 }]}
            zoom={zoomLevel}
        />
    );
};

export default GlobeComponent;
