import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../components/Layouts/Client';

const CheckOut = () => {
  const { currentUser } = useContext(UserContext);

  return (
    <h1>CheckOut</h1>
  )
}

export default CheckOut