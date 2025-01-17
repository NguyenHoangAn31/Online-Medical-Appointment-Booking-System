import React from 'react'
import { MdArrowOutward, MdEmail, MdOutlineAddIcCall, MdOutlineMoreHoriz } from "react-icons/md"

const ListCall = () => {
    return (
        <section>
            <div className="container">
                <div className="row">
                    <div className="col-md-12 mb-5">
                        <div className="row">
                            <div className="col-md-6">
                                <div className='title__float-left'>
                                    <p>We’ve got a team of licensed healthcare professionals
                                        who are dedicated to providing excellent medical assistance through our app.</p>
                                    <a className='btn__readmore'>Read more <MdArrowOutward /></a>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className='card__list_call'>
                                    <img src="/images/bg_list_call.png" alt="" className='img__card' />
                                    <div className='card__list_info'>
                                        <div className='card__header'>
                                            <div className='title'>Heart Specicalist near me</div>
                                            <div className='icon'><MdOutlineMoreHoriz /></div>
                                        </div>
                                        <div className='card__body_doctor'>
                                            <div className='image_doctor'>
                                                <img src="/images/doctors/1.png" alt="" className='img-fluid' />
                                            </div>
                                            <div className='infor_doctor'>
                                                <h6 className='name'>Dr. Cameron William</h6>
                                                <p className='experiat'>20 years of experience</p>
                                            </div>
                                            <div className='contact_icon'>
                                                <div className='btn__icon'><MdEmail /></div>
                                                <div className='btn__icon'><MdOutlineAddIcCall /></div>
                                            </div>
                                        </div>
                                        <div className='card__body_doctor mt-3'>
                                            <div className='image_doctor'>
                                                <img src="/images/doctors/2.png" alt="" className='img-fluid' />
                                            </div>
                                            <div className='infor_doctor'>
                                                <h6 className='name'>Dr. Huyn William </h6>
                                                <p className='experiat'>10 years of experience</p>
                                            </div>
                                            <div className='contact_icon'>
                                                <div className='btn__icon'><MdEmail /></div>
                                                <div className='btn__icon'><MdOutlineAddIcCall /></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='btn__drawer'><MdArrowOutward /></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-12 mt-5">
                        <div className="row">
                            <div className="col-md-6 mt-5">
                                <div className="col-12">
                                    <div className="row">
                                        <div className="col-6 pt-5">
                                            <div className='col-12'>
                                                <img src="/images/bg_03.png" alt="" className='img-fluid' />
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className='doctor_old'>
                                                <img src="/images/kham-benh-nguoi-gia.jpg" alt="img-fluid" />
                                            </div>
                                            <div className='card__doctor_care'>
                                                <h6 className='title'>Dentists for Old age</h6>
                                                <div className='card__visit'>
                                                    <div className='card__visit_image'>
                                                        <img src="/images/doctors/3.png" alt="" className='img-fluid' />
                                                    </div>
                                                    <div className='doctor_info'>
                                                        <h6 className='name'>Dr. Cameron William</h6>
                                                        <p className='experience'>20 years of experience</p>
                                                    </div>
                                                </div>
                                                <div className='doctor_contact'>
                                                    <p className='country'>Country: USA</p>
                                                    <p className='phone'>0909.456.999</p>
                                                </div>
                                                <a className='btn__book_visit'>Book a Visit</a>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 mt-5">
                                <div className='title__float-right'>
                                    <h6>Book an appointment fo an in-clinic consultation</h6>
                                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took
                                        a galley of type and scrambled it to make a type specimen book.
                                    </p>
                                    <a className='btn__readmore'>Read more <MdArrowOutward /></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ListCall