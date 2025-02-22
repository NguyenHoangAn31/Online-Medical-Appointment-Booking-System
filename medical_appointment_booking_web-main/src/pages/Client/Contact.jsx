import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Xóa lỗi khi người dùng nhập lại đúng
    setErrors({ ...errors, [name]: '' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let valid = true;
    let newErrors = { name: '', email: '', message: '' };

    if (!formData.name.trim()) {
      newErrors.name = 'Full Name is required!';
      valid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required!';
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format!';
      valid = false;
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message cannot be empty!';
      valid = false;
    }

    if (!valid) {
      setErrors(newErrors);
      return;
    }

    alert('Your message has been sent successfully!');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="container mt-5 mb-5">
      <h1>Contact Us</h1>
      <hr />
      <div className="row align-items-center">
        <div className="col-lg-6">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Full Name:</label>
              <input 
                type="text" 
                name="name"
                className={`form-control ${errors.name ? 'is-invalid' : ''}`} 
                placeholder="Name..." 
                value={formData.name} 
                onChange={handleChange} 
              />
              {errors.name && <div className="invalid-feedback">{errors.name}</div>}
            </div>

            <div className="mb-3">
              <label className="form-label">Email:</label>
              <input 
                type="email" 
                name="email"
                className={`form-control ${errors.email ? 'is-invalid' : ''}`} 
                placeholder="Email..." 
                value={formData.email} 
                onChange={handleChange} 
              />
              {errors.email && <div className="invalid-feedback">{errors.email}</div>}
            </div>

            <div className="mb-3">
              <label className="form-label">Message:</label>
              <textarea 
                name="message"
                className={`form-control ${errors.message ? 'is-invalid' : ''}`} 
                style={{ height: "300px" }} 
                placeholder="Message..." 
                value={formData.message} 
                onChange={handleChange}
              ></textarea>
              {errors.message && <div className="invalid-feedback">{errors.message}</div>}
            </div>

            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>

        <div className="col-lg-6 text-center">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d489.90840745522655!2d106.68203409680953!3d10.790830970472744!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752fcdf5e6b00b%3A0xed1c6762515e1113!2sFPT%20Aptech%20-%20Game%20Development%20with%20Unity!5e0!3m2!1svi!2s!4v1719125356389!5m2!1svi!2s" 
            style={{ border: 0, width: "400px", height: "600px" }} 
            title="Google Map"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Contact;
