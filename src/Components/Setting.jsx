import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

export default function Setting() {
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const  data ={name:"Ganesh",email:"hackgan2@gmail.com",mobile:8368788356}
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
            <General props = {data} />
        </TabPanel>
        
        <TabPanel value="2">
            <Security/>
        </TabPanel>
        
      </TabContext>
    </Box>
  );
}

const General = ({mobile,name,email})=>{
 
    return <div style={{width:"50%",display:"flex",flexDirection:"column",justifyContent:"center",gap:'25px'}}>
   
   <TextField
     id="Name"
     value={"Ganesh Singh Bisht"}
     disabled
     style={{borderRadius:"50%"}}
   />
   <TextField
     id="mobile"
     value={"hackgan2@gmail.com"}
     disabled
   />
   <TextField
     id="mobile"
     value={8368788356}
     disabled
   />
   <Button disabled variant="outlined" color="primary" sx={{borderRadius:"40px",width:"160px",alignSelf:"center",padding:"20px"}}>
     Save Profile
   </Button>

    </div>
}

const Security = ()=>{

    return <>
       <div>

       </div>
    </>

}