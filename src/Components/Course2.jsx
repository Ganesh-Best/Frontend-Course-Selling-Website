import React, { useEffect, useState } from 'react'
import Typography from '@mui/material/Typography'
import {Card , Button } from '@mui/material/';
import TextField from '@mui/material/TextField';
import axios from 'axios' ;
import { useParams } from 'react-router-dom';
import Grid from '@mui/material/Grid'





function Course2() {

     const [course,setCourse] = useState(null)
     const {courseId}     =  useParams();

    useEffect( () => {

        axios.get("http://localhost:9000/admin/course/"+courseId,{
           headers:{
               token:localStorage.getItem("token")
           }
        }).then((response)=>{
           setCourse(response.data.course)
           console.log(response.data.course)
          
        }).catch((error)=>console.log("Unable to get response server :"))
      
            
       },[])
      
  if(!course)
   return  <div>Loading...</div>

  return (
    <div>
           <GrayTopper  title ={course.title} />
           
           

           <Grid container >
              
              <Grid item lg={8} md={12} sm={12}>
                   <UpdateCourse course={course} setCourse={setCourse} />
              </Grid>
              <Grid item lg={4} md={12} sm={12} >
                   <CourseCard course={course} />  
              </Grid>
             
           </Grid>
    </div>
  )
}

function GrayTopper({title}){
       const grayStyle ={
        display:"flex",
        flexDirection:"row",
        justifyContent:"center" ,
        alignItems:"center", 
        width:"100%",
        height:"250px",
        
        zIndex:0,
        background:"#212121",
        marginBottom:"-250px"
       }
   return <div style={grayStyle}>            
         <Typography variant="h3" color="white">{title}</Typography>  
   </div>
}

function UpdateCourse({course,setCourse}){
    
    const [title,setTitle]   =  useState(course.title)
    const [description,setDescription]   =  useState(course.description)
    const [image,setImage]   =  useState(course.image)
    const [price,setPrice]   =  useState(course.price)
    

    const courseUpdate = async()=>{
          
      const response   = await axios.put(`http://localhost:9000/admin/course/${course.id}`,{
                         title,
                         description,
                         image,
                         price,
                         "published":true
                        },{
                            headers:{
                             'Content-Type':"application/json",
                              token:localStorage.getItem('token')
                        }
                          })

                      
                    

                       console.log(response.data.course)
                    setCourse(response.data.course);
                       
                
 }  

 return <div style={{display:"flex",justifyContent:"center"}} >
         
        <Card style={{width:"430px",height:"330px",padding:"20px" ,marginTop:"180px" }} >
        <Typography variant="body2" color="initial" style={{marginBottom:"10px"}} >Update Course Details</Typography>
        <TextField fullWidth value={title} onChange={event=>setTitle(event.target.value)}   id="outlined-basic" label="title" variant="outlined" />
        <TextField fullWidth value={description} onChange={event=>setDescription(event.target.value)}  style={{marginTop:"10px"}} id="outlined-basic" label="description" variant="outlined" />
        <TextField fullWidth value={image} onChange={event=>setImage(event.target.value)} style={{marginTop:"10px"}} id="outlined-basic" label="image" variant="outlined" />
        <TextField fullWidth value={price} onChange={event=>setPrice(event.target.value)}  style={{marginTop:"10px"}} id="outlined-basic" label="price" variant="outlined" />
        <Button size='large' style={{marginTop:"5px"}} variant="contained" color="primary" onClick={courseUpdate} > UPDATE COURSE </Button>
        </Card>

    </div>
}

function CourseCard({course}){

   
   return <div style={{display:"flex",justifyContent:"center"}}>
              
               <Card style={{width:"300px",height:"290px",borderRadius:"20px",marginTop:"90px",padding:"10px"}} >
                  <img src={course.image} alt="course image" style={{width:"100%",height:"190px"}} ></img>
                  <Typography variant="h6" color="initial" style={{fontSize:"18px"}}>{course.title}</Typography> 
                  <Typography variant="caption" color="text.secondary">Price</Typography>
                  <Typography variant="body1" color="initial">{"Rs "+course.price}</Typography>
               </Card>

    </div>

}

export default Course2
