import React from "react";

const DisplayDirections = ({ parkData }) => {
	return (
		<details>
			<summary className="hand">Directions</summary>
			<article>
				<p>{parkData.directionsInfo}</p>
				<a href={parkData.directionsUrl}>{parkData.directionsUrl}</a>
			</article>
		</details>
	);
};

export default DisplayDirections;
