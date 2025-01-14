import React from 'react';
import { Link } from 'react-router-dom';

const NewsItem = ({ item }) => {
  const cardStyle = {
    borderRadius: '8px',
    overflow: 'hidden',
    boxShadow: '1px 5px 7px rgba(0.11,0,0,0.1)',
    marginBottom: '20px',
    // width: '300px',
    backgroundColor: '#F0F8FF',
    height: '350px',
    objectFit: 'hidden',
    position: 'relative',
  };

  const imageContainerStyle = {
    width: '100%',
    height: '150px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    padding: '15px',
  };

  const imageStyle = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: '8px',
  };

  const cardBodyStyle = {
    padding: '20px',
    position: 'relative',
  };

  const titleStyle = {
    fontSize: '1.25rem',
    fontWeight: 'bold',
    marginBottom: '10px',
  };

  const textStyle = {
    fontSize: '0.875rem',
    color: '#6c757d',
  };

  const linkStyle = {
    position: 'absolute',
    bottom: '20px',
    left: '22px',
    color: '#007bff',
    textDecoration: 'none',
    fontWeight: 'bold',
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${day}-${month}-${year}, ${hours}:${minutes}`;
  };

  const publishDate = formatDate(item.dayCreate);

  const limitedTitle = item.title.length > 70 ? `${item.title.substring(0, 70)}...` : item.title;

  return (
    <div style={cardStyle}>
      <div style={imageContainerStyle}>
        <img
          src={`https://medical-appointment-booking-api-production.up.railway.app/images/news/${item.image}`}
          alt={item.title}
          style={imageStyle}
        />
      </div>
      <div style={cardBodyStyle}>
        <p style={textStyle}>Published: {publishDate}</p>
        <h5 style={titleStyle}>{limitedTitle}</h5>
      </div>
      <Link to={`/blog/${item.id}`} style={linkStyle}>Read more</Link>
    </div>
  );
};

export default NewsItem;
