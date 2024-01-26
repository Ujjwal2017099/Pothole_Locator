import React from "react";
import "./style.css";

const StatsListItem = ({ number, description, heading }) => {
    return (
        <div className="d-flex">
            <div
                style={{
                    backgroundColor: "#542c49",
                    padding: "10px 15px 15px 15px",
                    height: "25px",
                    borderRadius : '5px',
                    marginRight : '20px'
                }}
            >
                {number}
            </div>
            <div>
                <h3 style={{marginBottom : '20px'}}>{heading}</h3>
                <p>{description}</p>
            </div>
        </div>
    );
};

export default StatsListItem;
