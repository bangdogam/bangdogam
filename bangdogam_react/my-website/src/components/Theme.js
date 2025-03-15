import React, { useState } from 'react';
import DownButton from '../assets/DownButton.png';
import test from '../assets/test.png';
import { FaHeart, FaRegHeart, FaStar } from "react-icons/fa";

function Theme() {
    const [selectedRegion, setSelectedRegion] = useState("전체");
    const [selectedSort, setSelectedSort] = useState("최신순");
    const [selectedTheme, setSelectedTheme] = useState("전체");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const regions = ["전체", "홍대", "건대", "강남"];
    const sorts = ["최신순", "인기순"];
    const themes = ["전체", "공포", "스릴러", "드라마", "감성", "코미디"];

    // 방탈출 리스트 데이터
    const escapeRooms = Array.from({ length: 12 }, (_, i) => ({
        id: i,
        cafeName: "단편선 성수",  // 방탈출 카페 이름
        themeName: `뱃사람의 별 ${i + 1}`, // 테마 이름
        location: "건대",
        genre: "드라마",
        rating: 5.0,
        difficulty: "중",
        activity: "중",
        time: "75분",
        people: "2인 이상",
        isLiked: false,
    }));

    // 찜 상태 관리
    const [likedRooms, setLikedRooms] = useState(escapeRooms);

    // 찜 버튼 클릭 이벤트
    const handleLikeToggle = (id) => {
        setLikedRooms((prevRooms) =>
            prevRooms.map((room) =>
                room.id === id ? { ...room, isLiked: !room.isLiked } : room
            )
        );
    };

    console.log(likedRooms);

    return (
        <div className="mb-14">
            {/* 필터 */}
            <div className="mb-10">
                <div className="flex justify-between items-center px-[6%]">
                    {/* 지역 필터 */}
                    <div className="flex items-center space-x-5 text-[#676767]">
                        {regions.map((region, index) => (
                            <React.Fragment key={region}>
                                <button
                                    className={`${
                                        selectedRegion === region ? "text-[#ff9900] font-bold" : ""
                                    }`}
                                    onClick={() => setSelectedRegion(region)}
                                >
                                    {region}
                                </button>
                                {index < regions.length - 1 && <span className="text-[#676767]">|</span>}
                            </React.Fragment>
                        ))}
                    </div>

                    {/* 인기순 정렬 */}
                    <div className="flex items-center space-x-5 text-[#676767]">
                        {sorts.map((sort, index) => (
                            <React.Fragment key={sort}>
                                <button
                                    className={`${
                                        selectedSort === sort ? "text-[#ff9900] font-bold" : ""
                                    }`}
                                    onClick={() => setSelectedSort(sort)}
                                >
                                    {sort}
                                </button>
                                {index < sorts.length - 1 && <span className="text-[#676767]">|</span>}
                            </React.Fragment>
                        ))}
                    </div>
                </div>

                <div className="w-[100%] my-[1.5%] border-[0.5px] border-lightGray/30"></div>
                
                {/* 테마 필터 */}
                <div className="flex justify-between items-center px-[6%]">
                    <div className="flex items-center space-x-5">
                        {themes.map((theme) => (
                            <button
                                key={theme}
                                className={`w-[100px] h-[35px] border border-gray-300 rounded-[5px] ${
                                    selectedTheme === theme ? "text-[#ff9900] font-bold" : "text-[#676767]"
                                }`}
                                onClick={() => setSelectedTheme(theme)}
                            >
                                {theme}
                            </button>
                        ))}
                    </div>
                    {/* 드롭다운 버튼 */}
                    <button onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                        <img src={DownButton} className="w-[35px]" alt="Down Button" />
                    </button>

                    {/* 드롭다운 메뉴 */}
                    {isDropdownOpen && (
                        <div className="absolute right-20 mt-20 w-[120px] bg-white border border-gray-200 shadow-md rounded-md z-10">
                            {themes.map((theme) => (
                                <button
                                    key={theme}
                                    className={`block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 ${
                                        selectedTheme === theme ? "font-bold text-[#ff9900]" : ""
                                    }`}
                                    onClick={() => {
                                        setSelectedTheme(theme);
                                        setIsDropdownOpen(false); // 선택 후 드롭다운 닫기
                                    }}
                                >
                                    {theme}
                                </button>
                            ))}
                        </div>
                    )}
                    </div>
                </div>

            {/* 방탈출 리스트 */}
            <div className="flex justify-center items-center">
                <div className="grid gap-6 w-full max-w-full mx-0 px-2 justify-center"
                    style={{ gridTemplateColumns: "repeat(auto-fill, minmax(400px, 400px))" }}>
                    {likedRooms.map((room) => (
                        <div key={room.id} className="w-[400px] h-[240px] bg-[#F3F3F3] rounded-[15px] p-5 relative shadow-md mx-auto">
                            
                            {/* 찜 버튼 */}
                            <button
                                className="absolute top-5 right-5"
                                onClick={() => handleLikeToggle(room.id)}
                            >
                                {room.isLiked ? (
                                    <FaHeart className="text-[#FF6B6B]" size={22} />
                                ) : (
                                    <FaRegHeart className="text-gray-400" size={22} />
                                )}
                            </button>

                            <div className="flex">
                                {/* 이미지 */}
                                <img src={test} alt="방탈출 이미지" className="w-[140px] h-[200px] rounded-lg object-cover" />

                                {/* 텍스트 정보 */}
                                <div className="ml-4 flex-1">
                                    {/* 위치 및 장르 */}
                                    <p className="text-gray-600 text-sm">{room.location} | {room.genre}</p>

                                    {/* 카페 이름 + 테마 이름 */}
                                    <p className="font-bold mt-1">
                                        [{room.cafeName}] {room.themeName}
                                    </p>

                                    {/* 별점 */}
                                    <div className="flex items-center mt-1">
                                        {[...Array(5)].map((_, i) => (
                                            <FaStar key={i} className="text-yellow-400" />
                                        ))}
                                        <span className="ml-1 text-yellow-500 font-bold">{room.rating}</span>
                                    </div>

                                    {/* 구분선 */}
                                    <div className="w-full my-2 border-[0.5px] border-gray-300"></div>

                                    {/* 정보 리스트 */}
                                    <div className="grid grid-cols-2 text-gray-600 gap-y-1">
                                        <p>난이도</p> <p className="font-bold text-black">{room.difficulty}</p>
                                        <p>활동성</p> <p className="font-bold text-black">{room.activity}</p>
                                        <p>제한시간</p> <p className="font-bold text-black">{room.time}</p>
                                        <p>추천인원</p> <p className="font-bold text-black">{room.people}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
}

export default Theme;
