import React from 'react'
import Signup from './Components/Signup'
import Signin from './Components/Signin'
import Navbar from './Components/Navbar'
import {BrowserRouter as Router , Route,Routes} from 'react-router-dom'
import Addcourse from './Components/Addcourse'
import Courses from './Components/Courses' ;
import Course from './Components/Course';
import { UserContext } from './Components/Context/UserContext'
import { useContext } from 'react'
import { useState } from 'react'
import Viewcourse from './Components/Viewcourse'
import HeadSide from './Components/HeadSide'
function App() {

        let {userInfo}   =    useContext(UserContext)
       
        
  return (
    <div style={{"backgroundColor":"#eeeeee","width":"100%","height":"100vh",}}>
       
        {/* {JSON.stringify(userInfo)} */}
        <Navbar/> 
           <Routes>
               <Route  path="/" element={ <Signin  />} />
               <Route  path="/signup" element={ <Signup/>} />
               <Route  path="/signin" element={<Signin/>} /> 
               <Route  path="/addcourse" element={userInfo?( userInfo.role==="admin"?<Addcourse/>:<Signin/>):<Signin/>} />
               <Route  path="/Courses" element={userInfo?( userInfo.role==="admin"?<Courses/>:<Signin/>):<Signin/>} />
               <Route  path="/viewcourse/:courseId" element={userInfo?( userInfo.role==="admin"?<Viewcourse/>:<Signin/>):<Signin/>} />
               <Route  path="/Course/:courseId" element={ userInfo?( userInfo.role==="admin"?<Course/>:<Signin/>):<Signin/>} />
               <Route  path="/user" element={userInfo?( userInfo.role==="user"?<HeadSide/>:<Courses/>):<Signin/>}  />
           </Routes>     
    // </div>
  )
}

export default App
