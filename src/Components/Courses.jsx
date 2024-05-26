import React from 'react'
import useAxiosFetch from './useAxiosFetch' ;
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';


function Courses() { 
    const URL = 'http://localhost:9000/user/course'
    const token = JSON.parse(localStorage.getItem('userInfo')).token;
   const option = { headers:{
                     'Content-Type':'application/json',
                     'token':token
                  } }
      
     const {courses,error,loading}  =  useAxiosFetch(URL,option) ;


if(loading)
return  <div>
    Loading .......
</div> 

    return (
        <div sx={{marginTop:"40px"}}>  
            <Typography variant="h3" sx={{marginBottom:"30px",textAlign:"center"}} color="initial">Courses</Typography>  
           <div style={{display:"flex",flexWrap:"wrap",columnGap:'30px',rowGap:'20px',justifyContent:"center",alignItems:"center",marginTop:"20px",marginBottom:"15px"}} >
               {courses.map((course)=>(
                  <CourseCard course = {course} />
                ))}       
 
           </div>
        </div>
  )


}

function CourseCard({course}){


    return <Card sx={{ width:330 , maxWidth: 345,borderRadius:"15px" }}>
                <CardMedia
                        sx={{ height: 180 }}
                        image= {course.image}
                        title="green iguana"
                />
                <CardContent>
                <Typography gutterBottom variant="h6" sx={{fontWeight:"bold",marginBottom:"14px"}} component="div">
                        {course.title}
                </Typography>
                <Typography gutterBottom variant="h6" sx={{fontWeight:"200",marginBottom:"14px"}} component="div">
                        {course.description}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{fontWeight:"700",marginBottom:"-10px"}}>
                        {course.price}
                </Typography>
                </CardContent>
                <CardActions sx={{paddingLeft:"20px",paddingRight:"20px"}}>
                <Button variant="contained" color="primary" sx={{width:"100%",borderRadius:"20px",padding:"7px"}}>
                  View Details
                </Button>
                
                </CardActions>
  </Card>  
  }



export default Courses
