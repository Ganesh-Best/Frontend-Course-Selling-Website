import { Card, Typography, Button } from '@mui/material';
import React, { useEffect, useState,useContext } from 'react'; 
import { useNavigate, useNavigation } from 'react-router-dom';
import { UserContext } from './Context/UserContext';
import Axios from 'axios';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';


   

function AdminCourses() {
    const [courses,setCourses] = useState([])
    const [status, setStatus] = useState(false);
    const {userInfo,setUserInfo} = useContext(UserContext);   
 
    useEffect(()=>{

          let url = "http://localhost:9000/admin/courses"
                   
          console.log("context Api data",userInfo)
                
              ;(async()=>{

                      
                     const response  = await Axios.get(url,{
                               headers:{
                               'Content-Type': 'application/json',
                               "token": JSON.parse(localStorage.getItem("userInfo")).token
                              }
                             })

                             console.log(response.data.courses);
                             setStatus(true);
                             setCourses(response.data.courses);
                  
              }
              )()

          
           

    },[])

    if(!status)
     return <div>
            <Typography variant="h3" color="initial">Loading ....... </Typography>
     </div>
     else if(!courses.length){
              return <>
             
           <Typography variant="h3" color="initial" sx={{marginTop:"20px"}} > You have not created Course :  Please Create Course  </Typography>
           </>
     }else
        return (
        <>  <Typography variant="h3" textAlign={"center"} color="initial">Courses</Typography> 
    <div style={{"display":"flex","flexDirection":"row","flexWrap":"wrap",justifyContent:"center"}}>
       
       
              
            
            <div style={{display:"flex",flexWrap:"wrap",columnGap:'30px',rowGap:'20px',justifyContent:"center",alignItems:"center",marginTop:"20px",marginBottom:"15px"}} >
               {courses.map((course)=>(
                  <COURSES course = {course} />
                ))}       
 
           </div>

    </div>
    </>
  )
}

function COURSES({course}){
  const navigate = useNavigate();
                
  return <Card sx={{ width:330 , maxWidth: 345,borderRadius:"15px" , paddingBottom:"13px"}}>
  <CardMedia
          sx={{ height: 180 }}
          image= {course.image}
          title="green iguana"
  />
  <CardContent>
  <Typography gutterBottom variant="h6" sx={{textTransform:'capitalize',fontWeight:"bold",marginBottom:"14px"}} component="div">
          {course.title}
  </Typography>
  <Typography gutterBottom variant="subtitle1" sx={{fontWeight:"200",marginBottom:"14px",whiteSpace:'nowrap',overflow: 'hidden',textOverflow: 'ellipsis'}} component="div">
          {course.description}
  </Typography>
  
  </CardContent>
  <CardActions sx={{paddingLeft:"20px",paddingRight:"20px"}}>
  <Button variant="contained" color="primary" onClick={()=>navigate(`/course/${course._id}`)}  sx={{width:"100%",borderRadius:"20px",padding:"10px"}}>
    Edit Course
  </Button>
  
  </CardActions>
</Card>  
}

export default AdminCourses

