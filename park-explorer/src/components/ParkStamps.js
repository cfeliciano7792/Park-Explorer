import React from "react";


const ParkStamps = ({ parkStamp }) => {
    
	const mapStamps = () => {
		return (
			<ul className="extra-info-bullets">
				{parkStamp.map((stamp, index) => (
					<li key={`${stamp.label}-${index}`}>{stamp.label}</li>
				))}
			</ul>
		);
	};
    return(
	<>{parkStamp && (
        <details>
            <summary>Passport Stamp Locations</summary>
            <article className="extraInfo">{mapStamps()}</article>
        </details>
    )}</>)
};

export default ParkStamps;