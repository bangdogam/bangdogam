import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MapComponent from './components/MapComponent';
import BlogSearch from './components/BlogSearch';
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './components/Login';
import Signup from './components/Signup';
import Review from './components/Review';
import Ranking from './components/Ranking';
import Theme from './components/Theme';
import Mypage from './components/Mypage';
import Likelist from './components/Likelist';

function App() {
  return (
    <Router>
      <div className="App">
        <Header>
        </Header>
        <Routes>
          <Route path="/map" element={<MapComponent />} />
          <Route path="/ranking" element={<Ranking />} />
          <Route path="/Theme" element={<Theme />} />
          <Route path="/blog-search" element={<BlogSearch />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/review" element={<Review />} />
          <Route path="/mypage" element={<Mypage />} />
          <Route path="/likelist" element={<Likelist />} />
        </Routes>
        <Footer>
        </Footer>
      </div>
    </Router>
  );
}

export default App;

