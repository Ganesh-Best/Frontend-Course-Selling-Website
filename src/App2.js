import { useEffect,useState,useCallback } from 'react'
import { RiMenuLine } from "react-icons/ri";
import { IoHomeOutline } from "react-icons/io5";
import { FiBook } from "react-icons/fi";
import { LuLogIn } from "react-icons/lu";
import { LuLogOut } from "react-icons/lu";
import { SlLogout } from "react-icons/sl";
import React from 'react'
import Signup from './Components/Signup'
import Signin from './Components/Signin'
import Navbar from './Components/Navbar'
import {BrowserRouter as Router , Route,Routes, Navigate} from 'react-router-dom'
import Addcourse from './Components/Addcourse'
import AdminCourses from './Components/AdminCourses' ;
import Course from './Components/Course';
import AdminHome from './Components/AdminHome';
import { UserContext } from './Components/Context/UserContext'
import { useContext } from 'react'
//import { useState } from 'react'
import Viewcourse from './Components/Viewcourse'
import {Link} from 'react-router-dom';
import Button from '@mui/material/Button';
import Setting from './Components/Setting';
import { SlEqualizer } from "react-icons/sl";
import { SlSettings } from "react-icons/sl";
import Home from './Components/Home'
import Courses from './Components/Courses';
import CourseDetails from './Components/CourseDetails';
import Paymentsuccess from './Components/Paymentsuccess';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import PurchasedCourses from './Components/PurchasedCourses';
import Footer from './Components/Footer';

function App2() {
    let {userInfo}   =    useContext(UserContext);
         
const [sidebarVisible, setSidebarVisible] = useState(true);

const [isMobile, setIsMobile] = useState(false);

const toggleSidebar = useCallback( () => {
  if (window.innerWidth <= 991) {
    setSidebarVisible(!sidebarVisible);
  }
},[sidebarVisible])

// Handling header and Sidebar  visibility on window resize event
useEffect(() => {

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 991);
    if (window.innerWidth > 991) {
      setSidebarVisible(true); // Show sidebar by default on larger screens
    } else {
      setSidebarVisible(false); // Hide sidebar by default on smaller screens
    }
  };
  handleResize(); // Check on initial render
  window.addEventListener('resize', handleResize);
  //return () => window.removeEventListener('resize', handleResize);

}, []);




if(userInfo)
return <>    
<header>
<div className="header-wrapper" >
  <div className="userprofile">
     <h3 style={{color:"#5f6162",fontSize:"30px"}} >Coursera</h3>
  </div>
  <div className="buttons" >
      
     
    <Button variant="outlined" color="primary"  className='btn-auth'  >{userInfo.name}</Button>
       <div onClick={toggleSidebar} className='menu-bar'><RiMenuLine /></div>
  </div>
</div>
</header>
<main className='main-content'>
  { <Menu />}
  {(sidebarVisible || !isMobile) && <Sidebar />}
</main>
   
</>


return (
  <>    
    <header>
    <div className="header-wrapper">
      <div className="userprofile" >
         <h3 style={{color:"#5f6162",fontSize:"30px"}} >Coursera</h3>
      </div>
      <div className="buttons ">
        <Link to="/signin" className='btn-auth'>Login</Link>
        <Link to="/signup" className='btn-auth'>Signup</Link>
        <div onClick={toggleSidebar} className='menu-bar'><RiMenuLine /></div>
      </div>
    </div>
  </header>
   <main className='main-content'>
      { <Menu />}
      {(sidebarVisible || !isMobile) && <Sidebar />}
    </main>
       
  </>
);
}

function Menu() {

    let userInfo  =    JSON.parse(localStorage.getItem('userInfo'));

  
      return (
    <div className='main-area'>
        {/* <div style={{"backgroundColor":"#eeeeee","width":"100%","height":"100vh"}}> */}
         
          
            <Routes>
                <Route  path="/" element={ <Home/>} />
                <Route  path="/signup" element={ <Signup/>} />
                <Route  path="/adminhome" element={ userInfo?<AdminHome/>:<Signin/>} />
                <Route  path="/signin" element={<Signin/>} /> 
                <Route  path="/addcourse" element={userInfo?<Addcourse/>:<Signin/>} />
                <Route  path="/admincourses" element={userInfo?<AdminCourses/>:<Signin/>} />
                <Route  path="/setting" element={userInfo?<Setting/>:<Signin/>} />
                <Route  path="/viewcourse/:courseId" element={userInfo?<Viewcourse/>:<Signin/>} />
                <Route  path="/Course/:courseId" element={ userInfo?<Course/>:<Signin/>} />
                <Route  path="/home" element={ <Home/>} />
                {/* <Route  path="/home" element={ userInfo?<Home/> :<Signin/>} /> */}
                <Route  path="/courses" element={ <Courses/> } />
                
                {/* Purchased course route , only visible to User not admin   */}
                <Route  path="/purchased" element={ userInfo?<PurchasedCourses/> :<Signin/>} />

                <Route  path="/coursedetails/:courseId" element={<CourseDetails/> } />  
                {/* <Route  path="/coursedetails/:courseId" element={ userInfo?<CourseDetails/> :<Signin/>} />  */}
                <Route  path="/paymentsuccess" element={ userInfo?<Paymentsuccess/> :<Signin/>} />
            </Routes>   

            <Footer/>  
     </div>
            
  
    // </div>
      );
    }
    
  
function Sidebar( { toggleSidebar }) {
     
      const  {userInfo} = useContext(UserContext)
    const signOut = useCallback(()=>{
 
        localStorage.removeItem("userInfo");
         window.location ="/home";
   
   },[])
     
   let hideButton ={
    display:(userInfo)?"block":"none"
   }
   
   if(!userInfo?.role)
    return (
      <aside className='sidebar'>
         <div>
          <ul className='sidebar-ul'>
            
            <li><Link to="/home" className='links'><IoHomeOutline style={{fontSize:"28px"}}  /> Home</Link></li>

            <li><Link to="/courses" className='links'><FiBook style={{fontSize:"28px"}} />Courses</Link></li>
            
            {/* Purchased Course user Page : */}
            {/* <li><Link to="/purchased" className='links'><FileDownloadIcon color="action" style={{fontSize:"28px"}}  /> Purchases</Link></li> */}

            {/* <li><Link to="/addcourse" className='links' style={hideButton}><SlEqualizer style={{fontSize:"28px"}}  /> Add course</Link></li> */}
            {/* <li><Link to="/setting" className='links' style={hideButton} ><SlSettings style={{fontSize:"28px"}} />Setting</Link></li> */}
            {/* <li><Link  className='links' onClick={signOut} style={hideButton} ><SlLogout style={{fontSize:"28px"}} />Sign Out</Link></li> */}
            

            {/* <li><a href="" className='links loginsignup'><LuLogIn /> Login</a></li>
            <li><a href="" className='links loginsignup'><LuLogOut />Sign Up</a></li> */}
          </ul>
        </div>
      </aside>
    );

   if(userInfo?.role == "user")
    return (
      <aside className='sidebar'>
         <div>
          <ul className='sidebar-ul'>
            
            <li><Link to="/home" className='links'><IoHomeOutline style={{fontSize:"28px"}}  /> Home</Link></li>

            <li><Link to="/courses" className='links'><FiBook style={{fontSize:"28px"}} />Courses</Link></li>
            
            {/* Purchased Course user Page : */}
            <li><Link to="/purchased" className='links'><FileDownloadIcon color="action" style={{fontSize:"28px"}}  /> Purchases</Link></li>

            {/* <li><Link to="/addcourse" className='links' style={hideButton}><SlEqualizer style={{fontSize:"28px"}}  /> Add course</Link></li> */}
            <li><Link to="/setting" className='links' style={hideButton} ><SlSettings style={{fontSize:"28px"}} />Setting</Link></li>
            <li><Link  className='links' onClick={signOut} style={hideButton} ><SlLogout style={{fontSize:"28px"}} />Sign Out</Link></li>
            

            {/* <li><a href="" className='links loginsignup'><LuLogIn /> Login</a></li>
            <li><a href="" className='links loginsignup'><LuLogOut />Sign Up</a></li> */}
          </ul>
        </div>
      </aside>
    );


    if(userInfo?.role == "admin")
      return (
        <aside className='sidebar'>
           <div>
            <ul className='sidebar-ul'>
              
              <li><Link to="/adminhome" className='links'><IoHomeOutline style={{fontSize:"28px"}}  /> Home</Link></li>

              <li><Link to="/admincourses" className='links'><FiBook style={{fontSize:"28px"}} />Courses</Link></li>
              
              {/* Purchased Course user Page : */}
              {/* <li><Link to="/purchased" className='links'><FileDownloadIcon color="action" style={{fontSize:"28px"}}  /> Purchases</Link></li> */}

              <li><Link to="/addcourse" className='links' style={hideButton}><SlEqualizer style={{fontSize:"28px"}}  /> Add course</Link></li>
              <li><Link to="/setting" className='links' style={hideButton} ><SlSettings style={{fontSize:"28px"}} />Setting</Link></li>
              <li><Link  className='links' onClick={signOut} style={hideButton} ><SlLogout style={{fontSize:"28px"}} />Sign Out</Link></li>
              
 
              {/* <li><a href="" className='links loginsignup'><LuLogIn /> Login</a></li>
              <li><a href="" className='links loginsignup'><LuLogOut />Sign Up</a></li> */}
            </ul>
          </div>
        </aside>
      );
    }

export default App2
