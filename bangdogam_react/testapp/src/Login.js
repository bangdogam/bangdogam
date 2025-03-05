const LoginButton = () => {
  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/login/kakao/");
      const data = await response.json();
      window.location.href = data.auth_url;
    } catch (error) {
      console.error("카카오 로그인 오류", error);
    }
  };

  return <button onClick={handleLogin}>카카오 로그인</button>;
};

export default LoginButton;
