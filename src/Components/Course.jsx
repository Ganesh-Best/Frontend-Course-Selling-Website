import { Card, Typography,TextField,Button, Grid,Item} from '@mui/material';
import React,{useState,useEffect,useContext} from 'react';
import { useParams } from 'react-router-dom';
import Axios from 'axios';
import { UserContext } from './Context/UserContext';
import {useNavigate} from 'react-router-dom'; 
import RichTextEditor from './Comp/RichTextEditor';
import Loader from './Comp/Loader';
import DisplayAlert from './DisplayAlert';
import { BASE_URL } from './Comp/Config';

function Course() {
    const  {userInfo} = useContext(UserContext);
    const {courseId}     =  useParams();
    const [course,setCourse] = useState([]);
    const [status ,setStatus] = useState(true);
    const [error,setError] = useState(false);
  
  
     useEffect(()=>{
         
       
         ;( async( )=>{ 


              try {
                 const URL = `${BASE_URL}/admin/course`
                      
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
 return  <div style={{display:'flex',flexDirection:"column",justifyContent:"center",alignItems:"center"}}><Loader />
 <Typography variant="h5" color="initial"> please wait ,course is uploading.....</Typography>
</div>

  
  if(error){
      if(error.response.status == 404)
        return <div> <Typography variant="h3" sx={{textAlign:"center"}} color="initial">No Course found :</Typography>  </div>
      

 }
  return (
     <div>
       <Graytopper title={course.title}/>
       
        
       <Grid  container justifyContent={"center"} spacing={0}>

          <Grid item lg={8} md={12} sm={12}  >
             <UpdateCourse course = {course} setCourse ={setCourse} setStatus={setStatus}  />
            
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

function UpdateCourse({course,setCourse,setStatus}){
     const  {userInfo} = useContext(UserContext);
     const [title,setTitle] = useState(course.title)
     const [description,setDescription] = useState(course.description)
     const [image,setImage] = useState(course.image)
     const [price,setPrice] = useState(course.price)
     const [published,setPublished] = useState(course.published)
     const [file1,setFile1] = useState(course.file1);
     const [file2,setFile2] = useState(course.file2);
     const [featured ,setFeatured] = useState(false);
     const [introVideo ,setIntroVideo ]  = useState("");
     const [syallabus,setSyallabus] = useState(course.syallabus)
     

     const courseUpdate = async()=>{
          
        if(title&&price&&introVideo&&file1&&file2&&description&&image){
               const URL = `${BASE_URL}/admin/course`
               setStatus(true);
          const response =  await Axios.put(`${URL}/${course._id}`,{
                title,description,image,price,published,file1,file2,introVideo,syallabus,featured
               },{
                headers:{
                  'Content-Type':"multipart/form-data",
                  "token":userInfo.token
                }
               }) 
               setStatus(false)  
               console.log(response)
              
               setCourse(response.data.course);
               window.alert("Course has been updated Successfully :");
               
              }else
                alert("please fill all required fields: ")
      
      
      
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
             <div style={{display:'flex',flexDirection:"column",height:'auto'}}>
             <label>Syallabus</label>
             <RichTextEditor syallabus={syallabus}  setSyallabus={setSyallabus} width={"100%"} />
             </div>
             <div style={{display:'flex',flexDirection:"column",height:'auto'}}>
             <label>Intro Video</label>
             <TextField  type='file' name="introVideo" onChange={(e)=>{setIntroVideo(e.target.files[0])  }}  />
             </div>
             <div style={{display:'flex',flexDirection:"column",height:'auto'}}>
             <label>Video 1</label>
              <TextField  
              type='file' 
              name="file" 
              onChange={(e)=>{setFile1(e.target.files[0])  }}  
              /> 
              </div>
              <div style={{display:'flex',flexDirection:"column",height:'auto'}}>
              <label>Video 2</label>
              <TextField  
              type='file' 
              name="file2" 
              onChange={(e)=>{setFile2(e.target.files[0]) }} 
               />
               </div> 
             <Button  
               size="large" 
               variant="outlined"  
               onClick = {(e)=>setPublished(!published) }  
               > {(published)?"Published":"Not Published"}
               </Button>
             <Button  
              size="large" 
              variant="outlined" 
              sx={{textTransform:"capitalize"}} 
              onClick = {(e)=>setFeatured(!featured) }  
              > 
              {(featured)?"featured":"Not featured"}
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




