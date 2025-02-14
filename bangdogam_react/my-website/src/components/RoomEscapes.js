import React, { useEffect, useState } from 'react';

function RoomEscapes() {
  const [roomEscapes, setRoomEscapes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  console.log("Fetching data from API...");

  fetch('http://127.0.0.1:8000/information/api/roomescapes/', { mode: "cors" })
    .then(response => response.json())
    .then(data => {
      console.log("API Response:", data);  // API 응답 확인
      setRoomEscapes(data.results || []);  // 상태 업데이트
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
}, []);

// 🔥 roomEscapes 상태가 변경될 때마다 로그 출력
useEffect(() => {
  console.log("Updated roomEscapes:", roomEscapes);
}, [roomEscapes]);



  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Room Escape List</h1>
      {roomEscapes.length > 0 ? (
        roomEscapes.map((room, index) => (
          <div
            key={index}
            style={{
              border: '1px solid #ccc',
              borderRadius: '8px',
              padding: '15px',
              marginBottom: '15px',
              backgroundColor: '#f9f9f9',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
            }}
          >
            <h2>{room.title}</h2>
            <img
              src={room.image_url}
              alt={room.title}
              style={{ width: '30%', objectFit: 'cover', borderRadius: '8px' }}
            />
            <p><strong>Branch:</strong> {room.branch}</p>
            <p><strong>Genre:</strong> {room.genre}</p>
            <p><strong>Time:</strong> {room.time}</p>
            <p><strong>Difficulty:</strong> {room.difficulty}</p>
            <p><strong>Horror Level:</strong> {room.horror}</p>
            <p><strong>Description:</strong> {room.description}</p>
            <a
              href={room.booking_link}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'blue', textDecoration: 'underline' }}
            >
              Book Now
            </a>
          </div>
        ))
      ) : (
        <p>No data available.</p>
      )}
    </div>
  );
}

export default RoomEscapes;
