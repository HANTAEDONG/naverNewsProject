import React, { useState } from "react";
import useGetNews from "./hooks/useGetNews";

const App = () => {
  const [text, setText] = useState("");
  const [data, setData] = useState({});
  const [isData, setIsData] = useState(false);
  const [page, setPage] = useState(1);
  const [pageGroup, setPageGroup] = useState([1, 2, 3, 4, 5]);
  // const pageGroup = [1, 2, 3, 4, 5];

  const onChange = (e) => {
    setText(e.target.value);
  };

  // 검색 엔터 이벤트
  const handleKeyDown = async (e) => {
    if (e.key === "Enter") {
      const articleData = await useGetNews(text);
      if (articleData) {
        setIsData(true);
        setData(articleData);
      }
    }
  };

  // query와 page를 통해 데이터 불러오기(초기 클릭 이벤트, 숫자 버튼 이벤트)
  const getData = async () => {
    const articleData = await useGetNews(text, page);
    if (articleData) {
      setIsData(true);
      setData(articleData);
    }
  };

  const paginate = async (item) => {
    setPage(item);
    console.log("page:", item);
    const articleData = await useGetNews(text, item);
    if (articleData) {
      setIsData(true);
      setData(articleData);
      console.log(data);
    }
  };

  const beforePageGroup = () => {
    if (pageGroup[0] === 1) {
      return;
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
        <button>&lt;</button>
        {pageGroup ? (
          pageGroup.map((item, index) => (
            <button key={index} onClick={() => paginate(item)}>
              {item}
            </button>
          ))
        ) : (
          <div>페이지 그룹 없음</div>
        )}
        <button>&gt;</button>
      </div>
    </>
  );
};

export default App;
