 import  Axios  from 'axios';
import React ,{useEffect,useState} from 'react'; 
import { useParams, useSearchParams } from 'react-router-dom';
import Typography from '@mui/material/Typography'



 
 function Paymentsuccess() {
        const params    =     useSearchParams()[0]
        let paymentId =     params.get('reference');
        let  id      =    params.get('id');
        let reference = "reference" ;
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));

        const [paymentInfo,setPaymentInfo] = useState({});
        const [loading,setLoading] = useState(true); 

        const [error,setError] = useState(false);
         console.log('ID:',id) 
         if(!paymentId){
             paymentId = id;
             console.log('paymentId',id)
             reference = "courseId"

             console.log('reference value',reference,paymentId)
             
         }
         
        console.log("Create print invoice Logic :")
        useEffect(() => {
            
             (async()=>{
                        
              console.log('reference value -:',reference,paymentId)
              try {
                 const  {data}   =   await Axios.get(`http://localhost:9000/user/paymentinfo?${reference}=${paymentId}`,{ 
                                                    headers:{
                                                      'Content-Type':'application/json',
                                                       'token': userInfo.token
                                                    }})
                                    
                                   setLoading(false);                   
   
                     console.log('payment details' ,data)
                     setPaymentInfo(data);
              } catch (e) {
                     setError(e)                
              }

             })()     
        
          

        }, []);

  if(loading)
    return <div>
      <Typography variant='h4' align='center' sx={{mt:5}}>Loading.....generating invoice </Typography>
    </div>      


if(paymentInfo)      
    return (
     <div>
      
        
        <Typography variant="h4" sx={{textAlign:"center" ,marginTop:"30px"}} color="initial">Payment Invoice</Typography>
        <div style={{marginTop:"70px",marginBottom:"20px",display:"flex",flexDirection:'row',justifyContent:"space-between"}} >
             <div >
               <Typography variant="body1" color="initial">Payment Method: <b>Online</b></Typography>
               <Typography variant="body1" color="initial">Payment Transaction: <b>{paymentInfo.payment_id}</b> </Typography> 
             </div>
             <div>
                 
             <Typography variant="body1" color="initial">Invoice Order: <b>{paymentInfo.order_id}</b></Typography>
             <Typography variant="body1" color="initial">Order Date: <b>{paymentInfo.createdAt.split('T')[0]}</b> </Typography> 
             <Typography variant="body1" color="initial">Bill To : <b>{paymentInfo.name}<br/> {paymentInfo.mobile} <br/> {paymentInfo.number}</b></Typography>
             </div>
        </div>
        
        <div>
          <div style={{backgroundColor:"#03a9f4",padding:"15px"}} >
          <Typography variant="body2" color="initial" sx={{color:"white",fontSize:"20px",display:"flex",justifyContent:"space-between" }}><span>#Item and Description</span> <span>Amount</span>  </Typography>
          </div>
          <div style={{borderBottom:"1px solid black",padding:"15px"}} > 
          <Typography variant="body2" color="initial" sx={{fontSize:"16px",display:"flex",justifyContent:"space-between" }}><span>{paymentInfo.title}</span> <span>&#8377;{paymentInfo.price}</span>  </Typography>
          
          </div>
          <div style={{borderBottom:"1px solid black",padding:"15px"}} > 
          <Typography variant="body2" color="initial" sx={{fontSize:"16px",display:"flex",justifyContent:"space-between" }}><span>{"Total"}</span> <span> &#8377;{paymentInfo.price}</span>  </Typography>
          </div>
           <div style={{backgroundColor:"darkgrey",padding:"15px"}} >
          <Typography variant="body2" color="initial" sx={{color:"white",fontSize:"20px",display:"flex",justifyContent:"space-between" }}><span>Received Amount</span> <span>&#8377;{paymentInfo.price}</span>  </Typography>
          </div> 
          <div>
          <b> Notes:</b>  This is a computer generated pay receipt ,does not require signature
          </div>
        </div>
       
     </div>
   )
 }
 
 export default Paymentsuccess
 