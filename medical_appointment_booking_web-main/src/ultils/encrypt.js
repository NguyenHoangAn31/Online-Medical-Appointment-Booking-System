import CryptoJS from 'crypto-js';


const yoursecretkey = 'session-secretkey-phai-duoc-ma-hoa';
// Hàm để mã hóa token trước khi lưu vào sessionStorage
export const  encryptToken = (token) => {
    return CryptoJS.AES.encrypt(token, yoursecretkey).toString();
  }
  
  // Hàm để giải mã token từ sessionStorage
export const decryptToken = (encryptedToken) => {
    const bytes = CryptoJS.AES.decrypt(encryptedToken, yoursecretkey);
    return bytes.toString(CryptoJS.enc.Utf8);
  }

  export default { encryptToken, decryptToken };
