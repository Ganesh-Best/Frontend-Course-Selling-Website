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
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from './Comp/Config';



function CourseDetails() {

    const [value, setValue] = React.useState('1');
    const {courseId} = useParams();

     
     const URL = `${BASE_URL}/user/coursedetail`;
     const option = {
        headers:{
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
   const navigate = useNavigate();
   const userInfo = JSON.parse(localStorage.getItem('userInfo'));
   
   console.log('userInfo',userInfo)

   const buyCourse = async({amount,id})=>{
        
    //Checking whether User is logged in or not if not redirect to login page
     if(!userInfo?.token)
        return navigate('/signin')
       
       console.log('purchased',amount ,userInfo.token,userInfo.role)

        const {data:{order,key_secret}} = await Axios.post(`${BASE_URL}/user/checkout`,{},{headers:{
            token:userInfo.token,
            amount
          }})
              
           console.log(order,key_secret)

      const options = {
        "key": key_secret, // Enter the Key ID generated from the Dashboard
        "amount": order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        "currency": "INR",
        "name": "Coursea",
        "description": "Test Transaction",
        "image": " ",
        "order_id": order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        "callback_url": `${BASE_URL}/user/paymentverify?email=${userInfo.email}&id=${id}`,
        "prefill": {
            "name": userInfo.name,
            "email": userInfo.email,
            "contact": ""
        },
        "notes": {
            "address": "Coursera Corporate Office"
        },
        "theme": {
            "color": "#3399cc"
        }
    };
     
    const razor  =  new window.Razorpay(options);

    razor.open();


            
  }

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
        {'\u20B9'}{course.price}
        </Typography>
        <Button variant="contained" onClick={()=>buyCourse({amount:course.price,id:course.id})} color="primary" sx={{display:"block",width:"100%",padding:"10px",borderRadius:"10px"}} >
          Buy Now
        </Button>
      </CardContent>
      
    </Card>  


    </div>
}

export default CourseDetails
