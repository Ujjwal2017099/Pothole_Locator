import React , {useState,useEffect } from "react";
import Map from "../components/Map";
import "./style.css";
import prev from "../assets/previous.svg";
import { useNavigate } from "react-router-dom";
import {url} from '../Url'
import axios from 'axios'
import { ReactNotifications, Store } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
var Buffer = require("buffer/").Buffer;

const Admin = () => {
    const [allLocations,setAllLocations] = useState([]);
    const [remainingLocations , setRemainingLocations] = useState([]);
    const [count,setCount] = useState(1);

    const navigate = useNavigate();

    const changeStatus = (e)=>{
        // console.log(e);
        const id = e.id;
        const api = `${url}/pothole-filled?pothole_id=${id}`;
        const options = {
            method : 'GET',
            headers : {'content-type' : 'application/json'},
            url : api
        }

        axios(options)
        .then((res)=>{

            Store.addNotification({
                title: "Congratulations",
                message: "Pothole Filled",
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

        }).catch((err)=>{
            Store.addNotification({
                title: "Oops",
                message: "Something went wrong",
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

    useEffect(()=>{
        const token = localStorage.getItem('id');
        const pin = localStorage.getItem("pin_code");
        const path = `${url}/admin-pothole-data?id=${token}&pin_code=${pin}`;

        const options = {
            method : 'GET',
            headers : {'content-type':'application/json'},
            url : path
        }

        axios(options)
        .then(async (res)=>{
            const mapData=[]
            const tableData=[]
            const data = res.data;
            
            for(let i=0;i<data.length;i++){
                let temp = data[i];
                const imgUrl = `${url}/get-image?img_id=${temp.Image}`;
                const img = await axios.get(imgUrl, {
                    responseType: "arraybuffer",
                });
                console.log(img);
                const base64Image =  Buffer.from(
                    img.data,
                    "binary"
                ).toString("base64");
                const imageUrl = `data:${img.headers["content-Type"]};base64,${base64Image}`;


                mapData.push({
                    id: count,
                    name: `Location ${count}`,
                    lat: temp.Loc.coordinates[1],
                    lng: temp.Loc.coordinates[0],
                });

                tableData.push({
                    sno: count,
                    map: [{
                        id: count,
                        name: `Location ${count}`,
                        lat: temp.Loc.coordinates[1],
                        lng: temp.Loc.coordinates[0],
                    }],
                    frequency: temp.Frequency,
                    img : imageUrl,
                    id : temp._id
                });

                setCount(count+1);
            }
            setAllLocations(mapData)
            setRemainingLocations(tableData)
        })
        .catch((err)=>{
            console.log(err.message);
        })


    },[])

    return (
        <>
            <ReactNotifications />
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
                    <h2>All Pothole's in Your Jurisdiction.</h2>
                    <Map
                        locations={allLocations}
                        height="400px"
                        width="70%"
                        zoom={4}
                    />
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
                            <td>Number of reports</td>
                            <td>Change Status</td>
                        </thead>
                        <tbody>
                            {remainingLocations.map((e) => {
                                return (
                                    <tr style={{ borderTop: "1px solid #000" }}>
                                        <td>{e.sno}</td>
                                        <td>
                                            <Map
                                                zoom={15}
                                                center={[
                                                    e.map[0].lat,
                                                    e.map[0].lng,
                                                ]}
                                                locations={e.map}
                                                height="200px"
                                                width="400px"
                                            />
                                        </td>
                                        <td>
                                            <img
                                                style={{
                                                    height: "200px",
                                                    width: "280px",
                                                }}
                                                src={e.img}
                                                alt=""
                                            />
                                        </td>
                                        <td>{e.frequency}</td>
                                        <td>
                                            <form onSubmit={(event)=>{
                                                event.preventDefault();
                                                changeStatus(e)
                                            }}>

                                            <button type="submit" className="cta">
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
                                            </form>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default Admin;
