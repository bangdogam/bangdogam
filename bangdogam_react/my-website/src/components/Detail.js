import React from "react";

const Detail = () => {
  return (
    <div style={{ padding: "24px", maxWidth: "1024px", margin: "auto" }}>

      {/* 메인 정보 섹션 */}
      <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", gap: "20px" }}>

        {/* 이미지 섹션 */}
        <div style={{ flexShrink: "0" }}>
          <img
            src="https://www.zerogangnam.com/storage/XrztwnZ9ApcLWcAHwcSoHbFqa4cl6EJH1Bl2jreF.jpg"
            alt="벗사람의 별"
            style={{ borderRadius: "12px", width: "80%", maxWidth: "700px", height: "auto", objectFit: "cover" }}
          />
        </div>

        {/* 내용 섹션 */}
        <div style={{ padding: "24px", display: "flex", flexDirection: "column", justifyContent: "center", maxWidth: "600px" }}>
          <h2 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "8px" }}>
            [단편선 성수] 벗사람의 별 ❤️
          </h2>
          <div style={{ display: "flex", alignItems: "center", marginBottom: "8px" }}>
            <span style={{ color: "#facc15", fontSize: "18px" }}>★★★★★</span>
            <span style={{ color: "#4b5563", marginLeft: "8px" }}>5.0 (10)</span>
          </div>

          <div style={{ color: "#374151", lineHeight: "1.5" }}>
            <p><strong>장르:</strong> 드라마 / 미스터리</p>
            <p><strong>난이도:</strong> 3/5</p>
            <p><strong>공포도:</strong> 0/5</p>
            <p><strong>제한시간:</strong> 75분</p>
            <p><strong>추천 인원:</strong> 2인 이상</p>
          </div>

          <hr style={{ margin: "16px 0", borderColor: "#e5e7eb" }} />

          <p style={{ color: "#6b7280", fontStyle: "italic" }}>
            나는 내 한 몸 들어가는 쪽배를 타고 밤바다를 부유하곤 합니다
          </p>
          <p style={{ color: "#6b7280" }}>
            하늘-바다-나 <br />
            합일하는 무색 속 외로운 고향 <br />
            빛 한방울 좇는 항해 <br />
            턱없는 의미이지만...
          </p>

          {/* 예약 버튼 */}
          <button style={{ marginTop: "24px", width: "100%", backgroundColor: "black", color: "white", padding: "12px", borderRadius: "8px", fontSize: "16px", fontWeight: "600", cursor: "pointer", transition: "background 0.3s" }}
            onMouseOver={(e) => e.target.style.backgroundColor = "#1f2937"}
            onMouseOut={(e) => e.target.style.backgroundColor = "black"}>
            예약하기
          </button>
        </div>
      </div>
      <hr />

      {/* 방도감 리뷰 섹션 */}
      <h3 style={{ fontSize: "20px", fontWeight: "bold", marginTop: "40px", display: "flex", alignItems: "center" }}>
        <span style={{ marginRight: "10px", fontSize: "24px" }}>💬</span> 방도감 리뷰
      </h3>
      <div style={{ display: "flex", flexWrap: "nowrap", gap: "16px", marginTop: "16px", whiteSpace: 'nowrap' }}>

        {/* 리뷰 카드 */}
        <div style={{ backgroundColor: "#444", color: "white", padding: "16px", borderRadius: "8px", width: "48%", minWidth: "300px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <strong>미국산킬라그램</strong> <span>⭐ 5.0</span>
          </div>
          <div style={{ fontSize: "12px", opacity: "0.8" }}>100방 | 2025년 1월 1일</div>
          <p style={{ marginTop: "10px" }}>벗사람의 별!! 역시 소문만큼이나 재밌더라구요~ 올해의 방탈출입니다~~</p>
        </div>

        <div style={{ backgroundColor: "#444", color: "white", padding: "16px", borderRadius: "8px", width: "48%", minWidth: "300px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <strong>사춘기소년</strong> <span>⭐ 4.0</span>
          </div>
          <div style={{ fontSize: "12px", opacity: "0.8" }}>52방</div>
          <p style={{ marginTop: "10px" }}>진짜....진짜..... 재밌네 이거.... 방탈출이 chill하네요.</p>
        </div>
      </div>

      {/* 네이버 블로그 리뷰 섹션 */}
      <h3 style={{ fontSize: "20px", fontWeight: "bold", marginTop: "40px", display: "flex", alignItems: "center" }}>
        <span style={{ marginRight: "10px", fontSize: "24px", color: "#04A400" }}>N</span> 네이버 블로그 리뷰
      </h3>
      <div style={{ display: "flex", gap: "16px", marginTop: "16px", whiteSpace: 'nowrap', flexWrap:'nowrap'}}>
        {/* 블로그 카드 */}
        <div style={{ backgroundColor: "#444", color: "white", padding: "16px", borderRadius: "8px", width: "48%", minWidth: "300px" }}>
          <strong>짱아의 소중한 일상을 담는 블로그❤️</strong>
          <p style={{ marginTop: "10px" }}>[단편선 성수] 벗사람의 별 후기 | 꿀잼 방탈출 추천 | 꽃길테...</p>
        </div>

        <div style={{ backgroundColor: "#444", color: "white", padding: "16px", borderRadius: "8px", width: "48%", minWidth: "300px" }}>
          <strong>짠짠이의 방탈출 블로그</strong>
          <p style={{ marginTop: "10px" }}>성수 방탈출 벗사람의 별 장치 많은 꿀잼 테마 추천!</p>
        </div>
      </div>
    </div>
  );
};

export default Detail;