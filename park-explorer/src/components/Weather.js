import React from "react";

const Weather = ({ parkData }) => {
	return (
		<details>
			<summary className="hand">Weather Information</summary>
			<article>
				<p>{parkData.weatherInfo}</p>
			</article>
		</details>
	);
};

export default Weather;
