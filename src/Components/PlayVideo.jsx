import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Axios from 'axios';
import Typography from '@mui/material/Typography'
import { BASE_URL } from './Comp/Config';

function PlayVideo() {
         
    const {key}     = useParams()
    const [url ,setUrl] = useState('');
    const [loading,setLoading] = useState(true);
    const [error,setError] = useState("");

    useEffect(() => {
        
        ;(async()=>{

            try {
                const {data:{URL}}    = await Axios.get(`${BASE_URL}/user/video`,{headers:{
                        'token': JSON.parse(localStorage.getItem('userInfo')).token,
                        key
                       }});       
    
                       setLoading(false);
                       console.log(URL);
                          setUrl(URL)
    
                        } catch (e) {
    
                   setLoading(false);
                   setError(e.message)
    
            }
            

        })()       
        
    }, []);

if(loading)
   return <div>
       <Typography variant="body1" color="initial">Loading video ...... please wait</Typography>

    </div>

if(url){
    console.log(url,"URL block ")

return <>       

<video width="90%" height="450px" controls controlsList='nodownload' style={{borderRadius:"30px"}} >
<source src={url} type="video/mp4" />
Your browser does not support this video , kindly change browser and update the browser.
</video>

</>
 
}

}
export default PlayVideo
