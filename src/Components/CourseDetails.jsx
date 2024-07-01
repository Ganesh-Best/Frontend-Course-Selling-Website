import React, { useEffect, useState } from 'react' ;
import Typography from '@mui/material/Typography' ;
import { Grid } from '@mui/material' ;
import Axios from 'axios';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';



function CourseDetails() {

    const [value, setValue] = React.useState('1');
    const {courseId} = useParams();

     const token = JSON.parse(localStorage.getItem('userInfo')).token ;
     const URL = 'http://localhost:9000/user/coursedetail';
     const option = {
        headers:{
            token,
            'Content-Type': 'multipart/form-data',
        }
     }
      
     const [course,setCourse] = useState({});
     const [error,setError] = useState(false);
     const [loading , setloading] = useState(true) ;

      useEffect(() => {
      
        ;    (async()=>{
                     
            try {
                
                const response  =   await Axios.get(`${URL}/${courseId}`,option)
                          
                setCourse(response.data);
                 setloading(false);
                 console.log(course.key)       
                
            } catch (e) {
               setloading(false);
               setError(true);
                
            }     
                

            })()       

       }, []); 
    
    const handleChange = (event, newValue) => {
        setValue(newValue);
      };

  return (
    <div style={{}}>
       <Background/>
       <Grid container>

        <Grid item lg={7} md={12} sm ={12} xs={12} sx={{marginBottom:"70px"}}  >
             
          

        <Box sx={{ width: '90%', typography: 'body1',marginLeft:"30px" }}>
            <TabContext value={value}>
               <Box sx={{ borderBottom: 1, borderColor: 'divider', width:"90%" }}>
                <TabList onChange={handleChange} aria-label="lab API tabs example">
                  <Tab label="Overview" value="1" sx={{ paddingLeft:"1px",textTransform:"capitalize",fontWeight:"bold",fontSize:"22px"}} />            
                </TabList>
              </Box>
            <TabPanel value="1" sx={{paddingLeft:'1px' }}>
            
             <Details course={course} loading={loading} error={error} />
            </TabPanel>
            </TabContext>
        </Box>

           
        

        </Grid>
        <Grid item lg={5} md={12} sm ={12} xs={12} sx={{marginTop:"-90px"}}>
         <Purchase course={course} loading={loading}/> 
        </Grid>

       </Grid>

    </div>
  )
}


function Background({title}){

    return <div style={{display:"flex",flexDirection:"column",justifyContent:"center",backgroundColor:"royalblue",height:"150px",color:"white",width:'105.5%',marginLeft:"-40px",marginTop:"-30px"}}>
          
          <Typography variant="h4" sx={{color:"white",fontWeight:"bold",paddingLeft:"70px"}}>Live Coherent 1-100</Typography>

    </div>
}

function Details({course,error,loading}){
      
    
   if(loading)
     return  <div>
        Loading ........ <br/>
        Please wait
     </div>    
  
  return <div>
           <video width="100%" height="340" controls controlsList="nodownload">
           <source src={course.introVideo.url} type="video/mp4"></source>
           </video>    
           
           <br/>
           <br/>    
           <div style={{marginBottom:"50px" }}>
              <Typography variant="h6" color="initial" sx={{marginBottom:"10px",fontWeight:"bold",fontSize:"22px"}}>Description</Typography>
              <Typography variant="body1" color="initial">{course.description}</Typography>
           </div>
           <div>

                   <Typography variant="h6" color="initial" sx={{marginBottom:"20px",fontWeight:"bold",fontSize:"22px"}} >Syllabus</Typography>
                   <div dangerouslySetInnerHTML={{ __html: course.syallabus }} />

                  
           </div>
             
    </div>
}

function Purchase({course,loading}){

  if(loading)
    return  <div>
       Loading ........ <br/>
       Please wait
    </div>

    return <div>

<Card sx={{ borderRadius:"30px" ,width:"400px" }}>
      <CardMedia
        sx={{ height: 240 }}
        image={course.image}
        title={course.title}
      />
      <CardContent sx={{padding:"20px"}}>
        <Typography gutterBottom variant="body2" color="text.secondary" component="div" sx={{fontWeight:"bold"}}>
          Price
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{fontSize:"20px", marginBottom:"10px"}}>
        {'\u20B9'}6000
        </Typography>
        <Button variant="contained" color="primary" sx={{display:"block",width:"100%",padding:"10px",borderRadius:"10px"}} >
          Buy Now
        </Button>
      </CardContent>
      
    </Card>  


    </div>
}

export default CourseDetails
