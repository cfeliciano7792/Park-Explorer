import React from "react";

const DisplayOperatingHours = ({ parkData }) => {
	return (
		<details>
			<summary className="hand">Operating Hours</summary>
			<article>
				<p>{parkData.operatingHours[0].description}</p>
			</article>
		</details>
	);
};

export default DisplayOperatingHours