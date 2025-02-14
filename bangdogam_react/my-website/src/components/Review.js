import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { CiCalendar } from "react-icons/ci";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";


function Review() {
    const [selectedDate, setSelectedDate] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [rating, setRating] = useState(0); // 별점 상태
    const [hoverRating, setHoverRating] = useState(0); // 마우스 오버 상태
    const [selectedKeywords, setSelectedKeywords] = useState([]); // 선택된 키워드 관리
    const [selectedOutcome, setSelectedOutcome] = useState(null); // 탈출 여부 상태
    
    // 탈출 여부 버튼 클릭 핸들러
    const handleOutcomeClick = (outcome) => {
        setSelectedOutcome(outcome); // 단일 선택 (토글X)
    };

    const keywords = [
        "컨셉이 독특해요", "장치가 다양해요", "스토리가 탄탄해요",
        "인생테마에요", "무서워요", "활동성이 많아요",
        "인테리어가 좋아요", "친절해요", "시설이 깔끔해요",
        "가성비가 좋아요", "문제가 신박해요", "공간이 넓어요",
        "난이도가 생각보다 쉬워요", "난이도가 생각보다 어려워요"
    ];

    // 키워드 선택 핸들러
    const handleKeywordClick = (keyword) => {
        if (selectedKeywords.includes(keyword)) {
            setSelectedKeywords(selectedKeywords.filter((item) => item !== keyword)); // 선택 해제
        } else if (selectedKeywords.length < 3) {
            setSelectedKeywords([...selectedKeywords, keyword]); // 선택 추가 (최대 3개)
        }
    };

    // ⭐ 별점 클릭 시 반영
    const handleRating = (value) => {
        setRating(value);
    };

    // ⭐ 마우스 오버 시 UI 변경 (0.5 단위)
    const handleMouseMove = (event, starValue) => {
        const { clientX, target } = event;
        const rect = target.getBoundingClientRect();
        const isHalf = clientX - rect.left < rect.width / 2; // 마우스 위치가 반 이상인지 확인
        setHoverRating(isHalf ? starValue - 0.5 : starValue);
    };

    // ⭐ 마우스가 벗어나면 초기화
    const handleMouseLeave = () => {
        setHoverRating(0);
    };

    return (
        <div className="flex justify-center items-center h-full">
            <div className="bg-white p-8 rounded-lg w-[450px]">
                <h2 className="text-2xl font-bold text-center mb-6">리뷰작성</h2>
                
                {/* 별점 선택 UI */}
                <div className="flex justify-center mb-3 gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <span
                            key={star}
                            className="cursor-pointer relative"
                            onClick={() => handleRating(hoverRating || star)}
                            onMouseMove={(e) => handleMouseMove(e, star)}
                            onMouseLeave={handleMouseLeave}
                        >
                            {rating >= star || hoverRating >= star ? (
                                <FaStar size={40} className="text-yellow-400 transition" />
                            ) : rating >= star - 0.5 || hoverRating >= star - 0.5 ? (
                                <FaStarHalfAlt size={40} className="text-yellow-400 transition" />
                            ) : (
                                <FaStar size={40} className="text-gray-300 transition" />
                            )}
                        </span>
                    ))}
                </div>
                <p className="block text-sm font-medium text-gray-500 text-center mb-7">
                    이 테마의 솔직한 후기를 남겨주세요 :)
                </p>

                {/* 체험일자 */}
                <div className="flex justify-center w-full">
                    <div className="flex items-center gap-4 mb-7">
                        <label className="text-gray-700 font-medium whitespace-nowrap">체험일자</label>
                        <div className="relative w-full max-w-[250px]">
                            <input
                                type="text"
                                value={selectedDate ? selectedDate.toLocaleDateString() : ''}
                                readOnly
                                placeholder="날짜 선택"
                                className="border border-gray-300 p-2 rounded-[5px] w-full text-center pr-10 cursor-pointer"
                                onClick={() => setIsOpen(true)} // 클릭 시 DatePicker 열기
                            />
                            <button 
                                type="button"
                                onClick={() => setIsOpen(true)} // 아이콘 버튼으로 DatePicker 열기
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                            >
                                <CiCalendar size={20} />
                            </button>
                            
                            {isOpen && (
                                <div className="absolute top-12 left-0 z-50">
                                    <DatePicker
                                        selected={selectedDate}
                                        onChange={(date) => {
                                            setSelectedDate(date);
                                            setIsOpen(false); // 날짜 선택 시 닫기
                                        }}
                                        inline
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>


                {/* 키워드 선택 */}
                <div className="flex flex-col justify-center items-center w-full max-w-[500px] mb-7">
                    <h2 className="font-medium text-gray-700 mb-4 text-center">
                        키워드는 최대 3개까지 선택할 수 있어요 (선택)
                    </h2>

                    {/* 키워드 버튼 */}
                    <div className="flex flex-wrap justify-center gap-2 w-full">
                        {keywords.map((keyword) => (
                            <button
                                key={keyword}
                                onClick={() => handleKeywordClick(keyword)}
                                className={`px-3 py-2 text-sm rounded-[5px] text-center 
                                    ${
                                        selectedKeywords.includes(keyword)
                                            ? "bg-[#616161] text-white"
                                            : "border border-gray-300 text-black hover:bg-gray-100"
                                    } transition`}
                                style={{ minWidth: "auto" }} // 버튼 크기 자동 조정
                            >
                                {keyword}
                            </button>
                        ))}
                    </div>
                </div>


                {/* 탈출 여부 */}
                <div className="flex justify-center items-center w-full max-w-[500px] mb-7">
                    <h2 className="font-medium text-gray-700 pr-4 text-center">탈출 여부</h2>

                    {/* 성공 / 실패 버튼 */}
                    <div className="flex gap-2">
                        <button
                            onClick={() => handleOutcomeClick("성공")}
                            className={`px-10 py-2 text-sm rounded-[5px] transition ${
                                selectedOutcome === "성공"
                                    ? "bg-[#616161] text-white"
                                    : "border border-gray-300 hover:bg-gray-100"
                            }`}
                        >
                            성공
                        </button>

                        <button
                            onClick={() => handleOutcomeClick("실패")}
                            className={`px-10 py-2 text-sm rounded-[5px] transition ${
                                selectedOutcome === "실패"
                                    ? "bg-[#616161] text-white"
                                    : "border border-gray-300 hover:bg-gray-100"
                            }`}
                        >
                            실패
                        </button>
                    </div>
                </div>

                {/* 후기내용 */}
                <div>
                    <h2 className="font-medium text-gray-700 mb-2">내용</h2>
                    <textarea
                        className="w-full border border-gray-300 rounded-[5px] p-3 resize-none"
                        placeholder="후기를 입력해주세요"
                        rows="4"
                    />
                    <div className="flex justify-end">
                        <button className="block text-sm font-medium text-gray-500 text-center mb-7">
                            ㅣ 사진 첨부하기 ㅣ
                        </button>
                    </div>

                </div>

                <button
                    type="submit"
                    className="w-full py-3 rounded-[5px] transition bg-black text-white mb-12"
                >
                    등록
                </button>

            </div>
        </div>
    );
}

export default Review;

