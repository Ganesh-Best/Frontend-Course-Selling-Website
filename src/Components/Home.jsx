import React, { useEffect  } from 'react'
import ImageSlider from './Comp/ImageSlider.jsx'
import Typography from '@mui/material/Typography'
import { Card } from '@mui/material'

import useAxiosFetch from './useAxiosFetch.jsx';


import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';

import { useNavigate } from 'react-router-dom';

function Home() {
  return (
    <div  className='container'>
      <ImageSlider/>
      <Courses/>
      <About/>
      
      
    </div>
  )
}

function Courses(){

   const token = JSON.parse(localStorage.getItem('userInfo')).token;
   const option = { headers:{
                     'Content-Type':'application/json',
                     'token':token
                  } }
  const {courses,error,loading}   =   useAxiosFetch("http://localhost:9000/user/course",option)

   console.log(courses,error,loading)



 return <div className="my-5" style={{width:"95%",margin:"auto"}}>
       <Typography sx={{textAlign:"center",fontSize:'32px',fontWeight:"300"}} variant="h3" color="initial">Feautered</Typography>
       <div style={{display:"flex",flexWrap:"wrap",columnGap:'30px',rowGap:'20px',justifyContent:"center",alignItems:"center",marginTop:"20px",marginBottom:"15px"}}>
      { courses.map((course)=>( 
            <CourseCard course = {course} /> 
      ))
     }
     </div>

  </div>
}

function CourseCard({course}){
    const navigate    =  useNavigate();

  return <Card sx={{ width:330 , maxWidth: 345,borderRadius:"15px" }}>
              <CardMedia
                      sx={{ height: 140 }}
                      image= {course.image}
                      title="green iguana"
              />
              <CardContent>
              <Typography gutterBottom variant="h6" sx={{fontWeight:"bold",marginBottom:"14px"}} component="div">
                      {course.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{fontWeight:"700",marginBottom:"-10px"}}>
                      {course.price}
              </Typography>
              </CardContent>
              <CardActions sx={{paddingLeft:"20px",paddingRight:"20px"}}>
              <Button variant="contained" color="primary" sx={{width:"100%",borderRadius:"20px",padding:"7px"}} onClick={e=>navigate(`/courseDetails/${course._id}`)}>
                View Details
              </Button>
              
              </CardActions>
</Card>  
}

function About(){

  return<>
       <div style={{width:"95%",margin:'auto'}} className='mt-4'>
           <img style={{width:"100%"}}  src="https://appxcontent.kaxa.in/mobilebucket//teachcode/admin/HOME_GRAPHIC/cover/1702880652367WhatsApp-Image-2023-12-18-at-11.48.18-AM.jpeg" alt="Why 100xDevs?" />
           <Typography sx={{textAlign:"center",fontWeight:"bold",marginTop:"30px" }} variant="h4" color="initial">About 100xDevs </Typography>
           <Card sx={{padding:"20px",fontSize:"20px",borderRadius:"20px",marginTop:"30px",marginBottom:"10px" ,background:"linear-gradient(90deg,#e8ddff, #e1b991)"}}>
                Welcome to 100xdevs. <br/><br/>

                This is an initiative by Harkirat Singh to personally mentor folks in the field of Programming. <br/><br/>

                Harkirat strongly feels that today you are either a 1x engineer or a 100x engineer and nothing in the middle, and his hope is to take everyone in this community to be a 100x Engineer.<br/><br/>

                Join him in his first course on Full Stack development with a heavy focus on Open source projects to learn programming practically. <br/>
          </Card>      
      </div> 
  </>
}



export default Home
