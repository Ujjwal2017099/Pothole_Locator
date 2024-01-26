import React ,{useState} from "react";
import "./style.css";
import previous from "../assets/previous.svg";
import { useNavigate } from "react-router-dom";
import {url} from '../Url'
import axios from 'axios'
import { ReactNotifications, Store } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import {Link} from 'react-router-dom'


const Login = () => {
    
    const buttonStyle = {
        background: 'rgba(0, 0, 0, 0)',
        border: 'none',
        display: 'block',
        outline: 'none',
        width: '300px',
        height: '30px',
        top: '250px',
        margin: "0px auto",
        color: '#fff',
        fontWeight: '500',
        fontSize: '15px',
        backgroundColor: '#007bff',
        borderRadius: '50px',
        width: '320px',
        cursor: 'pointer',
    }


    const navigate = useNavigate();
    const [email,setEmail] = useState("")
    const [pin,setPin] = useState("")
    const [password, setPassword] = useState("");
    const login = ()=>{
        const path = `${url}/login?email=${email}&password=${password}`
        const options = {
            method : 'GET',
            headears : {'content-type':'application/json'},
            url : path
        }

        axios(options)
        .then((res)=>{
            // console.log(res);
            if(res.status !== 200){
                Store.addNotification({
                    title: "Oops!",
                    message: "Enter correct credentials",
                    type: "danger",
                    insert: "top",
                    container: "top-right",
                    animationIn: ["animate__animated", "animate__fadeIn"],
                    animationOut: ["animate__animated", "animate__fadeOut"],
                    dismiss: {
                        duration: 3000,
                        onScreen: true,
                    },
                });
            }
            else{
                const id = res.data;
                localStorage.setItem('id',id);
                localStorage.setItem('pin_code',pin);
                navigate("/admin");
            }
        }).catch((err)=>{
            // console.log(err);
            Store.addNotification({
                title: "Oops",
                message: "Enter correct credentials",
                type: "danger",
                insert: "top",
                container: "top-right",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                    duration: 3000,
                    onScreen: true,
                },
            });
        })
    }
    return (
        <>
            <ReactNotifications />
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
                        cursor: "pointer",
                    }}
                    src={previous}
                    alt=""
                />
                <div className="form-login">
                    <form
                        onSubmit={(event) => {
                            event.preventDefault();
                            login();
                        }}
                    >
                        <input
                            type="email"
                            placeholder="Enter the registered Email"
                            onChange={(event) => {
                                setEmail(event.target.value);
                            }}
                            required
                        />
                        <input
                            type="text"
                            onChange={(event) => {
                                setPin(event.target.value);
                            }}
                            placeholder="Enter PIN Code"
                            required
                        />
                        <input
                            type="password"
                            onChange={(event) => {
                                setPassword(event.target.value);
                            }}
                            placeholder="Enter Password"
                            required
                        />
                        <Link to='/change-password' style={{color:'#fff' , marginLeft:"-80px",fontSize:'15px'}}>Forgot password</Link>
                        <button style={buttonStyle} type="submit">Submit</button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Login;
