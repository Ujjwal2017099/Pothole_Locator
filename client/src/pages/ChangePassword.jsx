import React, { useState } from "react";
import "./style.css";
import previous from "../assets/previous.svg";
import { url } from "../Url";
import axios from "axios";
import { ReactNotifications, Store } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";


const ChangePassword = () => {
    const buttonStyle = {
        background: "rgba(0, 0, 0, 0)",
        border: "none",
        display: "block",
        outline: "none",
        height: "30px",
        top: "250px",
        margin: "0px ",
        color: "#fff",
        fontWeight: "500",
        fontSize: "15px",
        backgroundColor: "#007bff",
        borderRadius: "50px",
        width: "320px",
        cursor: "pointer",
        marginLeft : "-70px"
    };
    const buttonStyle2 = {
        background: "rgba(0, 0, 0, 0)",
        border: "none",
        display: "block",
        outline: "none",
        height: "30px",
        top: "250px",
        margin: "0px ",
        color: "#fff",
        fontWeight: "500",
        fontSize: "15px",
        backgroundColor: "#007bff",
        borderRadius: "50px",
        width: "320px",
        cursor: "pointer",
        marginLeft : "10px"
    };
    const targetTime = new Date().getTime() + 5 * 60 * 1000;

    // Update the countdown every second

    const [verified, setVerified] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [otp, setOtp] = useState("");

    const sendOtp = () => {
        const options = {
            url: `${url}/send-otp?adminEmail=${email}`,
            method: "POST",
            headers: { "content-type": "application/json" },
        };

        axios(options)
            .then((res) => {
                setVerified(true);
                Store.addNotification({
                    title: "Sent",
                    message: `Otp has been sent to your registered EmailID`,
                    type: "success",
                    insert: "top",
                    container: "top-right",
                    animationIn: ["animate__animated", "animate__fadeIn"],
                    animationOut: ["animate__animated", "animate__fadeOut"],
                    dismiss: {
                        duration: 3000,
                        onScreen: true,
                    },
                });
                alert('Do not refresh the page')
                const timerInterval = setInterval(updateCountdown, 1000);
                function updateCountdown() {
                    if (document.getElementById("timer") === null) return;
                    const currentTime = new Date().getTime();
                    const timeDifference = targetTime - currentTime;

                    // Calculate minutes and seconds
                    const minutes = Math.floor(
                        (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
                    );
                    const seconds = Math.floor(
                        (timeDifference % (1000 * 60)) / 1000
                    );

                    // Display the countdown
                    document.getElementById(
                        "timer"
                    ).innerHTML = `Valid for ${minutes}m ${seconds}s`;

                    // Check if the countdown has reached zero
                    if (timeDifference <= 0) {
                        clearInterval(timerInterval);
                        document.getElementById("timer").innerHTML =
                            "OTP expired!";
                    }
                }
                
            })
            .catch((err) => {
                Store.addNotification({
                    title: "OOPS",
                    message: `Entered Email is not registered`,
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
            });
    };
    const updatePassword = ()=>{
        if(password !== confirmPassword){
            Store.addNotification({
                title: "Error",
                message: `Entered Password didn't match`,
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
            return;
        }

        axios
            .post(`${url}/update-password`, {
                otp,
                adminEmail: email,
                newPassword: password,
            })
            .then((res) => {
                Store.addNotification({
                    title: "Great",
                    message: `Password updated successfully`,
                    type: "success",
                    insert: "top",
                    container: "top-right",
                    animationIn: ["animate__animated", "animate__fadeIn"],
                    animationOut: ["animate__animated", "animate__fadeOut"],
                    dismiss: {
                        duration: 3000,
                        onScreen: true,
                    },
                });
                function goback(){
                    window.location.href = '/login'
                }
                setTimeout(goback, 3000);
            })
            .catch((err) => {
                Store.addNotification({
                    title: "OOPS",
                    message: `Something went wrong`,
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
            });
    };
    return (
        <>
            <ReactNotifications />
            <div className="login-backgroud">
                <img
                    onClick={() => {
                        window.location.href = '/login'
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
                {!verified && (
                    <div className="form-login">
                        <form
                            onSubmit={(event) => {
                                event.preventDefault();
                                sendOtp();
                            }}
                        >
                            <input
                                type="email"
                                placeholder="Enter the registered Email"
                                onChange={(event) => {
                                    setEmail(event.target.value);
                                }}
                                required
                                style={{ marginLeft: "-50px" }}
                            />

                            <button style={buttonStyle} type="submit">
                                verify and send otp
                            </button>
                        </form>
                    </div>
                )}

                {verified && (
                    <div className="form-login">
                        <form
                            className="form-card"
                            onSubmit={(event) => {
                                event.preventDefault();
                                updatePassword();
                            }}
                        >
                            <div className="form-card-input-wrapper">
                                <h4 className="form-card-input-password">
                                    Enter OTP
                                </h4>
                                <p
                                    className="form-card-input-password"
                                    style={{
                                        fontSize: "15px",
                                        display: "flex",
                                        gap: "5px",
                                    }}
                                >
                                    <div id="timer"></div>
                                </p>
                                <input
                                    type="tel"
                                    maxlength="4"
                                    placeholder="____"
                                    className="form-card-input"
                                    onChange={(event) => {
                                        setOtp(event.target.value);
                                    }}
                                    required
                                />
                                <input
                                    className="form-card-input-password"
                                    type="password"
                                    placeholder="Enter New Password"
                                    onChange={(event) => {
                                        setPassword(event.target.value);
                                    }}
                                    required
                                />
                                <input
                                    className="form-card-input-password"
                                    type="password"
                                    placeholder="Confirm New Password"
                                    onChange={(event) => {
                                        setConfirmPassword(event.target.value);
                                    }}
                                    required
                                />
                                <button style={buttonStyle2} type="submit">
                                    Verify and update
                                </button>
                            </div>
                        </form>
                    </div>
                )}
            </div>
        </>
    );
};

export default ChangePassword;
