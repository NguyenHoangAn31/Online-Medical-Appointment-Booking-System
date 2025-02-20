import React from 'react'

const About = () => {
  return (
    <>
      <div className="container home__about">
        {/* Section 1: About the team of doctors */}
        <div className="row align-items-center">
          <div className="col-lg-6">
            <h1 className='home_about_title'>About the Team of Doctors</h1>
            <div className="home_about_content">
              Our team consists of highly experienced and specialized doctors dedicated to providing top-quality medical care. 
              With expertise in various fields of medicine, they are committed to diagnosing and treating patients with the highest 
              standards of professionalism and compassion.
            </div>
          </div>
          <div className="col-lg-6">
            <img src="/images/about/team_of_doctor.png" alt="Team of doctors" className='home_about_image' />
          </div>
        </div>

        {/* Section 2: About medical facilities */}
        <div className="row align-items-center mt-5">
          <div className="col-lg-6">
            <img src="/images/about/medical_facilities.png" alt="Medical facilities" className='home_about_image' />
          </div>
          <div className="col-lg-6">
            <h1 className='home_about_title'>State-of-the-Art Medical Facilities</h1>
            <div className="home_about_content">
              Our healthcare facilities are equipped with the latest medical technology to ensure accurate diagnoses and effective treatments.
              We prioritize patient safety, hygiene, and comfort, creating a welcoming environment for all individuals seeking medical assistance.
            </div>
          </div>
        </div>

        {/* Section 3: Digital Transformation in Healthcare */}
        <div className="row align-items-center mt-5">
          <div className="col-lg-6">
            <h1 className='home_about_title'>Digital Transformation in Healthcare</h1>
            <div className="home_about_content">
              Technology is reshaping the healthcare industry, making medical services more accessible and efficient.  
              Our digital appointment booking system reduces wait times and enhances the overall experience, ensuring that patients receive timely care.
            </div>
          </div>
          <div className="col-lg-6">
            <img src="/images/about/medical_facilities_2.png" alt="Digital healthcare" className='home_about_image' />
          </div>
        </div>

        {/* Section 4: Patient-Centered Approach */}
        <div className="row align-items-center mt-5">
          <div className="col-lg-6">
            <img src="/images/about/patient_care.png" alt="Patient care" className='home_about_image' />
          </div>
          <div className="col-lg-6">
            <h1 className='home_about_title'>Patient-Centered Approach</h1>
            <div className="home_about_content">
              Our approach to healthcare is focused on patient well-being and satisfaction. We listen to our patients, provide personalized treatment plans, 
              and ensure continuous support throughout their recovery journey.
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default About;
