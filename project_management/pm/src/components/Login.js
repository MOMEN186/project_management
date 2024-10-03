import React,{useState} from "react";
import "../App.css"
function Login() {
    
    
    const [email, setEmail] = useState("email");
    const [password, setPassword] = useState("password");

    const onSubmit = (e) => {
        e.preventDefault();

        console.log({email, password});
       
    }
    return (
        <div className="Login">

            <form className="login_items">
            <h1>Login</h1>
                <input type="email" placeholder={email} onChange={(e)=>{setEmail(e.target.value)}} /> 
                <input type="password" placeholder={password} onChange={(e)=>{setPassword(e.target.value)}} />
               <button onClick={onSubmit}>Submit</button>
            </form>
        </div>
    );
}

export default Login;
