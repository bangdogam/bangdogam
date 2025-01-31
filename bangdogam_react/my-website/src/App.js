import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MapComponent from './components/MapComponent';
import RoomEscapes from './components/RoomEscapes';
import BlogSearch from './components/BlogSearch';
import Header from './components/Header';
import Footer from './components/Footer';
function App() {
  return (
    <Router>
      <div className="App">
        <Header>
        </Header>
        <Routes>
          <Route path="/map" element={<MapComponent />} />
          <Route path="/rooms" element={<RoomEscapes />} />
          <Route path="/blog-search" element={<BlogSearch />} />
        </Routes>
        <Footer>
        </Footer>
      </div>
    </Router>
  );
}

export default App;
