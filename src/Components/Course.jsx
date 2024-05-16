import { Card, Typography,TextField,Button, Grid,Item} from '@mui/material';
import React,{useState,useEffect,useContext} from 'react';
import { useParams } from 'react-router-dom';
import Axios from 'axios';
import { UserContext } from './Context/UserContext';
import {useNavigate} from 'react-router-dom'; 

function Course() {
    const  {userInfo} = useContext(UserContext);
    const {courseId}     =  useParams();
    const [course,setCourse] = useState([]);
    const [status ,setStatus] = useState(true);
    const [error,setError] = useState(false);
  
     useEffect(()=>{
         
       
         ;( async( )=>{ 


              try {
                 const URL = "http://localhost:9000/admin/course"
                      
                 const response =  await Axios.get(`${URL}/${courseId}`,{
                          headers:{
                            'Content-Type':'multipart/form-data',
                            "token": userInfo.token
                          }
                         })
                          setStatus(false); 
                          setCourse(response.data.course)
                          console.log(response.data.course)

                          

              } catch (e) {
                 setStatus(false)
                 setError(e)
                 
                console.log("Error occur :",e)


                
              }

         })()
           

            // Axios.get('http://localhost:9000/admin/course/'+courseId,{
            //   headers:{
            //     'Content-Type':"multipart/form-data",
            //     "token":userInfo.token
            //   }
            // })
            // .then((response)=>{
            //      setCourse(response.data.course);        
            // }).catch(error=>console.log("Ops something went wrong :"))
      },[])

     
 if( status )
 return <div>Loading....</div>
  
  if(error){
      if(error.response.status == 404)
        return <div> <Typography variant="h3" sx={{textAlign:"center"}} color="initial">No Course found :</Typography>  </div>
      

 }
  return (
     <div>
       <Graytopper title={course.title}/>
       
        
       <Grid  container justifyContent={"center"} spacing={0}>

          <Grid item lg={8} md={12} sm={12} >
             <UpdateCourse course = {course} setCourse ={setCourse} />
          </Grid>

          <Grid item lg={4} md={12} sm={12} >
             <CourseCard course={course}/>
          </Grid>
         
       </Grid>
    </div>
  )
}

function Graytopper(props){

  return  <div style={{
                    display:"flex",
                    border:"2px solid black",
                    justifyContent:"center",
                    alignItems:"center",
                    width:"100%",
                    height:"260px",
                    backgroundColor:"#181317",
                    color:"white",
                    marginBottom:"-100px"
                    }}>
           
           <div  >
                   <Typography variant="body1" style={{fontSize:"30px"}} >{props.title}</Typography>
           </div>
           
           
  </div>
}

function UpdateCourse({course,setCourse}){
     const  {userInfo} = useContext(UserContext);
     const [title,setTitle] = useState(course.title)
     const [description,setDescription] = useState(course.description)
     const [image,setImage] = useState(course.image)
     const [price,setPrice] = useState(course.price)
     const [published,setPublished] = useState(course.published)
     const [file1,setFile1] = useState(course.file1.key);
     const [file2,setFile2] = useState(course.file2.key);
     
     const courseUpdate = async()=>{
               const URL = "http://localhost:9000/admin/course"
          const response =  await Axios.put(`${URL}/${course._id}`,{
                title,description,image,price,published,file1,file2
               },{
                headers:{
                  'Content-Type':"multipart/form-data",
                  "token":userInfo.token
                }
               }) 

               console.log(response)

               setCourse(response.data.course);
               alert("Course has been updated Successfully :");
      
      
      
      // Axios.put('http://localhost:9000/admin/course/'+course.id,{
      //       title,
      //       description,
      //       image,
      //       price,
      //       "published":true
      //      },{
      //       headers:{
      //         "token":localStorage.getItem("token"),
      //         "Content-Type":"multipart/form-data"
      //       }
      //      })
      //      .then((response) => {

      //      setCourse(response.data.course)
           
      //      }).catch((error)=>{console.log(error,course.id)})

     }
     
 return <div style={{ display:"flex",justifyContent:"center",marginTop:"50px"}}>

          <Card style={{display:"flex",gap:"10px",flexDirection:"column",width:"500px",padding:"20px",borderRadius:"15px"}} >
             <Typography variant="h6" color="initial"> Update Course</Typography>
             <TextField
               id=""
               label="Title"
               value={title}
               onChange={event=>setTitle(event.target.value)}
               style={{marginTop:"10px"}}
             />
             <TextField
               id=""
               label="Description"
               value={description}
               onChange={event=>setDescription(event.target.value)}
               style={{marginTop:"10px"}}
             />
             <TextField
               id=""
               label="Image"
               value={image}
               onChange={event=>setImage(event.target.value)}
               style={{marginTop:"10px"}}
             />
             <TextField
               id=""
               label="Price"
               value={price}
               onChange={event=>setPrice(event.target.value)}
               style={{marginTop:"10px"}}
             />
              <TextField  
              type='file' 
              name="file" 
              onChange={(e)=>{setFile1(e.target.files[0])  }}  
              /> 
              <TextField  
              type='file' 
              name="file2" 
              onChange={(e)=>{setFile2(e.target.files[0]) }} 
               /> 
             <Button  
               size="large" 
               variant="outlined"  
               onClick = {(e)=>setPublished(!published) }  
               > {(published)?"Published":"Not Published"}
               </Button>
             
             <Button style={{marginTop:"10px"}} onClick={courseUpdate} size="large" variant="contained" color="primary">
               Update Course
             </Button>
             

          </Card>
 </div>
}

function CourseCard(props){
        let navigate =  useNavigate();

  return <div> 
          <Card style={{maxWidth:"400px",height:"auto",borderRadius:"20px"}} >
             <img style= {{ width:"100%",height:"200px"}} 
             src={props.course.image} alt="" />
             <Typography style={{paddingLeft:"10px"}} variant="body1" color="initial">
              {props.course.title}
             </Typography>
             <Typography style={{paddingLeft:"10px"}} variant="subtitle1" color="GrayText">
              {"Price"}
             </Typography>
             <Typography variant="body1" style={{paddingLeft:"10px"}} color="initial">
              {`Rs ${props.course.price}`}
             </Typography>
             <Button variant="text" 
                     color="primary" 
                     sx={{marginLeft:"10px",marginTop:"10px",marginBottom:"10px",padding:"20px",borderRadius:"20px"}}
                     onClick={(e)=>navigate(`/viewcourse/${props.course._id}`)}
                     >
               View Course
             </Button>
         </Card>
  </div>
}

export default Course




