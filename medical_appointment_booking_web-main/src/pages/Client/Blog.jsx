import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NewsItem from '../../components/Card/NewsItem'; // Import component NewsItem

const Blog = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get('https://medical-appointment-booking-api-production.up.railway.app/api/news/all');
      const allBlogs = response.data;
      const activeBlogs = allBlogs.filter(blog => blog.status === 1);
      console.log(activeBlogs);
      setBlogs(activeBlogs);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    }
  };

  return (
    <>
      <div className="container mt-5">
        <h1>List Blog</h1>
        <hr />
        <div className="row">
          {blogs.map((item, index) => (
            <div className="col-md-3" key={index}>
              <NewsItem item={item} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Blog;
