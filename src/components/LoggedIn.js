import { Routes, Route } from "react-router-dom";
import PicForm from "./picForm";
import ChatRoom from "./ChatRoom";
import { useState } from "react";
import { useEffect } from "react";
import Aos from "aos";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";

const LoggedIn = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/PicForm" element={<PicForm />} />
      <Route path="/ChatRoom" element={<ChatRoom />} />
    </Routes>
  );
};

export default LoggedIn;

const Main = () => {
  const [feed, setFeed] = useState([]);
  const [count, setCount] = useState(1);
  const onClickUrl = (url) => {
    return () => window.open(url);
  };

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(
        `https://picsum.photos/v2/list?page=${count}&limit=9`
      );
      const data = await res.json();

      setFeed(data);
    }
    fetchData();
    Aos.init();
  }, [count]);

  return (
    <main className="Container">
      <div className="pages">
        <GrFormPrevious className="btns" onClick={() => setCount(count - 1)} />
        <p>{count}</p>
        <GrFormNext className="btns" onClick={() => setCount(count + 1)} />
      </div>
      {feed.map((pic) => (
        <div data-aos="fade-up" className="imgFeed" key={pic.id}>
          <img className="pic" src={pic.download_url} alt="pic" />
          <div className="picInfo">
            <h5>Author : {pic.author}</h5>
            <p className="Unsplashlink" onClick={onClickUrl(pic.url)}>
              Url : {pic.url}
            </p>
          </div>
        </div>
      ))}
    </main>
  );
};
