import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DoctorItem from '../../components/Card/DoctorItem';
import { Button, Container, Row, Col } from 'react-bootstrap';

const FavouriteInProfile = () => {
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    fetchFavouriteDoctors();
  }, []);

  const fetchFavouriteDoctors = async () => {
    try {
      const response = await axios.get('https://medical-appointment-booking-api-production.up.railway.app/api/favourites');
      setFavourites(response.data);
    } catch (error) {
      console.error('Error fetching favourite doctors:', error);
    }
  };

  const removeFavourite = async (doctorId) => {
    try {
      await axios.delete(`https://medical-appointment-booking-api-production.up.railway.app/api/favourites/${doctorId}`);
      setFavourites(favourites.filter((doctor) => doctor.id !== doctorId));
    } catch (error) {
      console.error('Error removing favourite doctor:', error);
    }
  };

  return (
    <Container className="mt-5">
      <h2>My Favourite Doctors</h2>
      <hr />
      <Row>
        {favourites.length > 0 ? (
          favourites.map((doctor) => (
            <Col key={doctor.id} md={4} className="mb-4">
              <DoctorItem item={doctor} />
              <Button variant="danger" className="mt-2" onClick={() => removeFavourite(doctor.id)}>
                Remove
              </Button>
            </Col>
          ))
        ) : (
          <p>No favourite doctors found.</p>
        )}
      </Row>
    </Container>
  );
};

export default FavouriteInProfile;
