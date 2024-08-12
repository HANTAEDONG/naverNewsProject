import React, { useState } from "react";
import useGetNews from "./hooks/useGetNews";

const App = () => {
  const [text, setText] = useState("");
  const onChange = (e) => {
    setText(e.target.value);
  };
  const handleKeyDown = async (e) => {
    if (e.key === "Enter") {
      useGetNews(text);
    }
  };
  const onClick = async () => {
    useGetNews(text);
  };

  return (
    <>
      <div>
        <p>검색어</p>
        <input
          placeholder="검색어를 입력하세요"
          onChange={onChange}
          onKeyDown={(e) => handleKeyDown(e)}
        />
        <button onClick={onClick}>제출</button>
      </div>
      <div></div>
    </>
  );
};

export default App;
