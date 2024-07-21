import React,{useEffect,useState} from 'react'
import Typography from '@mui/material/Typography'
import Axios from 'axios';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';





function PurchasedCourses() {
     
     const [courses, setCourses] = useState([]);
     const [loading,setLoading] = useState(true);
     const [error,setError] = useState(false);
    
    useEffect(() => {
           const  URL = "http://localhost:9000/user/myCourses"      
            
           ;( async()=>{
                   
            try {
                const {data:{courses}}    =   await Axios.get(URL,{headers:{
                            'Content-Type':' multipart/form-data',
                            token:JSON.parse(localStorage.getItem('userInfo')).token
                        }})
                         setLoading(false);
                         setCourses(courses);
                        console.log(courses)
              

            } catch (e) {
                setLoading(false)
                setError(e)
            }


           })()
    
        
    }, []);

if(loading)
    return <div>
        <Typography variant="h4" component="h4" align="center" >Loading... Please wait</Typography>
    </div>

if(!courses.length)
    return <div>
         <Typography variant="h4" component="h4" align="center" >You haven't purchased the course  </Typography>
    </div>


  return (
    <div>
            <Typography variant="h4" color="initial">My Purchases :</Typography>      
            
            <CourseCard courses={courses} />
            {console.log(courses[0])}
    </div>
  )
}

const CourseCard = ({courses})=>{
      
     const navigate = useNavigate();

    return <div style={{marginTop:"50px", display:"flex",flexWrap:"wrap",gap:"20px"}} >
        { courses.map((course,index)=>{
        return (
                <Card sx={{ width:340, maxWidth: 345 ,borderRadius:"30px" }} key={index}>
      <CardMedia
        sx={{ height: 230 }}
        image={course.image}
        title="green iguana"
      />
      <CardContent  >
        
        <Typography variant="body2" color="text.secondary" sx={{padding:"10px",fontSize:"23px"}}>
        <b>{course.title}</b>
        </Typography>

        <Button variant="contained" color="primary" onClick={()=>navigate(`/viewcourse/${course._id}`)}  sx={{textTransform:"capitalize",borderRadius:"20px",display:"block",padding:"10px" , width:"100%",marginBottom:"10px"}} >
          View Course          
        </Button>
        <Button variant="contained" onClick={()=>navigate(`/paymentsuccess?id=${course._id}`)}  color="primary" sx={{textTransform:"capitalize" , borderRadius:"20px",display:"block",padding:"10px" , width:"100%",marginBottom:"10px"}} >
          View Invoice          
        </Button>

      
      </CardContent>
      <CardActions>
        
      </CardActions>
                </Card>
        
       )}) }
    </div>
}

export default PurchasedCourses
