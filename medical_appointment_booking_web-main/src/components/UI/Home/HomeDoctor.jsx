import React, { useEffect, useState } from 'react'
import DoctorItem from '../../Card/DoctorItem'
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
// import * as doctor from '../../../services/API/';
import axios from 'axios'
import { Link } from "react-router-dom";
import { motion } from 'framer-motion';

const HomeDoctor = () => {

    const [doctors, setDoctors] = useState([]);
    useEffect(() => {
        fetchDoctors();
    }, []);

    const fetchDoctors = async () => {
        const response = await axios.get(`https://medical-appointment-booking-api-production.up.railway.app/api/doctor/all`);
        const doctors = response.data;
        setDoctors(doctors);
    };


    const settings = {
        dots: false,
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 5,
        autoplay: true,
        // initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ],
        appendDots: (dots) => {
            return <ul style={{ margin: "0px" }}>{dots}</ul>
        },
    }
    return (
        <section className='container'>
            <div className="row">
                <div className='col-md-12 mb-5'>
                    <div className='main__doctor'>You can find trusted doctor around the globe</div>
                </div>
                <div className='col-md-12 mb-5'>
                    <Slider {...settings}>
                        {doctors.map((item) => (
                            <DoctorItem
                                key={item.id}
                                item={item}
                            />
                        )
                        )}
                    </Slider>
                </div>
                <div className='col-md-12 mt-3 text-center'>
                    <motion.div whileTap={{ scale: 0.8 }}>
                        <Link className='btn__service' to={'/service'}>See all</Link>
                    </motion.div>

                </div>
            </div>
        </section>
    )
}

export default HomeDoctor