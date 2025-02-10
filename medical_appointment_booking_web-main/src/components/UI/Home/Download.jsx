import React from 'react'

const Download = () => {
    return (
        <section className='container'>
            <div className="row">
                <div className="col-md-12 mb-5">
                    <div className="row">
                        <div className="col-md-6">
                            <img src="/images/download_app.jpg" alt="" className='img-fluid' />
                        </div>
                        <div className="col-md-6">
                            <div className='home__download'>
                                <h3 className='downloas_title mb-4'>Download our app & get 10 minutes of free consultation</h3>
                                <p className='download_desc'>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                    Lorem Ipsum has been the industry's standard dummy
                                    text ever since the 1500s, when an unknown printer took a galley of</p>
                                <div className='icon__download'>
                                    <div className='img_icon'>
                                        <img src="/images/google-play.png" alt="" className='img-fluid' />
                                    </div>
                                    <div className='img_icon'>
                                        <img src="/images/app-store.png" alt="" className='img-fluid pt-2' />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-12 mt-3">
                    <div className="row">
                        <div className="col-md-1"></div>
                        <div className="col-md-10">
                            <div className='subscribe'>
                                <h3 className='title'>Subscribe to our newsletter</h3>
                                <div className='form__subscribe'>
                                    <input type="text" className='input__subscribe' placeholder='Enter your full name' />
                                    <input type="text" className='input__subscribe' placeholder='Enter your email' />
                                    <div className='btn__subscribe'>Subscribe now</div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-1"></div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Download