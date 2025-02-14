import React, { useEffect } from 'react';

const MapComponent = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAO_MAP_API_KEY}&libraries=services&autoload=false`;
    script.async = true;

    script.onload = () => {
      window.kakao.maps.load(() => {
        const container = document.getElementById('map');
        const options = {
          center: new window.kakao.maps.LatLng(37.5665, 126.9780), // 초기 지도 중심
          level: 3, // 초기 줌 레벨
        };
        const map = new window.kakao.maps.Map(container, options);

        // Geocoder 객체 생성
        const geocoder = new window.kakao.maps.services.Geocoder();

        // 주소 데이터 배열
        const addresses = [
          { title: '홍대 제로월드', address: '서울 마포구 잔다리로6길 20-9' },
          { title: '서울역', address: '서울 중구 한강대로 405' },
          { title: '광화문', address: '서울 종로구 세종대로 172' },
        ];

        // 주소를 기반으로 마커 생성
        addresses.forEach((item) => {
          geocoder.addressSearch(item.address, (result, status) => {
            if (status === window.kakao.maps.services.Status.OK) {
              const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);

              // 마커 생성
              const marker = new window.kakao.maps.Marker({
                map: map,
                position: coords,
                title: item.title,
              });

              // 정보창 추가
              const infowindow = new window.kakao.maps.InfoWindow({
                content: `<div style="padding:5px;">${item.title}</div>`,
              });

              // 마커 클릭 시 정보창 열기
              window.kakao.maps.event.addListener(marker, 'click', () => {
                infowindow.open(map, marker);
              });
            } else {
              console.error(`Failed to find address: ${item.address}`);
            }
          });
        });
      });
    };

    document.head.appendChild(script);
  }, []);

  return (
    <div>
      <h1>카카오 지도 - 주소로 마커 표시</h1>
      <div id="map" style={{ width: '100%', height: '400px' }}></div>
    </div>
  );
};

export default MapComponent;
