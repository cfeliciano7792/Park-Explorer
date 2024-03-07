import React, { useState, useEffect } from "react";

import parks from "./data/parks.json";
// import categories from "./data/info.json"
import "./App.css";

// image gallery
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

function App() {
	const [parkData, setParkData] = useState(null);
	const [selectedParkCode, setSelectedParkCode] = useState("");
	const [isDisabled, setIsDisabled] = useState(true);
	const [parkAlert, setParkAlert] = useState(null);
	const [parkStamp, setParkStamp] = useState(null);

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
		setIsDisabled(false);
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(selectedParkCode);
		nationalParkServiceCall();
	};

	const nationalParkServiceCall = async (randomParkCode = null) => {
		// Use the selected park code for the API request
		if (selectedParkCode || randomParkCode) {
			try {
				const response = await fetch(
					`https://developer.nps.gov/api/v1/parks?parkCode=${
						selectedParkCode || randomParkCode
					}&api_key=u5dhPp0IQxDxb9RQu2SvUXcfN3Bd9zyioBCqCajr`
				);
				const data = await response.json();
				setParkData(data.data[0]);
				console.log(data);

				// Second API Call
				const secondResponse = await fetch(
					`https://developer.nps.gov/api/v1/alerts?parkCode=${
						selectedParkCode || randomParkCode
					}&api_key=u5dhPp0IQxDxb9RQu2SvUXcfN3Bd9zyioBCqCajr`
				);
				const alert = await secondResponse.json();
				setParkAlert(alert.data);
				// Process second API response data
				console.log(alert);

				// Third API Call
				const thirdResponse = await fetch(
					`https://developer.nps.gov/api/v1/passportstamplocations?parkCode=${
						selectedParkCode || randomParkCode
					}&api_key=u5dhPp0IQxDxb9RQu2SvUXcfN3Bd9zyioBCqCajr`
				);
				const stamp = await thirdResponse.json();
				setParkStamp(stamp.data);
				console.log(stamp);


			} catch (error) {
				console.error("Error fetching park data:", error);
			}
		}
	};

	const getRandomParkCode = () => {
		fetch("http://localhost:4000/") //address will change
			.then((response) => response.json())
			.then((data) => nationalParkServiceCall(data))
			.catch((error) => console.error("Error fetching random park:", error));
	};

	const mapImages = () => {
		return parkData.images.map((image) => ({
			original: image.url,
			originalAlt: image.altTex,
			originalHeight: 500,
			originalWeight: 700,
			//description: image.caption,
		}));
	};

	const galleryOptions = {
		showBullets: false,
		showFullscreenButton: false,
		showPlayButton: false,
	};

	const mapAlerts = () => {
		return (
			<ul className="extra-info-bullets">
				{parkAlert.map((alert, index) => (
					<li key={index}>{alert.description}</li>
				))}
			</ul>
		);
	};

	const mapStamps = () => {
		return (
			<ul className="extra-info-bullets">
				{parkStamp.map((stamp, index) => (
					<li key={index}>{stamp.label}</li>
				))}
			</ul>
		);
	};

	return (
		<div className="App">
			<h1>Welcome to National Park Explorer!!</h1>
			<h4>
				National Park Explorer unlocks the secrets of all 63 U.S. parks! Find
				trails, campsites, activities, hidden gems and more!
			</h4>
			<p>
				Exploring a park is as easy as selecting a park from the drop-down menu
				below and hitting submit!
			</p>
			<form onSubmit={(e) => handleSubmit(e)}>
				<select
					name="parkNames"
					id="parkInfo"
					onChange={(e) => handleParkSelection(e)}
				>
					<option value="">Please Select A Park</option>
					{parks.map((park) => (
						<option key={`${park.name}-${park.code}`} value={park.code}>
							{titlecase(park.name)}
						</option>
					))}
				</select>
				<button type="submit" disabled={isDisabled}>
					Submit
				</button>
			</form>

			<button onClick={getRandomParkCode}>Surprise Me</button>

			{parkData && (
				<>
					<h2>{parkData.fullName}</h2>

					<article>
						<ImageGallery items={mapImages()} {...galleryOptions} />
					</article>

					<p>{parkData.description}</p>

					<h3>
						Want to keep exploring?! Check out additional park information
						below!
					</h3>

					<details>
						<summary className ='hand'>Operating Hours</summary>
						<article>
						<p>{parkData.operatingHours[0].description}</p>
						</article>	
					</details>

					<details>
						<summary className="hand">Directions</summary>
						<article>
						<p>{parkData.directionsInfo}</p>
						<a href ={parkData.directionsUrl}>{parkData.directionsUrl}</a>
						</article>
					</details>

					<details>
						<summary className="hand">Weather Information</summary>
						<article>
						<p>{parkData.weatherInfo}</p>
						</article>
					</details>

					{parkAlert && (
						<details>
							<summary className="hand">Park Alerts</summary>
							<article className="extraInfo">
							{mapAlerts()}
							</article>
						</details>
					)}
					
					{parkStamp && (
						<details>
							<summary>Passport Stamp Locations</summary>
							<article  className="extraInfo">
							{mapStamps()}
							</article>
						</details>
					)}
				</>
			)}
		</div>
	);
}

export default App;
