import React from 'react';
import { Link } from "react-router-dom";
import './Footer.css'; // CSS 파일 임포트

function Footer() {
    return (
        <footer>
            <Link to="/">방도감 소개</Link>
            <Link to="/">고객 센터</Link>
            <Link to="/map">공지 사항</Link>
        </footer>
    );
}

export default Footer;
