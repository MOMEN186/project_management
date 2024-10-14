import React, { useState, useContext, useEffect,useCallback } from "react";
import "../App.css";
import { NavLink, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { cookiesContext } from "../App";
import { Button } from "@mui/material";
import { Logout } from "../controllers/authController";
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
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
  width: "1rem",
  height: "1rem",
  borderColor: "text.disabled",
  color: "white",
};

function TopNav() {
  const [value, setValue] = useState("");
  const cookies = useContext(cookiesContext);

  const [user, setUser] = useState(cookies.get("user"));
  const [token, setToken] = useState(user?.token || "");
  const navigate = useNavigate();


  const handleChange = (e) => setValue(e.target.value);

  const handleLogout = async (e) => {
    await Logout(user.id, token);
    cookies.remove("user");
    setToken(null);
    console.log("logged out", cookies)
    navigate("/");
  };

  useEffect(() => {
    setUser(cookies.get("user"));
    setToken(user?.token || null);
    if (!token) {
      navigate("/login");
    }
    
  }, [cookies,token]);

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
      }}
    >
      <Box sx={{ borderBottom: 0, marginLeft: 1 }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="top navigation tabs"
          sx={{ color: "white" }}
        >
          <NavLink to="/">
            <Tab
              label="Home"
              {...a11yProps(0)}
              sx={{ ...commonStyles, borderRight: 1 }}
            />
          </NavLink>
        

          <NavLink to="/teams">
            <Tab
              label="Teams"
              {...a11yProps(2)}
              sx={{ ...commonStyles, borderRight: 1 }}
            />
          </NavLink>

          <NavLink to="/tasks">
            <Tab
              label="Tasks"
              {...a11yProps(3)}
              sx={{ ...commonStyles, borderRight: 1 }}
            />
          </NavLink>
          <NavLink to="/projects">
            <Tab label="Projects" {...a11yProps(4)} sx={{ ...commonStyles }} />
          </NavLink>

          {token && (
            <Button onClick={handleLogout}>
              <Tab
                label="Logout"
                {...a11yProps(1)}
                sx={{ ...commonStyles, borderRight: 1 }}
              />
            </Button>
          )}
        </Tabs>
      </Box>

      <TabPanel value={value} index={0}>
        Home
      </TabPanel>
      <TabPanel value={value} index={1}>
        Login
      </TabPanel>
      <TabPanel value={value} index={2}>
        Teams
      </TabPanel>

      <TabPanel value={value} index={3}>
        Tasks
      </TabPanel>

      <TabPanel value={value} index={4}>
        Projects
      </TabPanel>

      <TabPanel value={value} index={5}>
        Logout
      </TabPanel>
    </Box>
  );
}

export default TopNav;
