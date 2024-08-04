import React, { useEffect ,useContext,useState } from 'react'
import Axios from 'axios';
import { UserContext } from './Context/UserContext';
import Typography from '@mui/material/Typography';
import {Link} from 'react-router-dom';
import Button from '@mui/material/Button'
import Footer from './Footer';
import { BASE_URL } from './Comp/Config';




function AdminHome() {
     let  {userInfo} = useContext(UserContext);
     const  [error,setError] = useState(false);
     const [info,setInfo] = useState("");
    
     useEffect( () => {

                const URL = `${BASE_URL}/admin/info`
        
                ;( async()=>{
                        
                    try {
                        const response   =  await Axios.get(URL,{
                                 headers:{
                                    'Content-Type':'application/json',
                                    'token':JSON.parse(localStorage.getItem('userInfo')).token,
                                 }
                               })
    
                            if(response.status == 200){
                             setInfo(response.data)
                              console.log(response.data)
                            }
                    } catch (e) {
                         setError(true);
                    }
                      
                })()
         

     },[])

 if(error)
 return  <div>
         <Typography variant="h3" color="initial">Ops something went wrong , reach out to Administrator !!</Typography>
 </div>  


  return <>    
       <div style={{width:'70%',margin:'auto',display:"flex",flexDirection:"column",rowGap:'25px',paddingTop:"70px"}} >
         
         <Typography variant="h3" color="Highlight">Welcome {info.name}  </Typography>

         <Typography variant="h4" color="initial">Total Course : {info.courseCount} </Typography> 
         
         <Typography variant="body1" color="GrayText"> You have created {info.courseCount} courses</Typography>

         <div style={{display:"flex",flexDirection:"row",justifyContent:"space-between" ,width:"60%"}} >
            <Link to="/admincourses" > <Button variant="text" color="primary" sx={{fontSize:"20px"}} >
            View Courses
            </Button>
            </Link>
            <Link to="/addcourse" > 
            <Button variant="text" color="primary" sx={{fontSize:"20px"}} >
              Add Course
            </Button>  
            </Link>
         </div>
 
      
       </div>
       <Footer/>
    </>

  
}

export default AdminHome
