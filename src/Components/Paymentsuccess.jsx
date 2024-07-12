 import  Axios  from 'axios';
import React ,{useEffect}from 'react';
import { useSearchParams } from 'react-router-dom';
 
 function Paymentsuccess() {
        const params    =     useSearchParams()[0]
        const paymentId =     params.get('reference');
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        useEffect(() => {
            
             (async()=>{
                        
               const  response    =   await Axios.get(`http://localhost:9000/user/paymentinfo?reference=${paymentId}`,{ 
                                                  headers:{
                                                    'Content-Type':'application/json',
                                                     'token': userInfo.token
                                                  }})

 
                   console.log('payment details' ,response.data)

             })()     
        
          

        }, []);

    return (
     <div>
        {"Payment ID :"+paymentId}
     </div>
   )
 }
 
 export default Paymentsuccess
 