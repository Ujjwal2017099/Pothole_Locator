import React from "react";
import "./style.css";
import previous from "../assets/previous.svg";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();

    return (
        <div className="login-backgroud">
            <img
                onClick={() => {
                    navigate("/");
                }}
                style={{
                    width: "40px",
                    margin: "15px",
                    position: "absolute",
                    zIndex: "2",
                    cursor : 'pointer'
                }}
                src={previous}
                alt=""
            />
            <div className="form-login">
                <form>
                    <input
                        type="email"
                        placeholder="Enter the registered Email"
                    />
                    <input type="text" placeholder="Enter PIN Code" />
                    <input type="password" placeholder="Enter Password" />
                    <input type="button" onClick={()=>{navigate('/admin')}} value="SUBMIT" />
                </form>
            </div>
        </div>
    );
};

export default Login;
