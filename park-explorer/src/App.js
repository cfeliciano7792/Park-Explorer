import React, { useState} from "react";

import "./App.css";

// image gallery
import "react-image-gallery/styles/css/image-gallery.css";

// imported components
import Welcome from "./components/WelcomeMessage.js";
import ParkImageGallery from "./components/ImageGallery.js";
import OperatingHours from "./components/OperatingHours.js";
import Directions from "./components/Directions.js";
import Weather from "./components/Weather.js";
import ParkAlerts from "./components/ParkAlerts.js";
import ParkStamps from "./components/ParkStamps.js";
import ParkActivities from "./components/ParkActivities.js";
import Form from "./components/Form.js";
import Button from "./components/Button.js";


function App() {
	const [parkData, setParkData] = useState(null);
	const [selectedParkCode, setSelectedParkCode] = useState("");
	const [isDisabled, setIsDisabled] = useState(true);
	const [parkAlert, setParkAlert] = useState(null);
	const [parkStamp, setParkStamp] = useState(null);
	const [parkActivities, setParkActivities] = useState(null);

	const handleParkSelection = (e) => {
		console.log(e.target.value);
		setSelectedParkCode(() => e.target.value);
		setIsDisabled(false);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(selectedParkCode);
		nationalParkServiceCall();
	};

	const nationalParkServiceCall = async (randomParkCode = null) => {
		// Use the selected park code for the API request
		if (randomParkCode || selectedParkCode) {
			try {
				const response = await fetch(
					`https://developer.nps.gov/api/v1/parks?parkCode=${
						randomParkCode || selectedParkCode
					}&api_key=u5dhPp0IQxDxb9RQu2SvUXcfN3Bd9zyioBCqCajr`
				);
				const data = await response.json();
				setParkData(data.data[0]);
				console.log(data);

				secondApiCall(randomParkCode || selectedParkCode);

				thirdApiCall(randomParkCode || selectedParkCode);

				fourthApiCall(randomParkCode || selectedParkCode);
			} catch (error) {
				console.error("Error fetching park data:", error);
			}
		}
	};

	// Microservice Function
	const getRandomParkCode = () => {
		const idCodes = [
			"acad", "npsa", "arch", "badl", "bibe", "bisc", "blca", "brca", "cany", "care",
			"cave", "chis", "cong", "crla", "cuva", "deva", "dena", "drto", "ever", "gaar",
			"jeff", "glac", "glba", "grca", "grta", "grba", "grsa", "grsm", "gumo", "hale",
			"havo", "hosp", "indu", "isro", "jotr", "katm", "kefj", "seki", "kova", "lacl",
			"lavo", "maca", "meve", "mora", "neri", "noca", "olym", "pefo", "pinn", "redw",
			"romo", "sagu", "seki", "shen", "thro", "viis", "voya", "whsa", "wica", "wrst",
			"yell", "yose", "zion"
		  ];
		  
		const randomID = Math.floor(Math.random() * idCodes.length);
		console.log(randomID)  

		nationalParkServiceCall(idCodes[randomID])
	};

	const secondApiCall = async (parkCode) => {
		// Second API Call for Alerts
		const secondResponse = await fetch(
			`https://developer.nps.gov/api/v1/alerts?parkCode=${
				parkCode
			}&api_key=u5dhPp0IQxDxb9RQu2SvUXcfN3Bd9zyioBCqCajr`
		);
		const alert = await secondResponse.json();
		setParkAlert(alert.data);
		console.log(alert);
	};

	const thirdApiCall = async (parkCode) => {
		// Third API Call for Stamp Locations
		const thirdResponse = await fetch(
			`https://developer.nps.gov/api/v1/passportstamplocations?parkCode=${
				parkCode
			}&api_key=u5dhPp0IQxDxb9RQu2SvUXcfN3Bd9zyioBCqCajr`
		);
		const stamp = await thirdResponse.json();
		setParkStamp(stamp.data);
		console.log(stamp);
	};

	const fourthApiCall = async (parkCode) => {
		// Fourth API Call for Park Activities
		const fourthResponse = await fetch(
			`https://developer.nps.gov/api/v1/thingstodo?parkCode=${
				parkCode
			}&q=hike%20water&limit=5&api_key=u5dhPp0IQxDxb9RQu2SvUXcfN3Bd9zyioBCqCajr`
		);
		const activities = await fourthResponse.json();
		setParkActivities(activities.data);
		console.log(activities);
	};
	
	return (
		<div className="App">
			<Welcome />

			<Form handleSubmit={handleSubmit} handleParkSelection={handleParkSelection} isDisabled={isDisabled}/>

			<Button getRandomParkCode={getRandomParkCode} />

			{parkData && (
				<>
					<h2>{parkData.fullName}</h2>

					<ParkImageGallery parkData={parkData} />

					<p>{parkData.description}</p>

					<h3>
						Want to keep exploring?! Check out additional park information
						below!
					</h3>

					<OperatingHours parkData={parkData} />

					<Directions parkData={parkData} />

					<Weather parkData={parkData} />

					<ParkAlerts parkAlert={parkAlert} />

					<ParkStamps parkStamp={parkStamp} />

					<ParkActivities parkActivities={parkActivities} />
				</>
			)}
		</div>
	);
}

export default App;
