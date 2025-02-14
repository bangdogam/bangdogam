import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdOutlineEmail, MdLockOutline } from "react-icons/md"; // 아이디 아이콘
import { FaRegSmile } from "react-icons/fa";

function Signup() {
    
    const [formData, setFormData] = useState({
        username: '',  // 닉네임
        userId: '',  // 아이디
        password: '', // 비밀번호
        password_check: ''
    });

    const [passwordError, setPasswordError] = useState('');

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handlePasswordChange = (e) => {
        const value = e.target.value;
        setFormData({ ...formData, password: value });

        // 비밀번호 검증 (영문자 + 숫자 포함, 8~20자)
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$/;
        if (!passwordRegex.test(value)) {
            setPasswordError('비밀번호는 영문자와 숫자를 포함하여 8~20자여야 합니다.');
        } else {
            setPasswordError('');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // 비밀번호 확인 검증
        if (passwordError) {
            alert('비밀번호 조건을 확인해주세요.');
            return;
        }

        if (formData.password !== formData.password_check) {
            alert("비밀번호가 일치하지 않습니다.");
            return;
        }

        // 테스트
        const users = JSON.parse(localStorage.getItem('users')) || []; // 기존 회원 데이터 가져오기
        const existingUser = users.find(user => user.userId === formData.userId);

        if (existingUser) {
            alert('이미 존재하는 아이디입니다.');
            return;
        }

        // 새 회원 데이터 추가
        users.push({
            username: formData.username,
            userId: formData.userId,
            password: formData.password
        });

        // localStorage에 업데이트
        localStorage.setItem('users', JSON.stringify(users));

        alert('회원가입이 완료되었습니다!');
        navigate('/login'); // 로그인 페이지로 이동
    };

    return (
        <div className="flex justify-center items-center h-[85vh] mt-[-10vh]">
            <div className="bg-white p-7 rounded-lg w-96">
                <h2 className="text-2xl font-bold text-center mb-6">회원가입</h2>
                <form onSubmit={handleSubmit} className="space-y-4">

            {/* 닉네임 */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">닉네임</label>
                <div className="relative">
                    <FaRegSmile className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" size={22} />
                    <input
                        type="text"
                        name="username"
                        placeholder="닉네임을 입력해주세요"
                        value={formData.username}
                        onChange={handleChange}
                        required
                        className="w-full p-3 pl-11 border border-gray-300 rounded-[5px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            </div>

            {/* 아이디 */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">아이디</label>
                <div className="relative">
                <MdOutlineEmail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" size={22} />
                    <input
                        type="text"
                        name="userId"
                        placeholder="아이디를 입력해주세요"
                        value={formData.userId}
                        onChange={handleChange}
                        required
                        className="w-full p-3 pl-11 border border-gray-300 rounded-[5px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            </div>
  
            {/* 비밀번호 */}
            <div className="space-y-2">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">비밀번호</label>
                    <div className="relative">
                        <MdLockOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" size={22} />
                        <input
                            type="password"
                            name="password"
                            placeholder="영문자, 숫자 포함 8~20자"
                            value={formData.password}
                            onChange={handlePasswordChange}
                            required
                            className="w-full p-3 pl-11 border border-gray-300 rounded-[5px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    {passwordError && (
                        <p className="text-red-500 text-sm mt-1">{passwordError}</p>
                    )}
                </div>

                {/* 비밀번호 확인 */}
                <div className="relative">
                    <MdLockOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" size={22} />
                    <input
                        type="password"
                        name="password_check"
                        placeholder="비밀번호를 확인해주세요"
                        value={formData.password_check}
                        onChange={handleChange}
                        required
                        className="w-full p-3 pl-11 border border-gray-300 rounded-[5px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            </div>

            {/* 회원가입 버튼 */}
            <button
                type="submit"
                disabled={passwordError}
                className={`w-full py-3 rounded-[5px] transition ${
                    passwordError ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-[#848484] text-white hover:bg-black'
                }`}
            >
                회원가입
            </button>
            </form>
        </div>
    </div>
    )
}

export default Signup;
