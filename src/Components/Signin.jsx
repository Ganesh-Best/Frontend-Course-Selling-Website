import React from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography'
import { useState ,useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import Axios from 'axios';
import { UserContext } from './Context/UserContext';
import { SwitchContext } from './Context/SwitchContext';
import { BASE_URL } from './Comp/Config';


function Signin() {
   let  navigate2 = useNavigate();
   const {admin,setAdmin} = useContext(SwitchContext);    
   const  [email,setEmail] = useState("");
   const  [password,setPassword] = useState("");
   const  [error ,setError] = useState(false);
   const  [alert,setAlert] = useState(false);
   const  [alertMessage,setAlertMessage] = useState("");
   
   
  
   const {userInfo,setUserInfo} = useContext(UserContext) ;
  const URL = `${BASE_URL}/${admin}/signin`
  //  const Base_URL =  `https://jsonplaceholder.typicode.com/posts`
   const  navigate       =    useNavigate()
   
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

    const signIn = async()=>{
         
            
               

       try {
             
           const response  = await Axios.post(URL,{},{
             headers:{
               'Content-Type': 'application/json',
               'username':email,
               "password":password
             }
           })
           

           
           if(response.status === 200){
                   
                 localStorage.setItem('userInfo', JSON.stringify(response.data.userInfo));
                 console.log("Login successful :",response.data.token)
                 console.log(response,email,password)
                  setUserInfo(response.data.userInfo);
                  console.log("Userinfo admin sign in",response.data.userInfo)
                 setAlert(true);
                 setAlertMessage("Login successfully")
               
                 if(admin == "admin")
                   navigate2('/adminhome')
                  

                 if(admin == "user"){
                   navigate2('/')
                 }
                 
                    
 
           }

           
           
           
       }catch (e) {
          setAlert(true);
          
         
         if(e.response.status == 404){
          console.log('status ',e.response.status)
          setAlertMessage("Username or password is incorrect ")
         
        }
         else if(e.response.status === 411)
         setAlertMessage(e.response.data.message)
         else 
         setAlertMessage("something went wrong ,please try again later :")       
        
       }

        
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
            Welcome back to Coursera , Please Sign In below
            </Typography>
           
           
      </div>
     

    <div style={{"display":"flex","flexDirection":"row","justifyContent":"center"}}>
    <Card variant="outlined" style={myStyle}>
    <TextField  required type="email" fullWidth={true} value={email} onChange={event=>setEmail(event.target.value)} id="email" label="Email" variant="outlined" />  <br/><br/>  
    <TextField  required fullWidth={true} value={password} onChange={event=>setPassword(event.target.value)} id="password" label="Password" variant="outlined" type={"password"} /> <br/> <br/>   
    <Button size="large" variant="contained" onClick={signIn}  >Signin</Button>
    <Alert severity = {`${(error)?"danger":"success"}`}  variant='filled'  sx={{marginTop:"10px",display:`${alert?"flex":"none"}`}}  >
       {alertMessage}
       
    </Alert>
    <Typography sx={{marginTop:'10px'}} variant="body1" color="initial">Sign in as  <Button variant="text" color="primary" onClick={toggleUser}> {(admin == "user")?"admin":"user"  }  </Button></Typography>
    </Card>
    </div>
    
    
    </>
  )
}

export default Signin
