import React, { useState } from 'react';
import './App.css';

function App() {
  const [randomID, setRandomID] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchRandomID = async () => {  //Christian I changed this name
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:4000');
      if (!response.ok) {
        throw new Error('Failed to fetch ID code');
      }
      const data = await response.text();  //Change to .text insted of json as it returns one id code
      setRandomID(data); //Setter w/ new data 
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="App">
      <header className="App-header">
        <h1>Microservice Demo</h1>
        {isLoading && <p>Loading ID code...</p>}
        {error && <p>Error: {error}</p>}
        {!isLoading && !error && (
          <>
            <p>Random ID: {randomID}</p>
            <button onClick={fetchRandomID}>Get Random ID</button>
          </>
        )}
      </header>
    </div>
  );
}

export default App;
