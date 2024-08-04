import React from 'react'
import CircularProgress from '@mui/material/CircularProgress';
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';


function Loader() {
  return (
    
    <Box sx={{fontSize:"45px"}} >
    <CircularProgress  />
   </Box>
   
  )
}


export default Loader
