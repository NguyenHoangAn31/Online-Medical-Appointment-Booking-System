
import * as encrypt from '../../../ultils/encrypt';


// Define the getUserData function
const getUserData = () => {
  const TokenReult = localStorage.getItem("Token");

  if (TokenReult != null && TokenReult != '') {
    // console.log("token");
    const result = JSON.parse(encrypt.decryptToken(TokenReult));
    const isTokenExpired = () => {
      const currentDate = new Date(); // Get the current date and time
      const expiredAt = new Date(result.expiredAt); // Convert expiredAt array to Date object
      // Compare the current date and time with expiredAt
      return currentDate.getTime() > expiredAt.getTime();
    };
    if (isTokenExpired()) {
      localStorage.setItem("Token", '');
      return null;
    } else {
      return result;
    }
  }
  return null;
};

// Export the getUserData function for use in other modules
export default getUserData;


