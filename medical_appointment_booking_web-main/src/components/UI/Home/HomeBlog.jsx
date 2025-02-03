import React, { useEffect, useState } from 'react';
import NewsItem from '../../Card/NewsItem';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from 'axios';
import { Link } from "react-router-dom";
import { motion } from 'framer-motion';

const HomeNews = () => {

    const [news, setNews] = useState([]);
    useEffect(() => {
        fetchNews();
    }, []);

    const fetchNews = async () => {
        const response = await axios.get(`https://medical-appointment-booking-api-production.up.railway.app/api/news/all`);
        const news = response.data;
        setNews(news);
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

    return (
        <section className='container'>
            <div className="row">
                <div className='col-md-12 mb-5'>
                    <div className='main__news'>Stay Updated with the Latest News</div>
                </div>

                <div>
                    <Slider {...settings}>
                        {news.map((item) => (
                            <NewsItem
                                key={item.id}
                                item={item}
                            />
                        ))}
                    </Slider>
                </div>

                <div className='col-md-12 mt-5 text-center'>
                    <motion.div whileTap={{ scale: 0.8 }}>
                        <Link className='btn__service' to={'/blog'}>See all</Link>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

export default HomeNews;