import React from "react";


const ParkActivities = ({ parkActivities }) => {
    
	const mapActivities = () => {
		return (
			<ul className="extra-info-bullets activities">
				{parkActivities.map((activity, index) => (
					<li className="activity" key={`${activity.title}-${index}`}>
						<h3>{activity.title}</h3>
						<p>{activity.shortDescription}</p>
					</li>
				))}
			</ul>
		);
	};
    return(
	<>{parkActivities && (
        <details>
            <summary>Popular Park Activities</summary>
            <article className="extraInfo">{mapActivities()}</article>
        </details>
    )}</>)
};

export default ParkActivities;