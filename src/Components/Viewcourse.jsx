import React, { useContext, useEffect, useState } from 'react'
import {useParams} from 'react-router-dom';
import Axios from 'axios';
import { UserContext } from './Context/UserContext';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography'


function Viewcourse() {
    let {userInfo} = useContext(UserContext);

    const {courseId} = useParams();
    const [course ,setCourse] = useState([]);
    const [status,setStatus] = useState(false);       
    const URL = "http://localhost:9000/admin/viewcourse"
        
    
    useEffect(()=>{
          ;( async()=>{
                   
           try {
            const  response = await Axios.get(`${URL}/${courseId}`,{
                 headers:{
                     "token":userInfo.token
                 }
              })
             
             setCourse(response.data.isFound)  
             setStatus(true); 
            
           } catch (e) {
              
           } 
            })()
          
    },[userInfo])

      
  if(!status)
   return  <div>
      
        <Typography variant="h3" color="initial">Loading.......</Typography>

   </div>
    
  return (
    <div style={{width:'70%',margin:'auto',display:"flex",flexDirection:"column",alignItems:"center"}} >
      
     
       
        <Showcourse course={course}/>

    </div>
  )
}


const  Showcourse = ({course})=>{

 return <Card sx={{display:"flex",flexDirection:"column",padding:'50px',height:"500px"}} >
                
                 <Stack  >
                      <Typography sx={{marginBottom:"10px"}} variant="h3" textAlign={"center"} color="initial">{course.title }</Typography>   
                      <div style={{borderTop:"1px solid black",padding:"20px",display:"flex",justifyContent:"space-between",marginTop:"10px",gap:'10px'}} > <span>{course.file1.name}</span> <Button variant="outlined" color="primary"  href={course.file1.url} style={{}} target='_blank'  >Watch </Button></div>
                      <div style={{borderTop:"1px solid black",padding:"20px",borderBottom:"1px solid black",padding:"20px",display:"flex",justifyContent:"space-between",gap:'10px',marginTop:"10px"}} >{course.file2.name} <Button variant="outlined" color="primary"  href={course.file2.url} style={{}} target='_blank'  >Watch </Button></div>
                
                 </Stack>
  <Button variant="text" color="primary">
    
  </Button>
        </Card >
}

export default Viewcourse
