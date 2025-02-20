import React, { useState, useEffect } from "react";
import axios from "axios";
import NewsItem from "../../components/Card/NewsItem"; // Import component NewsItem

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get(
        "https://medical-appointment-booking-api-production.up.railway.app/api/news/all"
      );
      const allBlogs = response.data;
      const activeBlogs = allBlogs.filter((blog) => blog.status === 1);
      setBlogs(activeBlogs);
    } catch (error) {
      console.error("Error fetching blogs:", error);
      setError("Failed to fetch blog data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="container mt-5">
        <h1>List Blog</h1>
        <hr />

        {loading && <p className="text-center">Loading blogs...</p>}
        {error && <p className="text-danger text-center">{error}</p>}

        <div className={`row ${loading ? "opacity-50" : ""}`}>
          {blogs.length > 0 ? (
            blogs.map((item, index) => (
              <div className="col-md-3 mb-3" key={index}>
                <NewsItem item={item} />
              </div>
            ))
          ) : (
            !loading && <p className="text-center">No active blogs available.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Blog;
