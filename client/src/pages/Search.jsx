import Map  from "../components/Map";
import stats from "../assets/stats.png";
import StatsListItem from "../components/StatsListItem";
import './style.css'
import previous from '../assets/previous.svg'
import {Link} from 'react-router-dom'
import Data from "../components/Data";
import { url } from "../Url";
import axios from "axios";
import { useState,useEffect } from "react";
import {pinCodes} from '../pin_codes'




const AutocompleteSearch = ({ options, inputValuePin, setInputValue }) => {
    const [filteredOptions, setFilteredOptions] = useState([]);

    const handleInputChange = (e) => {
        const value = e.target.value;
        setInputValue(value);

        if (value.length === 0) {
            setFilteredOptions([]);
            return;
        }

        // Filter options based on user input
        const filtered = options.filter((option) => option.includes(value));

        setFilteredOptions(filtered);
    };

    const handleSelectOption = (event) => {
        setInputValue(event.target.value);
        setFilteredOptions([event.target.value]);
    };

    return (
        <div style={{ display: "flex", gap: "20px", height: "35px" }}>
            <input
                type="text"
                value={inputValuePin}
                onChange={handleInputChange}
                placeholder="Enter PIN code"
                style={{
                    color: "#000",
                    width: "200px",
                    borderBottom: "1px solid #ccc",
                    borderRadius: "5px",
                }}
            />
            <select onChange={handleSelectOption}>
                <option value="" disabled selected>
                    Enter pin code to select
                </option>

                {filteredOptions.map((option) => (
                    <option>{option}</option>
                ))}
            </select>
        </div>
    );
};




const Search = () => {
    const [inputValuePin, setInputValue] = useState("");
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 10 }, (_, index) => currentYear - index);

    const [selectedYear, setSelectedYear] = useState("");
    


    const handleYearChange = (event) => {
        const year = parseInt(event.target.value);
        setSelectedYear(year);
    };

    const [potholeData,setPotholeData] = useState({
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
    });
    const [count,setCount] = useState(1)
    
    const [locations,setAllLocations] = useState([
        { id: 1, name: "Location 1", lat: 37.7749, lng: -122.4194 },
        { id: 2, name: "Location 2", lat: 34.0522, lng: -118.2437 },
        { id: 3, name: "Location 3", lat: 40.7128, lng: -74.006 },
    ])
    
    useEffect(() => {
        console.log(selectedYear);
        const api = `${url}/unfilled-potholes?year=${selectedYear}&pin_code=${inputValuePin}`;
        const options = {
            method: "GET",
            headers: { "content-type": "application/json" },
            url: api,
        };

        axios(options)
            .then((res) => {
                // console.log(res.data);
                const x = res.data;
                const loc = [];
                x.map((e) => {
                    loc.push({
                        id: count,
                        name: `Location ${count}`,
                        lat: e.Loc.coordinates[1],
                        lng: e.Loc.coordinates[0],
                    });
                    setCount(count + 1);
                });
                setAllLocations(loc);
            })
            .catch((err) => {
                console.log(err.message);
            });

        const graphApi = `${url}/year-wise-data`;
        const options2 = {
            method: "GET",
            headers: { "content-type": "application/json" },
            url: graphApi,
        };
        axios(options2)
            .then((res) => {
                // console.log(res.data);
                const data = res.data;
                const labels = [];
                const filled = [];
                const unFilled = [];
                const reported = [];
                data.map((e) => {
                    labels.push(e.year);
                    if (e.status === true) {
                        filled.push(e.count);
                        unFilled.push(0);
                    } else {
                        unFilled.push(e.count);
                        filled.push(0);
                    }

                    reported.push(
                        filled[filled.length - 1] +
                            unFilled[unFilled.length - 1]
                    );
                });

                setPotholeData({
                    labels,
                    datasets: [
                        {
                            label: "Number of reported potholes in every year",
                            data: reported,
                        },
                        {
                            label: "Number of potholes filled in every year",
                            data: filled,
                        },
                        {
                            label: "Number of potholes remained unfilled in every year",
                            data: unFilled,
                        },
                    ],
                });
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, [selectedYear, inputValuePin]);
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
                        <select
                            id="year"
                            onChange={handleYearChange}
                            value={selectedYear}
                        >
                            <option value="" disabled selected>
                                Select an year
                            </option>
                            {years.map((year) => (
                                <option key={year} value={year}>
                                    {year}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        {/* <select
                            id="pincode"
                            onChange={handlePinChange}
                            value={selectedPin}
                        >
                            <option value="" disabled selected>
                                Select a pincode
                            </option>
                            {/* <option value="option 1">option 1</option>
                            <option value="option 1">option 1</option>
                            <option value="option 1">option 1</option> */}
                            {/* {
                                pinCodes.map((pin) => {
                                    return <option key={pin.Pincode} value={pin.Pincode}>
                                        {pin.Pincode}
                                    </option>
                                })
                            } 
                        </select> */}
                            <AutocompleteSearch inputValuePin={inputValuePin} setInputValue={setInputValue} options={pinCodes} />

                    </div>
                </div>
                <Map
                    height="400px"
                    width="70%"
                    zoom={4}
                    locations={locations}
                />
                <div style={{ width: "70%", margin: "100px 0px" }}>
                    <Data chartData={potholeData} />
                </div>
            </div>
        </div>
    );
};

export default Search;
