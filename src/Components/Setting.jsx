import { useState,useEffect } from 'react'; 
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button';
import Axios from 'axios';
import Typography from '@mui/material/Typography'
import DisplayAlert from './DisplayAlert';
import { BASE_URL } from './Comp/Config';


export default function Setting() {
  const [value, setValue] = useState('1');
  
 
  
   
 
  

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', typography: 'body1',marginTop:"60px" }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="General " value="1" />
            <Tab label="Security" value="2" />
            {/* <Tab label="Item Three" value="3" /> */}
          </TabList>
        </Box>
        
        <TabPanel value="1">
            <General />
        </TabPanel>
        
        <TabPanel value="2">
            <Security/>
        </TabPanel>
        
      </TabContext>
    </Box>
  );
}

const General = (props)=>{
 
  
  // const [type,setType] = useState("user");
  const [NAME,setName] = useState();
  const [EMAIL,setEmail] = useState();
  const [MOBILE,setMobile] = useState();
  const [loading,setLoading] = useState(true);

  let type= "user";

  if(JSON.parse(localStorage.getItem('userInfo')).role=="admin")
     type="admin";


  const URL = `${BASE_URL}/${type}/userinfo`;

  useEffect(() => {
  
   ;(async()=>{
                      
     const {data} =   await Axios.get(URL,{headers:{
           token:JSON.parse(localStorage.getItem('userInfo')).token
         }}) 
         const {userInfo} = data ;
         setLoading(false);
         setName(userInfo.name);
         setEmail(userInfo.email);
         setMobile(userInfo.mobile);

   })()
  
  }, []);

if(loading )
  
  return 
  <div>
     <Typography variant="h5" color="initial">Loading Please wait </Typography>
  </div>

    
    return <div style={{width:"50%",display:"flex",flexDirection:"column",justifyContent:"center",gap:'25px'}}>
   
   <TextField
     
     id="outlined-required"
     readOnly
     label="Name*"
     value={NAME}
     sx={{color:"red",width:"54%",borderRadius:"3rem"}}
   />
   <TextField
     id="outlined-required"
     readOnly
     value={EMAIL}
     label="Email*"
     
   />
   <TextField
     id="outlined-required"
     label={"Mobile*"}
     readOnly
     value={MOBILE}
     
   />
   <Button readOnly variant="contained" color="primary" sx={{borderRadius:"40px",width:"160px",alignSelf:"center",padding:"20px"}}>
     Save Profile
   </Button>

    </div>
}

const Security = ()=>{

  const [currentPassword,setCurrentPassword] = useState()
  const [newPassword,setNewPassword] = useState();
  const [confirmPassword,setConfirmPassword] = useState();
  const [loading,setLoading] = useState(true);

  const [message,setMessage] = useState("");
  const [key,setKey]= useState();
  
  let type = "user";

 if(JSON.parse(localStorage.getItem('userInfo')).role == 'admin')
   type="admin"
    
  useEffect(() => {

    let URL = `${BASE_URL}/${type}/userinfo`;
        
    ;(async()=>{
                      
     const {data} =   await Axios.get(URL,{headers:{
           token:JSON.parse(localStorage.getItem('userInfo')).token
         }})
         const {userInfo} = data ;

         setLoading(false);
         setCurrentPassword(userInfo.password);
         console.log(userInfo);
                

   })()
  
  }, []);

const  changePassword  = async ()=>{
        
   if(confirmPassword == newPassword){

        let url = `${BASE_URL}/${type}/passchange`
         console.log('password prompt' ,newPassword)

      const {data}  =      await Axios.post(url,{},{headers:{
                'Content-Type':'application/json',
                token:JSON.parse(localStorage.getItem('userInfo')).token,
                password:newPassword
               }})

              console.log("Password has been changed",data);

              setMessage(data.message);
              console.log('key',key)
              if(typeof(key) == 'undefined' )
              setKey(1);
              else
               setKey(key+1);


   }else{
      
    console.log("Prompt for New Password is not matched :" ,confirmPassword,newPassword)

   }
      

} 

if(loading )
  
  return 
  <div>
     <Typography variant="h5" color="initial">Loading Please wait </Typography>
  </div>

    return <>
       <div> 
       <TextField
          required
          type="password"
          id="outlined-required"
          label="Current Password"
          value={currentPassword} 
          sx={{color:"red",width:"54%",borderRadius:"3rem"}}
        /> <br/>
        <TextField
          required
          type="password"
          id="outlined-required"
          label="New Password"
          onChange={e => setNewPassword(e.target.value)} 
          style={{fontSize:"20px" ,marginTop:"20px" ,width:"54%"}}
        /> <br/>
        <TextField
          required
          type="password"
          id="outlined-required"
          label="confirm new password" 
          onChange={e => setConfirmPassword(e.target.value)}
          sx={{borderRadius:"30%",marginTop:"20px",width:"54%" }}
        /> <br/>

        <Button variant="contained" onClick={changePassword} color="primary" style={{textTransform:"capitalize",marginTop:"15px",borderRadius:"30px",fontSize:"18px",padding:"13px 23px"}}>
         Change Password          
        </Button>

       { key && <DisplayAlert key={key} message = {message}  /> }
     
       </div>
    </>

}