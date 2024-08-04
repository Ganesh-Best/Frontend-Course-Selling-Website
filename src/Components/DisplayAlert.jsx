import React, { useEffect, useState } from 'react'
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';


function DisplayAlert({message}) {
    
  //  const [currentMessage ,setCurrentMessage] = useState(message)
    const [display,setDisplay] = useState("block" );
    
    useEffect(()=>{
        
        
        if(message)
            setDisplay("block");
        
         

         if(display == "block"){
             setTimeout(()=>{
              setDisplay("none");
            },2000)
        }
         

    },[message])
 

    return (
      // width:"55%",marginTop:"10px" 
    <div style={{display:display,width:"55%",marginTop:"10px" }} >
    <Alert variant='outlined' icon={<CheckIcon fontSize="inherit" />} onClose={() => {}} severity={"info"}>
     {message}
    
    </Alert>
    </div>
  )
}

export default DisplayAlert
