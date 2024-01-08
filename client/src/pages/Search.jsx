import Map from "../components/Map";
import stats from "../assets/stats.png";
import StatsListItem from "../components/StatsListItem";
import './style.css'
import previous from '../assets/previous.svg'
import {Link} from 'react-router-dom'
import Data from "../components/Data";



const potholeData = {
    labels: [2020, 2021, 2022, 2023, 2024],
    datasets: [
        {
            data: [15, 56, 189, 560, 600],
            label: "Number of reported potholes in every year",
        },
        {
            data: [10, 40, 150, 580, 560],
            label: "Number of potholes filled in every year",
        },
    ],
};
const filledPotholeData = {
    labels: [2020, 2021, 2022, 2023, 2024],
    datasets: [
        {
            data: [15, 56, 189, 560, 600],
            label: "Number of potholes filled in every year",
        },
    ],
};


const Search = () => {
    const backStyle = {
        color: "#542c49",
        width : '45px',
        position : 'absolute',
        zIndex : '2',
        padding : '25px'
    };
    return (
        <div>
            <div>
                <div>
                    <Link to="/">
                        <img style={backStyle} src={previous} alt="" />
                    </Link>
                </div>
                <img
                    src={stats}
                    style={{ width: "100%", filter: "blur(3px)" }}
                    alt=""
                />
                <div className="stats-text" style={{ color: "#fff" }}>
                    <h2 style={{ color: "#c6bfee", marginBottom: "50px" }}>
                        Pothole Statistics
                    </h2>
                    <div style={{ display: "flex" }}>
                        <StatsListItem
                            number="1"
                            description="Explore graphical representations and statistics related to pothole reports, repairs, and maintenance efforts"
                            heading="Visualization of Data"
                        />
                        <StatsListItem
                            number="2"
                            description="Discover how the community plays a vital role in the success of our pothole management initiatives and the resulting positive impacts."
                            heading="Community Impact"
                        />
                    </div>
                </div>
            </div>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <h1 style={{ margin: "30px 0px" }}>
                    Location of reported potholes
                </h1>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        gap: "30px",
                    }}
                >
                    <div
                        style={{
                            marginBottom: "30px",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                        }}
                    >
                        <span
                            style={{
                                marginBottom: "3px",
                                width: "23px",
                                border: "2px solid #000",
                                marginTop: "5px",
                            }}
                        ></span>
                        <span
                            style={{
                                marginBottom: "3px",
                                width: "13px",
                                border: "2px solid #000",
                            }}
                        ></span>
                        <span
                            style={{ width: "5px", border: "2px solid #000" }}
                        ></span>
                    </div>
                    <div>
                        <select>
                            <option value="" disabled selected>
                                Select an year
                            </option>
                            <option value="option 1">option 1</option>
                            <option value="option 1">option 1</option>
                            <option value="option 1">option 1</option>
                        </select>
                    </div>
                    <div>
                        <select>
                            <option value="" disabled selected>
                                Select a pincode
                            </option>
                            <option value="option 1">option 1</option>
                            <option value="option 1">option 1</option>
                            <option value="option 1">option 1</option>
                        </select>
                    </div>
                </div>
                <Map />
                <div style={{ width: "70%", margin: "100px 0px" }}>
                    <Data chartData={potholeData} />
                </div>
            </div>
        </div>
    );
};

export default Search;
