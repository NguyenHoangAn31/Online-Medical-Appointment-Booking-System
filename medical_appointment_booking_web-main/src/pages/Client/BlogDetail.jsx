import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import NewsItem from '../../components/Card/NewsItem';
import Slider from 'react-slick';



const BlogDetail = () => {
  const { id } = useParams();
  const [newsItem, setNewsItem] = useState(null);
  const [suggestNew, setSuggestNew] = useState([]);
  const [content, setContent] = useState('');

  console.log(content);

  useEffect(() => {
    fetchNewsItem();
    fetchSuggestNew();
  }, [id]);

  const fetchNewsItem = async () => {
    try {
      const response = await axios.get(`https://medical-appointment-booking-api-production.up.railway.app/api/news/${id}`);
      setNewsItem(response.data);
      setContent(response.data);
    } catch (error) {
      console.error('Error fetching the news item:', error);
    }
  };

  const fetchSuggestNew = async () => {
    try {
      const response = await axios.get('https://medical-appointment-booking-api-production.up.railway.app/api/news/all');
      setSuggestNew(response.data);
    } catch (error) {
      console.error('Error fetching the news item:', error);
    }
  };

  if (!newsItem) {
    return <div>Loading...</div>;
  }

  // Define styles directly in the component
  const imageStyle = {
    maxWidth: '540px',
    maxHeight: '780px',
    width: '100%',
    height: 'auto',
    objectFit: 'cover',
    display: 'block',
    margin: '0 auto'  // Center the image
  };

  const CustomPrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "blue",
          borderRadius: "50%",
          width: "50px",
          height: "50px",
          zIndex: 1,
        }}
        onClick={onClick}
      />
    );
  };

  const CustomNextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "blue",
          borderRadius: "50%",
          width: "50px",
          height: "50px",
          zIndex: 1
        }}
        onClick={onClick}
      />
    );
  };

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: false,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    responsive: [
      {
        // breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        // breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        // breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ],
    appendDots: (dots) => {
      return <ul style={{ margin: "0px" }}>{dots}</ul>
    },
  };

  // Lọc các bài viết có id trùng với id của trang hiện tại
  const filteredSuggestNew = suggestNew.filter(item => item.id !== parseInt(id) && item.status === 1);



  const images = document.querySelectorAll('img');
  images.forEach((image) => {
    image.style.display = 'block';
    image.style.margin = 'auto';
  });

  return (
    <>
      <div className='container'>
        <div className="row">
          <div className='col-md-12 mb-5' style={{ marginTop: '45px' }}>
            <div dangerouslySetInnerHTML={{ __html: newsItem.content }} />

            <div className='col-md-12 mt-5'>
              <h2 className='text-center'><strong>Other Blog</strong></h2>
              <Slider {...settings}>
                {filteredSuggestNew.map((item) => (
                  <NewsItem
                    key={item.id}
                    item={item}
                  />
                ))}
              </Slider>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogDetail;