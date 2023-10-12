import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import './/Map.css'
import {TbWorldLatitude, TbWorldLongitude, TbZoomPan} from "react-icons/tb";

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
            projection: { name: 'globe' },
            center: [ longitude, latitude ],
            zoom: zoom
        })

        map.addControl( new mapboxgl.NavigationControl(), 'top-right' );

        map.on('style.load', () => {
            map.addSource('mapbox-dem', {
                'type': 'raster-dem',
                'url': 'mapbox://mapbox.mapbox-terrain-dem-v1',
                'tileSize': 512,
                'maxzoom': 14
            });

            map.setTerrain({
                'source': 'mapbox-dem'
            });
        })

        map.on('move', () => {
            setLatitude( parseFloat( map.getCenter().lat.toFixed( 4 ) ) );
            setLongitude( parseFloat( map.getCenter().lng.toFixed( 4 ) ) );
            setZoom( parseFloat( map.getZoom().toFixed( 2 ) ) );
        });

        return () => map.remove();
    }, [])

    return (
        <div>
            <div className="sidebar-container">
                <div className="
                    bg-indigo-800
                    rounded-lg
                    border-2 border-indigo-900
                    p-2 m-4
                    text-white
                    w-[40%] max-w-xl
                ">
                    <h1 className="text-2xl italic mx-2 mb-2">ourchanging.earth</h1>
                    {/* This portion of the tool shows current lat, lon, and zoom level.*/}
                    <div className="grid grid-cols-3 p-2 rounded-md bg-indigo-700">
                        <div className="flex items-center w-full">
                            <TbWorldLatitude size={30} />
                            <span className="text-lg font-bold mx-2 italic">{latitude}</span>
                        </div>
                        <div className="flex items-center w-full">
                            <TbWorldLongitude size={30} />
                            <span className="text-lg font-bold mx-2 italic">{longitude}</span>
                        </div>
                        <div className="flex items-center w-full">
                            <TbZoomPan size={30} />
                            <span className="text-lg font-bold mx-2 italic">{zoom}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="
                map-container
            " ref={mapContainerRef} />
        </div>
    )
}

export default Map