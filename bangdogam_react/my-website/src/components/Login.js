import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaComment } from 'react-icons/fa'; // 카카오 아이콘
import { IoMdEye, IoMdEyeOff } from "react-icons/io"; // 비밀번호 가시성 토글 아이콘
import { MdOutlineEmail, MdLockOutline } from "react-icons/md"; // 아이디 & 비밀번호 아이콘

function Login() {
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    // 로그인 핸들러
    const handleSubmit = (e) => {
        e.preventDefault();

        if (userId.trim() === '' || password.trim() === '') {
            alert('아이디와 비밀번호를 입력해주세요.');
            return;
        }

        // LocalStorage에서 저장된 회원 정보 가져오기
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(user => user.userId === userId && user.password === password);

        if (user) {
            alert('로그인 성공!');
            localStorage.setItem('loggedInUser', JSON.stringify(user)); // 로그인 상태 저장
            navigate('/'); // 로그인 후 메인 페이지로 이동
        } else {
            alert('아이디 또는 비밀번호가 잘못되었습니다.');
        }
    };

    return (
        <div className="flex justify-center items-center h-[85vh] mt-[-10vh]">
            <div className="bg-white p-8 rounded-lg w-96">
                <h2 className="text-2xl font-bold text-center mb-6">로그인</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-3">
                        
                        {/* 아이디 입력창 */}
                        <div className="relative">
                            <MdOutlineEmail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" size={22} />
                            <input
                                type="text"
                                placeholder="아이디를 입력해주세요"
                                value={userId}
                                onChange={(e) => setUserId(e.target.value)}
                                className="w-full p-3 pl-11 border border-gray-300 rounded-[5px] focus:outline-none focus:ring-2 focus:ring-blue-400"
                                required
                            />
                        </div>

                        {/* 비밀번호 입력창 */}
                        <div className="relative">
                            <MdLockOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" size={22} />
                            <input
                                type={showPassword ? 'text' : 'password'}
                                placeholder="비밀번호를 입력해주세요"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full p-3 pl-11 border border-gray-300 rounded-[5px] focus:outline-none focus:ring-2 focus:ring-blue-400"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-4 text-gray-500"
                            >
                                {showPassword ? <IoMdEye size={20} /> : <IoMdEyeOff size={20} />}
                            </button>
                        </div>
                    </div>
                    <div className="space-y-3">
                        <button
                            type="submit"
                            className="w-full bg-black text-white py-3 rounded-[5px] hover:bg-gray-800 transition"
                        >
                            로그인
                        </button>
                        <button
                            type="button"
                            className="w-full bg-[#FFEA00] border border-gray-300 py-3 rounded-[5px] flex justify-center items-center gap-2 hover:bg-yellow-100 transition"
                        >
                            <FaComment size={20} className="text-black" /> 카카오로 로그인
                        </button>
                        <Link
                            to="/signup"
                            className="w-full block text-center py-3 border border-gray-300 rounded-[5px] text-gray-700 hover:bg-gray-100 transition"
                        >
                            회원가입
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;

