import React, { useState, useContext, useEffect } from "react";
import "../App.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";

import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { cookiesContext } from "../../../src/App";
import { Avatar } from "@mui/material";
import { Logout } from "../controllers/authController";
// import PersonPinIcon from "@mui/icons-material/PersonPin";

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
  width: "1rem",
  height: "1rem",
  color: "white",
};

function TopNav() {
  const [value, setValue] = useState("");
  const cookies = useContext(cookiesContext);

  const [user, setUser] = useState(cookies.get("user"));
  const [token, setToken] = useState(user?.token || "");
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleChange = (e) => setValue(e.target.value);

  const handleLogout = async (e) => {
    await Logout(user.id, token);
    cookies.remove("user");
    setToken(null);
    console.log("logged out", cookies);
    navigate("/");
  };

  useEffect(() => {
    setUser(cookies.get("user"));
    setToken(user?.token || null);
    if (!token) {
      navigate("/login");
    }
  }, [cookies, token]);

  return (
    <Box
      
      sx={{
        width: "200vh",
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
      }}
    >
      <Box sx={{ borderBottom: 0, marginLeft: 1 }}>
        <Tabs
          onChange={handleChange}
          aria-label="top navigation tabs"
          sx={{ color: "white" }}
          value={pathname}
        
      
        >
          <Tab
            label="Home"
            {...a11yProps(0)}
            sx={{ ...commonStyles }}
            component={Link}
            to="/"
            value="/"
          />

          <Tab
            label="Teams"
            {...a11yProps(1)}
            sx={{ ...commonStyles }}
            component={Link}
            to="/teams"
            value="/teams"
          />

          <Tab
            label="Tasks"
            {...a11yProps(2)}
            sx={{ ...commonStyles }}
            component={Link}
            to="/tasks"
            value="/tasks"
          />

          <Tab
            label="Projects"
            {...a11yProps(3)}
            sx={{ ...commonStyles }}
            component={Link}
            to="/projects"
            value="/projects"
          />

          {token && (
            <Tab
              label="Logout"
              {...a11yProps(4)}
              sx={{ ...commonStyles }}
              onClick={handleLogout}
            />
          )}

          <Tab
            sx={{ color: "white" }}
            {...a11yProps(5)}
            aria-label="person"
            to="/profile"
            value="/profile"
            component={Link}
            state={user}
            icon={<Avatar sx={{width:"24px",height:"24px",fontSize:10}}>ME</Avatar>}
          />
        </Tabs>
      </Box>

      
    </Box>
  );
}

export default TopNav;
