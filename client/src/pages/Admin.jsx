import React from "react";
import Map from "../components/Map";
import pothole from "../assets/image (10).png";
import "./style.css";
import prev from "../assets/previous.svg";
import { useNavigate } from "react-router-dom";

const Admin = () => {
    const navigate = useNavigate();
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}
        >
            <div style={{ width: "100%" }}>
                <img
                    onClick={() => {
                        navigate("/");
                    }}
                    src={prev}
                    style={{
                        width: "45px",
                        height: "45px",
                        position: "absolute",
                        zIndex: "2",
                        padding: "20px",
                        cursor: "pointer",
                    }}
                    alt=""
                />
            </div>
            <div
                className="pothole-background"
                style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "30px",
                    padding: "50px 0px",
                }}
            >
                <h2>
                    All Pothole's in Your Jurisdiction.
                </h2>
                <Map height="400px" width="70%" />
            </div>
            <div
                style={{ width: "100%", borderBottom: "1px solid #000" }}
            ></div>
            <div>
                <table
                    style={{
                        border: "1px solid #000",
                        borderRadius: "10px",
                        margin: "50px 0px",
                    }}
                >
                    <thead style={{ fontWeight: "700", fontSize: "18px" }}>
                        <td>S.No.</td>
                        <td>Pothole Location</td>
                        <td>Pothole Image reported</td>
                        <td>Change Status</td>
                    </thead>
                    <tbody>
                        <tr style={{ borderTop: "1px solid #000" }}>
                            <td>1</td>
                            <td>
                                <Map height="200px" width="400px" />
                            </td>
                            <td>
                                <img
                                    style={{ height: "200px", width: "280px" }}
                                    src={pothole}
                                    alt=""
                                />
                            </td>
                            <td>
                                <button class="cta">
                                    <span>Pending</span>
                                    <svg
                                        width="15px"
                                        height="10px"
                                        viewBox="0 0 13 10"
                                    >
                                        <path d="M1,5 L11,5"></path>
                                        <polyline points="8 1 12 5 8 9"></polyline>
                                    </svg>
                                </button>
                            </td>
                        </tr>
                        <tr style={{ borderTop: "1px solid #000" }}>
                            <td>2</td>
                            <td>
                                <Map height="200px" width="400px" />
                            </td>
                            <td>
                                <img
                                    style={{ height: "200px", width: "280px" }}
                                    src={pothole}
                                    alt=""
                                />
                            </td>
                            <td>
                                <button class="cta">
                                    <span>Pending</span>
                                    <svg
                                        width="15px"
                                        height="10px"
                                        viewBox="0 0 13 10"
                                    >
                                        <path d="M1,5 L11,5"></path>
                                        <polyline points="8 1 12 5 8 9"></polyline>
                                    </svg>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Admin;
