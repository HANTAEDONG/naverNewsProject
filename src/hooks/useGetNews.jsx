const useGetNews = async (text) => {
  try {
    const query = text;
    const response = await axios.get("/api/v1/search/news.json", {
      params: { query: query },
      headers: {
        "X-Naver-Client-Id": import.meta.env.VITE_Client_ID,
        "X-Naver-Client-Secret": import.meta.env.VITE_Client_Secret,
      },
    });
    console.log(response.data);
  } catch (error) {
    console.error("Error fetching data from Naver API:", error);
  }
};

export default useGetNews;
