import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import './Map.css';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN as string;

const Map: React.FC = () => {

    const mapContainerRef = useRef<any>( null );

    const [ latitude, setLatitude ] = useState<number>(45.51);
    const [ longitude, setLongitude ] = useState<number>(-122.65);
    const [ zoom, setZoom ] = useState<number>(13);

    useEffect( () => {
        const map = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [ longitude, latitude ],
            zoom: zoom
        })

        map.addControl( new mapboxgl.NavigationControl(), 'top-right' );

        map.on('move', () => {
            setLatitude( parseFloat( map.getCenter().lat.toFixed( 4 ) ) );
            setLongitude( parseFloat( map.getCenter().lng.toFixed( 4 ) ) );
            setZoom( parseFloat( map.getZoom().toFixed( 2 ) ) );
        });

        return () => map.remove();
    }, [])

    return (
        <div>
            <div className='sidebarStyle'>
                <div>
                    Longitude: {longitude} | Latitude: {latitude} | Zoom: {zoom}
                </div>
            </div>
            <div className='map-container' ref={mapContainerRef} />
        </div>
    )
}

export default Map