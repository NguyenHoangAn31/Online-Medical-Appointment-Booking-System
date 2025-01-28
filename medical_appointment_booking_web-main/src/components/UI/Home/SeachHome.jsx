
import React from 'react'

import { MdArrowOutward } from "react-icons/md"
import { FaStar } from "react-icons/fa"

const SeachHome = () => {
    return (
        <section className='container'>
            <div className="row">
                <div className="col-md-5">
                    <div className="row">
                        <div className="col-12">
                            <h3 className="home__title_small">Get High Quality</h3>
                            <h1 className="home__title_largest">Medical Services</h1>
                            <p className="text__paragrah">
                                There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour
                            </p>
                        </div>

                        <div className="col-12 mb-lg-5">

                            <form action="#" className='form__search'>
                                <input type="text" name="input_search" className='search__home' placeholder='Search Doctor' />
                                <button type='submit' className='btn__search_home'>Search</button>
                            </form>
                        </div>

                        <div className="col-12 mt-lg-5">
                            <div className="view__partient">
                                <h5>10K<sup>+</sup></h5>
                                <p>Happy partient</p>
                            </div>

                        </div>
                    </div>

                </div>
                <div className="col-md-4">

                    <div className="col-12 text-center position-relative">
                        <div className='bg__search_home'>
                            <img src="/images/bg_home_01.jpg" alt="" />
                        </div>
                        <a href="#" className='btn__banner'><MdArrowOutward /></a>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="col-md-12">
                        <div className="row">
                            <div className="col-md-12 mb-3">
                                <div className="row">
                                    <div className="col-4"></div>
                                    <div className="col-8">
                                        <div className="view__rate_dotor">
                                            <div className='d-flex justify-content-end align-items-center gap-3'>
                                                <div >
                                                    <div className='doctor__star'>
                                                        <FaStar />
                                                        <FaStar />
                                                        <FaStar />
                                                        <FaStar />
                                                        <FaStar />
                                                    </div>
                                                    <div className='doctor__name'>Jane Cooper</div>
                                                </div>
                                                <div className='doctor_image'>
                                                    <img src="/images/doctor_01.png" className='img-fluid' />
                                                </div>
                                            </div>
                                            <div className='text-end mt-3'>
                                                <p>There are many variations of passages of Lorem Ipsum available  </p>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-12 mb-5">
                                <div className="row">
                                    <div className="col-10">
                                        <div className="home_booking">
                                            <img src="/images/doctors/1.png" alt="" className='img-fluid home__booking_image' />
                                            <div className='booking_desc'>
                                                <h5 className='home__booking_name'>Dr. Nguyễn Minh Đăng</h5>
                                                <h6 className='home__booking_department'>Tai - Mũi - Họng</h6>
                                                <div className='home_booking_button mt-3'>Appointment</div>
                                            </div>

                                        </div>
                                    </div>
                                    <div className="col-2"></div>
                                </div>
                            </div>
                            <div className="col-md-12 mt-2">
                                <div className="row">
                                    <div className="col-2"></div>
                                    <div className="col-10">
                                        <div className='card__list'>
                                            <div className='card__list_image'>
                                                <div className='img_doctor'>
                                                    <img src="/images/doctors/2.png" alt="" className='img-fluid' />
                                                </div>
                                                <div className='img_doctor'>
                                                    <img src="/images/doctors/3.png" alt="" className='img-fluid' />
                                                </div>
                                                <div className='img_doctor'>
                                                    <img src="/images/doctors/4.png" alt="" className='img-fluid' />
                                                </div>
                                                <div className='img_doctor'>
                                                    <img src="/images/doctors/5.png" alt="" className='img-fluid' />
                                                </div>
                                            </div>
                                                <div className='card__list_number'>150K <sup>+</sup></div>
                                                <h5>Highly Specialised Doctor</h5>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SeachHome