const  BASE_URL = "https://backend-course-selling-website.onrender.com";
let production = true ;
 
 if(production)
    BASE_URL = "http://147.79.71.181:9000";

module.exports = {
    BASE_URL
}
