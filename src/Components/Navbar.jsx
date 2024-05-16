import React, { useEffect, useState } from 'react'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { Link , useNavigate } from 'react-router-dom'

function Navbar() {

   const  navigator = useNavigate();      
   const [name,setName] = useState("")
         
     useEffect(()=>{

              const userInfo = JSON.parse(localStorage.getItem('userInfo'))
              
               if(userInfo){
                 setName(userInfo.name||userInfo.email)
              }
      

     },[])
   
      const addCourse = ()=>{
               
              navigator("/addcourse");

      }

    if(name){
    return <div style={{"display":"flex","flexDirection":"row","justifyContent":"space-between",padding:"20px"}} > 
              <div >
                    <Typography variant="h4" color="initial">Coursera</Typography>
              </div>
              <div>
              <Button size='large' style={{"marginRight":"10px"}} variant="contained" color="primary" onClick={addCourse} >{"Add Course"}</Button>
              <Button size='large' style={{"marginRight":"10px"}} variant="outlined" color="primary">{name }</Button>
              <Button size='large' variant="contained" color="primary" onClick={event=>{localStorage.removeItem("userInfo"); window.location ="/signin"  }}  >Logout</Button>
              </div>

       </div>



    }


  return (
    <div style={{"display":"flex","flexDirection":"row","justifyContent":"space-between",padding:"20px"}} > 
         <div >
            <Typography variant="h4" color="initial">Coursera</Typography>
         </div>
         <div>
         <Link to="/signin"><Button size='large' style={{"marginRight":"10px"}} variant="contained" color="primary">Signin</Button></Link>
         <Link to="/signup"><Button size='large' variant="contained" color="primary">Signup</Button></Link>
         </div>
      
    </div>
  )
}

export default Navbar
