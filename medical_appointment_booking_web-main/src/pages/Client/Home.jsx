import React, {useEffect} from 'react'

import { SeachHome, ImageHome, HomeService, 
HomeAbout, HomeInfoweb, ListCall,
  
HomeDoctor, 
HomeBooking,
Download,
HomeBlog} from '../../components/UI/Home'
import { useNavigate } from "react-router-dom"

import getUserData from '../../route/CheckRouters/token/Token'

const Home =  () => {
    var token = getUserData();
    
  return (
    <>
      <SeachHome />
      <ImageHome />
      <HomeService />
      <HomeAbout />
      <HomeInfoweb />
      <ListCall />
      <HomeDoctor />
      <HomeBlog />
      <Download />
      
    </>
  )
}

export default Home