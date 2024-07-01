import React, { useState ,useEffect } from 'react'
import Axios from 'axios';

function useAxiosFetch(url,option={}) {

    const [courses,setCourses] = useState([]);
    const [error ,setError]  = useState(false);
    const [loading ,setLoading] = useState(true);

     useEffect(() => {
        
        ;( async()=>{
               
               try {
                const response   =  await Axios.get(url,option)
                setCourses(response.data.courses)
     
               } catch (error) {
                  setError(error)

               }finally{

                 setLoading(false);
               
                }        
         })()
        
     }, [url]); 

    
  return { courses,error,loading }
}

export default useAxiosFetch
