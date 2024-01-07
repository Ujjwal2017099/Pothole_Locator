import Map from "../components/Map";
import stats from "../assets/stats.png";
import StatsListItem from "../components/StatsListItem";
import './style.css'

const Search = () => {
    return (
        <div>
            <div>
                <img
                    src={stats}
                    style={{ width: "100%", filter: "blur(3px)" }}
                    alt=""
                />
                <div className="stats-text" style={{ color: "#fff" }}>
                    <h2 style={{ color: "#c6bfee" ,marginBottom : '50px'}}>Pothole Statistics</h2>
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
            <Map />
        </div>
    );
};

export default Search;
