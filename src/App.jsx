import React, { useEffect, useState } from "react";
import useGetNews from "./hooks/useGetNews";

const App = () => {
  const [query, setQuery] = useState("");
  const [data, setData] = useState({});
  const [isData, setIsData] = useState(false);
  const [page, setPage] = useState(1);
  const [pageGroup, setPageGroup] = useState([1, 2, 3, 4, 5]);
  const [lastPage, setLastPage] = useState(1);

  useEffect(() => {
    console.log(`현재 검색어: ${query}, 마지막 페이지: ${lastPage}`);
  }, [lastPage]);

  const onChange = (e) => {
    setQuery(e.target.value);
  };

  // 검색 엔터 이벤트
  const handleKeyDown = async (e) => {
    if (e.key === "Enter") {
      const articleData = await useGetNews(query);
      setLastPage(Math.ceil(articleData.total / 12));
      if (articleData) {
        setIsData(true);
        setData(articleData);
      }
    }
  };

  // query와 page를 통해 데이터 불러오기(초기 클릭 이벤트, 숫자 버튼 이벤트)
  const getData = async () => {
    const articleData = await useGetNews(query, page);
    setLastPage(Math.ceil(articleData.total / 12));
    console.log("lastPage: " + lastPage);
    if (articleData) {
      setIsData(true);
      setData(articleData);
    }
  };

  // 버튼의 숫자에 맞게 데이터 패칭함.
  const paginate = async (number) => {
    setPage(number);
    const articleData = await useGetNews(query, number);
    setLastPage(Math.ceil(articleData.total / 12));
    console.log("lastPage: " + lastPage);
    if (articleData) {
      setIsData(true);
      setData(articleData);
    }
  };

  // 이전 버튼 눌러 데이터 패칭
  const beforePageGroup = () => {
    if (pageGroup[0] === 1) {
      return;
    }
    setPageGroup(Array.from(pageGroup, (x) => x - 5));
    try {
      paginate(pageGroup[0] - 5);
    } catch (e) {
      console.log(e);
    }
  };

  // 이후 버튼 눌러 데이터 패칭
  const AfterPageGroup = () => {
    if (pageGroup[4] === 1000) {
      return;
    }
    setPageGroup(Array.from(pageGroup, (x) => x + 5));
    try {
      paginate(pageGroup[0] + 5);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <div>
        <p>검색어</p>
        <input
          placeholder="검색어를 입력하세요"
          onChange={onChange}
          onKeyDown={handleKeyDown}
        />
        <button onClick={getData}>제출</button>
      </div>
      <div>
        {isData ? (
          data.items.map((item, index) => (
            <div key={index}>
              {index} {item.title}
            </div>
          ))
        ) : (
          <div>데이터가 없습니다.</div>
        )}
      </div>
      <div>
        <button onClick={() => beforePageGroup()}>&lt;</button>
        {pageGroup ? (
          pageGroup.map((number, index) => (
            <button key={index} onClick={() => paginate(number)}>
              {number}
            </button>
          ))
        ) : (
          <div>페이지 그룹 없음</div>
        )}
        <button onClick={() => AfterPageGroup()}>&gt;</button>
      </div>
    </>
  );
};

export default App;
