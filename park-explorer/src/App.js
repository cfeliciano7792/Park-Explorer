import React, { useState, useEffect } from "react";

import parks from "./data/parks.json";
import "./App.css";

function App() {
	const [parkData, setParkData] = useState(null);
	const [selectedParkCode, setSelectedParkCode] = useState("");
	const [isDisabled, setIsDisabled] = useState(true);

	const titlecase = (name) => {
		let splitName = name.split(" ");
		let result = [];
		for (let i = 0; i < splitName.length; i++) {
			let res = splitName[i][0].toUpperCase();
			res += splitName[i].slice(1).toLowerCase();
			result.push(res);
		}
		return result.join(" ");
	};
	const handleParkSelection = (e) => {
		console.log(e.target.value);
		setSelectedParkCode(() => e.target.value);
		setIsDisabled(false)
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		// Use the selected park code for the API request
		try {
			const response = await fetch(
				`https://developer.nps.gov/api/v1/parks?parkCode=${selectedParkCode}&api_key=u5dhPp0IQxDxb9RQu2SvUXcfN3Bd9zyioBCqCajr`
			);
			const data = await response.json();
			setParkData(data);
			console.log(data);
		} catch (error) {
			console.error("Error fetching park data:", error);
		}
	};

	return (
		<div className="App">
			<h1>Welcome to National Park Explorer!!</h1>
			<h4>
				National Park Explorer unlocks the secrets of all 63 U.S. parks! Find
				trails, campsites, activities, hidden gems and more!
			</h4>
			<p>
				Select a park from the menu below and then press submit to start
				exploring!
			</p>
			<form onSubmit={(e) => handleSubmit(e)}>
				<select
					name="parkNames"
					id="parkInfo"
					onChange={(e) => handleParkSelection(e)}
				>
					<option>Please Select A Park</option>
					{parks.map((park) => (
						<option key={park.code} value={park.code}>
							{titlecase(park.name)}
						</option>
					))}
				</select>
				{console.log(isDisabled)}
				<button type="submit" disabled={isDisabled}>
					Submit
				</button>
			</form>
			{parkData && (
				<div>
					<h2>{parkData.data[0].fullName}</h2>
				</div>
			)}
		</div>
	);
}

export default App;
