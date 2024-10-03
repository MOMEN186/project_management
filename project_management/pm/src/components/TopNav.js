
import React, { useState} from "react";
import "../App.css"
import { NavLink} from "react-router-dom";
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};




const commonStyles = {
  border: 1,
  width: '1rem',
  height: '1rem',
  borderColor: 'text.disabled',
  color:"white",
};

function TopNav() {


  const [value, setValue] = useState("");

  const handleChange = (e) => {
  setValue(e.target.value);
  
    
}  

  return (
    
    <Box sx={{ width: "100%" ,display:"flex",justifyContent:"center",alignContent:"center" }}> 
      
      <Box sx={{ borderBottom: 0,  marginLeft: 1,}}> 
       
        <Tabs value={value} onChange={handleChange} aria-label="top navigation tabs" sx={{ color: "white" }}>
          <NavLink to="/login">
            <Tab label="Login" {...a11yProps(0)} sx={{ ...commonStyles, borderRight: 1 }} />
          </NavLink>
       
          <NavLink to="/teams">
              <Tab label="Teams" {...a11yProps(1)} sx={{...commonStyles,borderRight:1 }} />
          </NavLink>
      
          <NavLink to="/tasks">
            <Tab label="Tasks" {...a11yProps(2)} sx={{ ...commonStyles, borderRight: 1 }} />
          </NavLink>
          <NavLink to="/projects">
             <Tab label="Projects" {...a11yProps(3)} sx={{...commonStyles,}} />
          </NavLink>
         
      </Tabs>
    </Box>
    <TabPanel value={value} index={0}>
      Login
    </TabPanel>
    <TabPanel value={value} index={1}>
      Teams
      </TabPanel>

      <NavLink to="/tasks">
        <TabPanel value={value} index={2}>
      Tasks
      </TabPanel> 
      </NavLink>

   
    
      <NavLink>
        <TabPanel value={value} >
        Projects
      </TabPanel>
</NavLink>
   
  </Box>

    


  );
}

export default TopNav;
