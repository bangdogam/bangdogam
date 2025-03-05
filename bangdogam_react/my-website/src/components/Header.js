import React from 'react';
import { Link } from 'react-router-dom';
import MainIcon from '../assets/MainIcon.png';
import './Header.css';

function Header() {
    return (
        <header>
            <nav>
                <Link to="/">
                    <img src={MainIcon} alt="Home" />
                </Link>
                <div>
                    <Link to="/rooms">랭킹</Link>
                    <Link to="/rooms">테마별</Link>
                    <Link to="/map">지도 보기</Link>
                    <input
                        type="text"
                        placeholder="검색"
                        className="searchInput"
                    />
                    <Link to="/my">MY</Link>
                </div>
            </nav>
        </header>
    );
}

export default Header;
