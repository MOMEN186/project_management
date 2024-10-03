import { NavLink } from "react-router-dom";
import "../App.css"
function Homepage({ user }) {
  return (
    <div>
      
      {
        user ? (
        <nav className="navbar">
          Manage Your Projects
          <div className="section">planning</div>
        </nav>
      ) : (
        
        <NavLink to="/login">
          {/* <button className="loginbtn">
            Login
          </button> */}
        </NavLink>
      )}
    </div>
  );
}

export default Homepage;
