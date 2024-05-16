import React, { useContext, useState } from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography'
import { useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import Axios from 'axios';
import { SwitchContext } from './Context/SwitchContext';

function Signup() {
      let status ;
      const navigate = useNavigate()
    const {admin,setAdmin} = useContext(SwitchContext);
    const [name,setName] =         useState("")  
    const [username,setUsername] = useState("")
    const [password,setPassword] = useState("")
    const [mobile,setMobile] = useState("");
    const [alert,setAlert] =  useState(false);
    const [error,setError] = useState(false);
    const [alertMessage,setAlertMessage] = useState("");

    const myStyle ={
      "width":"400px",
      "padding":"15px"       
    }
    const myStyle2 = {
        "paddingTop":"100px",
        "marginBottom":"10px",
        "display":"flex",
        "flexDirection":"row",
        "justifyContent":"center"
    }

  const signup = async(event)=>{
       
       let url = `http://localhost:9000/${admin}/signup`
 
                      
   try {
       const response =    await   Axios.post(url,{},{
                 headers:{
                   'Content-Type': 'multipart/form-data',
                   "username": username ,
                   "password" : password,
                   "name":name,
                   "mobile": mobile,
                 }
               })  
             
             
               if(response.status === 201){
                
                 setAlert(true);
                 setAlertMessage(response.data.message);
                 setTimeout(()=>{
                  window.location = "/signin"
               },5000)  
                 
          }
   } catch (error) {
         console.log(error)
         setError(true);
         setAlert(true);
         if(error.code =="ERR_NETWORK")
         setAlertMessage("Network error! Please check")
         else if(error.response.status == 302 ){
            setAlertMessage(error.response.data.message)     
             
         }else if(error.response.status == 404)
          setAlertMessage("Ops something went wrong ,try again :")
          else
           setAlertMessage("Something went wrong , please reach out to admin ")   

     
   }



    //     fetch(url,{
    //       method:"POST",
    //       headers:{
    //         "Content-Type":"application/json",
    //         "username":username,
    //         "password":password
    //       }
    //     }).then(response=>{ 
    //       status = response.status ;
    //        return response.json()
    //     }).then(data=>{
    //         console.log(data)
              
    //           if(status == 409)
    //            return alert("User already exist ! Please login.")
              
    //            alert("Sign up successful! Please login.")
    //            setUsername("");
    //            setPassword("") 
    //            navigate("/signin")
    // }).catch(error=>console.log(error))
        
      
    }

    const toggleUser = ()=>{
            
      if(admin == "admin")
        return setAdmin("user")     
        setAdmin("admin")
   }
  

  return (
     <>
      <div style={myStyle2} > 
        
            <Typography variant="h6" color="initial">
            Welcome to Coursera , Please Sign Up below
            </Typography>
           
           
      </div>
     

    <div style={{"display":"flex","flexDirection":"row","justifyContent":"center"}}>
    <Card variant="outlined" style={myStyle}>
     
    <TextField 
        fullWidth={true} 
        id="Name"
        value={name} 
        label="Name" 
        onChange={(event)=>setName(event.target.value)}
        variant="outlined" /> 
        <br/>
        <br/>
    <TextField 

       fullWidth={true} 
       id="email"
       value={username} 
       label="Email" 
       onChange={(event)=>setUsername(event.target.value)}
       variant="outlined" />
       <br/><br/>  
       <TextField 

        fullWidth={true} 
        id="Mobile"
        value={mobile} 
        label="Mobile" 
        onChange={(event)=>setMobile(event.target.value)}
        variant="outlined" />

        <br/><br/>
   
    <TextField fullWidth={true} value={password} onChange={(event)=>setPassword(event.target.value)}  id="password" label="Password" variant="outlined" type={"password"} /> <br/> <br/>   
    <Button size="large" variant="contained" onClick={signup}  >Signup</Button>
    <Alert severity = {`${error?"error":"success"}`}  variant='filled'  sx={{marginTop:"10px",display:`${alert?"flex":"none"}`, height:"28px" }}  >
       {alertMessage}
    </Alert>
    <Typography sx={{marginTop:'10px'}} variant="body1" color="initial">Sign in as  <Button variant="text" color="primary" onClick={toggleUser}> {(admin == "user")?"admin":"user"  }  </Button></Typography>
    </Card>
   
    </div>
    
    
    </>
  )
}

export default Signup
