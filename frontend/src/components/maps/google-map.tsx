"use client";
import { useState, useCallback } from 'react';
import {
  GoogleMap,
  LoadScript,
  useJsApiLoader,
  DirectionsService,
  DirectionsRenderer,
  Marker, // Markerをインポート
} from '@react-google-maps/api';

const mapContainerStyle = {
  width: '100%',
  height: '400px',
};

const center = {
  lat: 40.7128,
  lng: -74.0060, // New York City center
};

const libraries: ("places" | "drawing" | "geometry" | "localContext" | "visualization")[] = ['places'];

const Map: React.FC = () => {
  const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null);

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
    libraries,
  });

  const origin = { lat: 41.0534, lng: -73.5387 }; // Stamford, CT
  const destination = { lat: 40.7128, lng: -74.0060 }; // New York City

  const directionsCallback = useCallback((
    result: google.maps.DirectionsResult | null,
    status: google.maps.DirectionsStatus
  ) => {
    if (result !== null && status === 'OK') {
      setDirections(result);
    }
  }, []);

  const directionsOptions: google.maps.DirectionsRequest = {
    destination: destination,
    origin: origin,
    travelMode: 'DRIVING',
  };

  if (loadError) {
    return <div>Error loading maps</div>;
  }

  if (!isLoaded) {
    return <div>Loading maps</div>;
  }

  return (
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={9}
      >
        <Marker position={origin}  />
        <Marker position={destination} label="B" />
        <DirectionsService
          options={directionsOptions}
          callback={directionsCallback}
        />
        {directions && (
          <DirectionsRenderer
            directions={directions}
            options={{
              suppressMarkers: true,
              polylineOptions: {
                strokeColor: "#4285F4",
                strokeWeight: 5,
              },
            }}
          />
        )}
      </GoogleMap>
  );
};

export default Map;


// "use client";
// import { useEffect } from 'react';
// import Script from 'next/script';

// const Map: React.FC = () => {
//   useEffect(() => {
//     if (!window.google) {
//       // Google Maps APIがまだロードされていない場合のみ initMap を設定
//       window.initMap = function () {
//         const cairo = { lat: 30.064742, lng: 31.249509 };

//         const map = new window.google.maps.Map(
//           document.getElementById("map") as HTMLElement,
//           {
//             scaleControl: true,
//             center: cairo,
//             zoom: 10,
//           }
//         );

//         const infowindow = new window.google.maps.InfoWindow();
//         infowindow.setContent("<b>القاهرة</b>");

//         const marker = new window.google.maps.Marker({ map, position: cairo });

//         marker.addListener("click", () => {
//           infowindow.open(map, marker);
//         });
//       };
//     } else if (window.initMap) {
//       // APIがすでにロードされている場合、マップを初期化
//       window.initMap();
//     }
//   }, []);

//   return (
//     <div>
//       {/* Google Maps API スクリプトの追加。APIがロード済みでない場合のみ読み込み */}
//       {!window.google && (
//         <Script
//           src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&callback=initMap&language=en`}
//           async
//           defer
//           onLoad={() => {
//             console.log('Google Maps API loaded');
//           }}
//         />
//       )}
      
//       {/* マップが描画される要素 */}
//       <div id="map" style={{ width: '100%', height: '400px' }}></div>
//     </div>
//   );
// };

// export default Map;