import React from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography'
import { useState } from 'react';
import Axios from 'axios' ;
import { useContext } from 'react';
import { UserContext } from './Context/UserContext';
import RichTextEditor from './Comp/RichTextEditor';
function Addcourse() {
          
     const {userInfo }  =   useContext(UserContext);
     const [title,setTitle] = useState("") ;
     const [description,setDescription] = useState("");
     const [syallabus,setSyallabus] = useState("")
     const [image,setImage] = useState("");
     const [price,setPrice] = useState("");
     const [introVideo ,setIntroVideo ]  = useState("");
     const [file,setFile] = useState("");
     const [file2,setFile2] = useState(""); 
     const [published,setPublished] = useState(false);
    const myStyle ={
        "width":"600px",
        "padding":"15px"       
      }

      const addCourse = async (e)=>{ 

                const formData =        new FormData()

                formData.append('title', title);
                formData.append('description',description);
                formData.append('image',image)
                formData.append('price',price)
                formData.append('file1',file)
                formData.append('file2',file2)
                formData.append('introVideo',introVideo)
                formData.append('syallabus',syallabus);
                formData.append('published',published);

           console.log("Add course butting clicked :")
           console.log(formData)

         const  url = "http://localhost:9000/admin/course"
            
         console.log('published status',published);
          
             const response = await   Axios.post(url,formData,{
                headers:{
                    'Content-Type':'multipart/form-data',
                    'token':userInfo.token
                }
                
               })       

               console.log(response)
                alert("Course has been Created Successfully :") 
         
        // formData.append('image', image)
        // formData.append('price', price)
        // formData.append('files', file)
        //formData.append('files', file)
        
            // fetch(url,{
            //     method:"POST",
            //     headers:{
            //         "Content-Type":"application/json",
            //         "token":localStorage.getItem("token")
            //     },
            //     body:JSON.stringify({
            //         "title":title,
            //         "description":description,
            //         "image":image,
            //         "price":price,
            //         "published":published,
            //     })
            // }).then(response=>response.json()).then(data=>{
            //     console.log(data)
            //    alert(`Course has been published Id: ${data.id}`,)
            // //    setTitle("")
            // //    setDescription("")
            // //    setImage("")

            // }).catch(error=>console.log(error))

      }
  return (
      <div style={{paddingTop:"40px",display:"flex","flexDirection":"row","justifyContent":"center"}}>
    <Card variant="outlined" style={myStyle}>    
    <TextField  fullWidth={true} value={title} onChange={event=>setTitle(event.target.value)} id="title" label="title" variant="outlined" />  <br/><br/>  
    <TextField  fullWidth={true} value={description} onChange={event=>setDescription(event.target.value)} id="description" label="Description" variant="outlined" type={"text"} /> <br/> <br/>   
    <TextField  fullWidth={true} value={image} onChange={event=>setImage(event.target.value)} id="image" label="image" variant="outlined" /> <br/><br/>
    <TextField  fullWidth={true} value={price} onChange={event=>setPrice(event.target.value)} id="price" label="price" variant="outlined" /> <br/><br/>
    <div style={{display:'flex',flexDirection:"column",height:'auto'}}>
    <label>Syallabus</label>
    <RichTextEditor setSyallabus={setSyallabus} />
    </div>
    <br/>
    <div style={{display:'flex',flexDirection:"column",height:'auto'}}>
    <label>Intro Video</label>
    <TextField  type='file' name="introVideo" onChange={(e)=>{setIntroVideo(e.target.files[0])  }}  />  <br/><br/>
    </div>
    <div style={{display:'flex',flexDirection:"column",height:'auto'}}>
    <label>Video 1</label>
    <TextField  type='file' name="file" onChange={(e)=>{setFile(e.target.files[0])  }}  />  <br/><br/>
    </div>
    <div style={{display:'flex',flexDirection:"column",height:'auto'}}>
    <label>Video 2</label>
    <TextField  type='file' name="file2" onChange={(e)=>{setFile2(e.target.files[0]) }}  /> <br/><br/>
    </div>
    <Button  size="large" variant="contained" onClick={addCourse}  >Add Course</Button> 
    <Button  size="small" variant="outlined" sx={{marginLeft:"20px"}} onClick = {(e)=>setPublished(!published) }  > {(published)?"Published":"Not Published"}</Button>
    
    </Card>
    
    </div>
  )
}

export default Addcourse
