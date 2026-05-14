const isProduction = window.location.hostname !== 'localhost';

export const baseURL = isProduction 
  ? 'https://campus-laundry-backend.onrender.com'   
  : 'http://localhost:5000';  


  