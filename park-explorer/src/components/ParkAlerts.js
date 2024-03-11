import React from "react";


const ParkAlerts = ({ parkAlert }) => {
    
	const mapAlerts = () => {
		return (
			<ul className="extra-info-bullets">
				{parkAlert.map((alert, index) => (
					<><li key={`${alert.title}-${index}`}>{alert.description}</li><br></br></>
				))}
			</ul>
		);
	};
    return(
	<>{parkAlert && (
        <details>
            <summary className="hand">Park Alerts</summary>
            <article className="extraInfo">{mapAlerts()}</article>
        </details>
    )}</>)
};

export default ParkAlerts;
