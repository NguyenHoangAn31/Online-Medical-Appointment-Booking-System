import React, { useState, useEffect } from 'react'
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import * as department from '../../../services/API/departmentService';
import DepartmentCard from '../../Card/DepartmentCard';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const HomeService = () => {

    const [departments, setDepartments] = useState([]);
    // console.log(departments);
    // tải dữ liệu và gán vào departments thông qua hàm setDepartments
    const loadDepartments = async () => {
        const fetchedDepartments = await department.getAllDepartment();
        setDepartments(fetchedDepartments);
    };
    // thực hiện load dữ liệu 1 lần 
    useEffect(() => {
        loadDepartments();
    }, []);

    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 5,
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
            <div className='d-flex justify-content-between align-items-center mb-5'>
                <h1 className='main__title' >Our Services</h1>
                <motion.div whileTap={{ scale: 0.8 }}>
                    <Link className='btn__service' to={'/service'}>See all</Link>
                </motion.div>
            </div>
            <div>
                <Slider {...settings}>
                    {departments.map((item) => (
                        <DepartmentCard
                            key={item.id}
                            item={item}
                        />
                    )
                    )}
                </Slider>
            </div>

        </section>
    )
}

export default HomeService