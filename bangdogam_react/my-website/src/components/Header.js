import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import MainIcon from '../assets/MainIcon.png';
import './Header.css';

function Header() {
    const [loggedIn, setLoggedIn] = useState(false);

    // 로그인 여부 확인
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('loggedInUser'));
        setLoggedIn(!!user); // user가 존재하면 true, 없으면 false
    }, []);

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
                    {loggedIn ? (
                        <Link to="/mypage">MY</Link> // 로그인 상태일 때
                    ) : (
                        <Link to="/login">로그인</Link> // 로그인 안 했을 때
                    )}
                </div>
            </nav>
        </header>
    );
}

export default Header;
