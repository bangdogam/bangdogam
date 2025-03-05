import { useEffect, useState } from "react";

const App = () => {
  const [loginUrl, setLoginUrl] = useState("");

  useEffect(() => {
    // 카카오 로그인 URL 요청
    fetch("http://localhost:8000/api/login/kakao/")
      .then((response) => response.json())
      .then((data) => {
        console.log("백엔드 응답:", data);
        setLoginUrl(data.auth_url); // 로그인 URL 상태 업데이트
      })
      .catch((error) => console.error("카카오 로그인 API 오류:", error));
  }, []);

  useEffect(() => {
    // 카카오 로그인 후 인증 코드 처리
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    if (code) {
      fetch(`http://localhost:8000/api/login/kakao/callback/?code=${code}`)
        .then((res) => res.json())
        .then((data) => console.log("카카오 로그인 완료", data))
        .catch((err) => console.error("카카오 로그인 오류", err));
    }
  }, []);

  return (
    <div>
      <h1>카카오 로그인 구현</h1>

      {loginUrl ? (
        <button onClick={() => window.location.href = loginUrl}>
          카카오 로그인
        </button>
      ) : (
        <p>로그인 정보를 불러오는 중...</p>
      )}
    </div>
  );
};

export default App;
