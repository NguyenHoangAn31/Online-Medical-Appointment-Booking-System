import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom';
import { findNewsById } from '../../../../services/API/news';

function NewsDetail() {

  // lấy id từ url
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id");

  // gọi hàm loadNews 1 lần
  useEffect(() => {
    loadNews();
  }, []);

  // xét giá trị cho news
  const loadNews = async () => {
    setNews(await findNewsById(id));

  };

  // khởi tạo đối tượng news
  const [news, setNews] = useState({
    title: '',
    content: '',
    url: '',
    image: '',
    status: '',
    creator_email: ''
  });
  return (
    <>
      <h2>Detail News</h2>
      <div style={{ width: '75%', margin: 'auto' }}>
        <h1 style={{ textAlign: 'center', marginTop: '50px' }}>{news.title}</h1>
        <img src={"https://medical-appointment-booking-api-production.up.railway.app/images/news/" + news.image} alt="" width='100%' />
        <div dangerouslySetInnerHTML={{ __html: news.content }}>

        </div>
      </div>

    </>
  )
}

export default NewsDetail