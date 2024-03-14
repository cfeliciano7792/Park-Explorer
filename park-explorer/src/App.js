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

				secondCall(randomParkCode || selectedParkCode);

				thirdCall(randomParkCode || selectedParkCode);

				fourthCall(randomParkCode || selectedParkCode);
			} catch (error) {
				console.error("Error fetching park data:", error);
			}
		}
	};

	const getRandomParkCode = () => {
		fetch("http://localhost:4000/")
			.then((response) => response.json())
			.then((data) => nationalParkServiceCall(data))
			.catch((error) => console.error("Error fetching random park:", error));
	};

	const secondCall = async (parkCode) => {
		// Second API Call
		const secondResponse = await fetch(
			`https://developer.nps.gov/api/v1/alerts?parkCode=${
				parkCode
			}&api_key=u5dhPp0IQxDxb9RQu2SvUXcfN3Bd9zyioBCqCajr`
		);
		const alert = await secondResponse.json();
		setParkAlert(alert.data);
		console.log(alert);
	};

	const thirdCall = async (parkCode) => {
		// Third API Call
		const thirdResponse = await fetch(
			`https://developer.nps.gov/api/v1/passportstamplocations?parkCode=${
				parkCode
			}&api_key=u5dhPp0IQxDxb9RQu2SvUXcfN3Bd9zyioBCqCajr`
		);
		const stamp = await thirdResponse.json();
		setParkStamp(stamp.data);
		console.log(stamp);
	};

	const fourthCall = async (parkCode) => {
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

			<button onClick={getRandomParkCode}>Surprise Me</button>

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
