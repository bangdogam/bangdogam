import React, { useEffect, useState } from 'react';

const MapComponent = () => {
  const [map, setMap] = useState(null);
  const [selectedPlace, setSelectedPlace] = useState("방탈출을 설정해주세요!");
  const [roomEscapes, setRoomEscapes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAO_MAP_API_KEY}&libraries=services&autoload=false`;
    script.async = true;

    script.onload = () => {
      window.kakao.maps.load(() => {
        const container = document.getElementById('map');
        const options = {
          center: new window.kakao.maps.LatLng(37.5665, 126.9780),
          level: 3,
        };
        const mapInstance = new window.kakao.maps.Map(container, options);
        setMap(mapInstance);

        const places = new window.kakao.maps.services.Places();

        const placeNames = [
          { title: '제로월드 홍대점', keyword: '제로월드 홍대점' },
          { title: '지구별방탈출 홍대어드벤처점', keyword: '지구별방탈출 홍대어드벤처점' },
          { title: '지구별방탈출 홍대라스트시티점', keyword: '지구별방탈출 홍대라스트시티점' },
          { title: '솔버 건대1호점', keyword: '솔버 건대1호점' },
          { title: '솔버 건대2호점', keyword: '솔버 2호점' },
          { title: '제로월드 강남점', keyword: '제로월드 강남점' },
        ];

        placeNames.forEach((place) => {
          places.keywordSearch(place.keyword, (result, status) => {
            if (status === window.kakao.maps.services.Status.OK) {
              const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);
              addMarker(mapInstance, coords, place.title);
            } else {
              console.error(`키워드 검색 실패: ${place.keyword}`);
            }
          });
        });

        function addMarker(map, position, title) {
          const marker = new window.kakao.maps.Marker({
            map: map,
            position: position,
            title: title,
          });

          const infowindow = new window.kakao.maps.InfoWindow({
            content: `<div style="padding:5px;">${title}</div>`,
          });

          window.kakao.maps.event.addListener(marker, 'mouseover', () => {
            infowindow.open(map, marker);
          });

          window.kakao.maps.event.addListener(marker, 'mouseout', () => {
            infowindow.close();
          });

          window.kakao.maps.event.addListener(marker, 'click', () => {
            setSelectedPlace(title);
          });
        }
      });
    };

    document.head.appendChild(script);
  }, []);

  const moveToLocation = (lat, lng) => {
    if (map) {
      const newCenter = new window.kakao.maps.LatLng(lat, lng);
      map.setCenter(newCenter);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetch('http://127.0.0.1:8000/information/api/roomescapes/', { mode: "cors" })
      .then(response => response.json())
      .then(data => {
        console.log("API Response:", data);
        setRoomEscapes(Array.isArray(data) ? data : []);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          padding: "0px 20px"}}>
        <h1 style={{
            display: "inline",
            marginRight: "auto"}}>주변 방탈출 카페를 찾아 드릴게요 :)</h1>
        <button onClick={() => moveToLocation(37.5568, 126.9237)}>홍대</button>
        <button onClick={() => moveToLocation(37.5405, 127.0702)}>건대</button>
        <button onClick={() => moveToLocation(37.4979, 127.0276)}>강남</button>
      </div>
      <hr />
      <div style={{
          display: 'flex',
          justifyContent: "center",
          width: '100%',
          height: '600px',
          marginTop: '30px',
          marginBottom: '30px',
      }}>
        <div id="map" style={{
          width: '90%',
          height: '100%',
        }}></div>
      </div>
      <hr />
      <div style={{ padding: '20px' }}>
        <h1>{selectedPlace}</h1>
      </div>
      <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
        {loading ? (
          <p>Loading...</p>
        ) : roomEscapes.length > 0 ? (
          <div style={{
            display: 'flex',
            overflowX: 'auto',
            gap: '15px',
            padding: '10px',
            whiteSpace: 'nowrap'
          }}>
            {roomEscapes.map((room, index) => (
              <div key={index} style={{
                minWidth: '300px',
                maxWidth: '300px',
                border: '1px solid #ccc',
                padding: '10px',
                textAlign: 'center',
                flexShrink: 0
              }}>
                <h2>{room.title}</h2>
                <img src={room.image_url || 'https://via.placeholder.com/150'}
                     alt={room.title}
                     style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
                <p>{room.genre}</p>
                <p>{room.time}</p>
                <p>난이도: {room.difficulty}</p>
                <p>공포도: {room.horror}</p>
                <a href={room.booking_link}
                   target="_blank"
                   rel="noopener noreferrer"
                   style={{ color: 'blue' }}>Book Now</a>
              </div>
            ))}
          </div>
        ) : (
          <p>No data available.</p>
        )}
      </div>
    </div>
  );
};

export default MapComponent;