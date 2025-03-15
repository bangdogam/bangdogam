import React from 'react';
import test from '../assets/test.png';
import cute from '../assets/cute.jpg';
import { Link, useNavigate } from 'react-router-dom';

function Mypage() {
    const navigate = useNavigate();

    const recentThemes = [
        { id: 1, cafeName: "단편선 성수", themeName: "뱃사람의 별", image: test },
        { id: 2, cafeName: "제로월드 홍대점", themeName: "층간소음", image: test },
        { id: 3, cafeName: "솔버 강남점", themeName: "미래도시 탈출", image: test },
    ];

    return (
        <div className="flex flex-col items-center w-full">
        
            {/* 프로필 섹션 */}
            <section className="flex flex-col items-center text-center p-2 mb-3">
                <h2 className="text-2xl font-bold text-center mb-6">프로필</h2>
                <img src={cute} className="w-[120px] h-[120px] rounded-full object-cover mt-3" />
                <p className="mt-2 text-lg font-medium">닉네임</p>
            </section>

            {/* 나의 정보 */}
            <section className="w-full max-w-[650px] p-4">
                <div className="flex justify-around">
                    <button 
                        onClick={() => navigate("/review")}
                        className="px-4 py-2 rounded-md border border-gray-200 hover:bg-gray-100 transition">
                        리뷰 작성
                    </button>
                    <button 
                        onClick={() => navigate("/likelist")}
                        className="px-4 py-2 rounded-md border border-gray-200 hover:bg-gray-100 transition">
                        찜 목록
                    </button>
                </div>
            </section>

            <div className="w-[40%] my-[1.5%] border-[0.5px] border-gray-100"></div>

            <div className="w-full max-w-[400px] bg-white shadow-md rounded-lg p-4 mt-4 mb-5 border border-gray-100">
                {/* 도전 기록 */}
                <section>
                    <h3 className="text-lg font-semibold mt-1 mb-3">도전 기록</h3>
                    <div className="flex justify-between">
                        <p>도전 방 수</p>
                        <p className="font-bold">100방</p>
                    </div>
                    <div className="flex justify-between mt-2">
                        <p>탈출 성공률</p>
                        <p className="font-bold">80.0%</p>
                    </div>
                    <div className="flex justify-between mt-2">
                        <p>리뷰 수</p>
                        <p className="font-bold">10개</p>
                    </div>
                </section>

                {/* 방탈출 기록 */}
                <section>
                    <h3 className="text-lg font-semibold pt-10 mt-mb-3">나의 방탈출 기록을 한눈에 볼 수 있어요 :)</h3>
                    <div className="flex justify-center gap-40 mt-3 mb-1">
                        <p className="px-4 py-2">📊 통계</p>
                        <p className="px-4 py-2">📆 캘린더</p>
                    </div>
                </section>
            </div>

            <div className="w-[40%] my-[1.5%] border-[0.5px] border-gray-100"></div>

            {/* 최근 이용한 테마 */}
            <section className="w-full max-w-[500px] p-4 pb-20">
                <h3 className="text-lg font-semibold mb-5">・ 최근 이용한 테마</h3>

                <div className="grid grid-cols-3 gap-x-4">
                    {recentThemes.map((room) => (
                        <div key={room.id} className="flex flex-col items-center">
                            {/* 이미지 */}
                            <img src={room.image} alt="방탈출 이미지" className="w-[100px] h-[140px] object-cover" />

                            {/* 텍스트 정보 */}
                            <div className="text-center mt-2">
                                <p className="text-sm font-semibold">[{room.cafeName}]</p>
                                <p className="text-sm font-semibold">{room.themeName}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}

export default Mypage;
