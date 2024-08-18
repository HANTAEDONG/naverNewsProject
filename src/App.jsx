import React, { useState } from "react";
import useGetNews from "./hooks/useGetNews";

const App = () => {
  const [text, setText] = useState("");
  const [data, setData] = useState({});
  const [isData, setIsData] = useState(false);

  const onChange = (e) => {
    setText(e.target.value);
  };

  const handleKeyDown = async (e) => {
    if (e.key === "Enter") {
      const articleData = await useGetNews(text);
      if (articleData) {
        setIsData(true);
        setData(articleData);
      }
    }
  };

  const onClick = async () => {
    const articleData = await useGetNews(text);
    if (articleData) {
      setIsData(true);
      setData(articleData);
      console.log(data);
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
        <button onClick={onClick}>제출</button>
      </div>
      <div>
        {isData ? (
          data.items.map((item, index) => <div key={index}>{item.title}</div>)
        ) : (
          <div>데이터가 없습니다.</div>
        )}
      </div>
    </>
  );
};

export default App;
