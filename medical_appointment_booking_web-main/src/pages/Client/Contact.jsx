import React from 'react'

const Contact = () => {
  return (
    <>
      <div className="container mt-5 mb-5">
        <h1>Contact Us</h1>
        <hr />
        <div className="row align-items-center">
          <div className="col-lg-6">
            <form>
              <div className="mb-3">
                <label className="form-label">Full Name:</label>
                <input type="text" className="form-control" placeholder='Name...' />
              </div>
              <div className="mb-3">
                <label className="form-label">Email:</label>
                <input type="email" className="form-control" placeholder='Email...' />
              </div>
              <div className="mb-3">
                <label className="form-label">Message:</label>
                <textarea type="password" className="form-control" style={{ height: "300px" }} placeholder='Message...'></textarea>
              </div>
              <button type="submit" className="btn btn-primary">Submit</button>
            </form>
          </div>
          <div className="col-lg-6 text-center">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d489.90840745522655!2d106.68203409680953!3d10.790830970472744!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752fcdf5e6b00b%3A0xed1c6762515e1113!2sFPT%20Aptech%20-%20Game%20Development%20with%20Unity!5e0!3m2!1svi!2s!4v1719125356389!5m2!1svi!2s" style={{ border: 0, width: "400px", height: "600px" }} ></iframe>
          </div>
        </div>
      </div>
    </>
  )
}

export default Contact