import React from 'react'
import { MdArrowOutward } from "react-icons/md"

const ImageHome = () => {
    return (
        <section className='container'>
            <div className="row">
                <div className="col-md-5">
                    <div className="col-12">
                        <div className='doctor__team'>
                            <img src="/images/doctor_team.jpg" alt="" className='img-fluid' />
                            <div className='doctor__team_desc'>
                                <div className='me-5'>
                                    <div className='title'>Emergency Contact No.</div>
                                    <div className='phone'>+84-939-456-999</div>
                                </div>
                                <div className='button'>
                                    <MdArrowOutward />
                                </div>
                            </div>

                        </div>

                    </div>

                </div>
                <div className="col-md-7">
                    <div className="col-12 doctor__khambenh">
                        <img src="/images/kham-benh-nguoi-gia.jpg" alt="" className='img-fluid' />
                    </div>

                </div>
            </div>
        </section>
    )
}

export default ImageHome