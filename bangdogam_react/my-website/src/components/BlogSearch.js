import React, { useState } from "react";

const BlogSearch = () => {
  const [query, setQuery] = useState(""); // 검색어 상태
  const [results, setResults] = useState([]); // 검색 결과 상태
  const [loading, setLoading] = useState(false); // 로딩 상태

  const fetchBlogResults = async (searchQuery) => {
    const url = `http://127.0.0.1:8000/naver_blog_search/proxy/blog-search/?query=${encodeURIComponent(searchQuery)}`;

    setLoading(true);
    try {
      const response = await fetch(url);
      if (!response.ok) {
        console.error("API 호출 실패", response.statusText);
        return;
      }

      const data = await response.json();
      setResults(data.items || []); // 검색 결과 설정
    } catch (error) {
      console.error("Error fetching blog results:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim() === "") {
      alert("검색어를 입력하세요.");
      return;
    }
    fetchBlogResults(query); // 검색 실행
  };

  return (
    <div>
      <h1>네이버 블로그 검색</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="검색어를 입력하세요"
        />
        <button type="submit">검색</button>
      </form>

      {loading ? (
        <p>검색 중...</p>
      ) : (
        <ul>
          {results.map((result, index) => (
            <li key={index} style={{ margin: "20px 0" }}>
              <a href={result.link} target="_blank" rel="noopener noreferrer">
                <h2 dangerouslySetInnerHTML={{ __html: result.title }} />
              </a>
              <p dangerouslySetInnerHTML={{ __html: result.description }} />
              <p>
                <strong>작성자:</strong> {result.bloggername}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BlogSearch;
