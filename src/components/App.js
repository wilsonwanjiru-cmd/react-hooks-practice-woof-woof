import React, { useState, useEffect } from "react";

function App() {
  const [dogs, setDogs] = useState([]);
  const [selectedDog, setSelectedDog] = useState(null);
  const [showOnlyGoodDogs, setShowOnlyGoodDogs] = useState(false);

  useEffect(() => {
    // Step 3: Fetch Data and Display Dogs
    fetch("http://localhost:3001/pups")
      .then((response) => response.json())
      .then((data) => setDogs(data));
  }, []);

  // Step 4: Display Dog Info
  const handleDogClick = (dog) => {
    setSelectedDog(dog);
  };

  // Step 5: Toggle Good Dog
  const toggleGoodness = () => {
    if (selectedDog) {
      const updatedDog = { ...selectedDog, isGoodDog: !selectedDog.isGoodDog };
      fetch(`http://localhost:3001/pups/${selectedDog.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedDog),
      })
        .then((response) => response.json())
        .then((data) => setSelectedDog(data));
    }
  };

  // Step 6: Implement Filter
  const filteredDogs = showOnlyGoodDogs ? dogs.filter((dog) => dog.isGoodDog) : dogs;

  return (
    <div className="App">
      <div id="filter-div">
        <button id="good-dog-filter" onClick={() => setShowOnlyGoodDogs(!showOnlyGoodDogs)}>
          {showOnlyGoodDogs ? "Filter good dogs: ON" : "Filter good dogs: OFF"}
        </button>
      </div>
      <div id="dog-bar">
        {/* Step 1: Show Pups in Dog Bar */}
        {filteredDogs.map((dog) => (
          <span key={dog.id} onClick={() => handleDogClick(dog)}>
            {dog.name}
          </span>
        ))}
      </div>
      <div id="dog-summary-container">
        <h1>DOGGO:</h1>
        <div id="dog-info">
          {/* Step 2: Show More Info About Each Pup */}
          {selectedDog && (
            <>
              <img src={selectedDog.image} alt={selectedDog.name} />
              <h2>{selectedDog.name}</h2>
              <button onClick={toggleGoodness}>
                {selectedDog.isGoodDog ? "Good Dog!" : "Bad Dog!"}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;

