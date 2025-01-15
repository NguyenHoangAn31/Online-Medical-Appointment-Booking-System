import React from 'react'

const About = () => {
  return (
    <>
      <div className="container home__about">
        <div className="row align-items-center">
          <div className="col-lg-6">
            <h1 className='home_about_title'>About the team of doctors</h1>
            <div className="home_about_content">
              In this digital era, it’s making our lives easier and better. All the industry changes in a better way with the changes in technology. Taking about the healthcare industry; the medicine delivery app offers the best services. Know the healthcare industry is looking for the appointment booking for all the doctor’s to save timing and efficiency.
            </div>
          </div>
          <div className="col-lg-6">
            <img src="/images/about/team_of_doctor.png" alt="" className='home_about_image' />
          </div>
        </div>
        <div className="row align-items-center mt-5">
          <div className="col-lg-6">
            <img src="/images/about/medical_facilities.png" alt="" className='home_about_image' />
          </div>
          <div className="col-lg-6">
            <h1 className='home_about_title'>About medical facilities</h1>
            <div className="home_about_content">
              In this digital era, it’s making our lives easier and better. All the industry changes in a better way with the changes in technology. Taking about the healthcare industry; the medicine delivery app offers the best services. Know the healthcare industry is looking for the appointment booking for all the doctor’s to save timing and efficiency.
            </div>
          </div>
        </div>
        <div className="row align-items-center mt-5">
          <div className="col-lg-6">
            <h1 className='home_about_title'>About medical facilities</h1>
            <div className="home_about_content">
              In this digital era, it’s making our lives easier and better. All the industry changes in a better way with the changes in technology. Taking about the healthcare industry; the
            </div>
          </div>
          <div className="col-lg-6">
            <img src="/images/about/medical_facilities_2.png" alt="" className='home_about_image' />
          </div>
        </div>
      </div>
    </>
  )
}

export default About