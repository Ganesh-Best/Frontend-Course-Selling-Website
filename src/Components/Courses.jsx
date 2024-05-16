import { Card, Typography, Button } from '@mui/material';
import React, { useEffect, useState,useContext } from 'react'; 
import { useNavigate, useNavigation } from 'react-router-dom';
import { UserContext } from './Context/UserContext';
import Axios from 'axios';

   

function Courses() {
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
       
       
              
            {  courses.map((course,i)=><COURSES  course={course}  />) }

    </div>
    </>
  )
}

function COURSES(props){
  const navigator = useNavigate();
                
  return <Card style={{width:"330px",minHeight:"200px",margin:"10px", display:"flex",flexDirection:"column", alignItems:"center",rowGap:"4px",padding:"20px 3px "}} >
        
        <img src={props.course.image} style={{"width":"230px" ,height:"200px"}}></img>
       <Typography textAlign={"center"} variant="h6" color="initial">{props.course.title }</Typography>
       <Typography style={{fontSize:"14px",padding:"15px"}} textAlign={"justify"} variant="h6" color="grey">{props.course.description }</Typography>
       
       <Button variant="contained" color="primary" style={{width:"100px"}}
       onClick={()=>{
        navigator("/course/"+props.course._id)
       }}
       >
        EDIT  
       </Button> 
  </Card>
}

export default Courses
