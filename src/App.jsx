import React, { useState } from "react";
import Certificate from "./components/Certificate";
import "./App.css";
import axios from "axios";

function App() {
  const [name, setName] = useState("");
  const [course, setCourse] = useState("");
  const [date, setDate] = useState("");
  const [showCert, setShowCert] = useState(false);
  const handleGenerate = async () => {
  if (name && course && date) {
    setShowCert(true);
    await axios.post("http://localhost:5000/api/certificates/add", {
      name,
      course,
      date,
    });
  }
};


  return (
    <div className="App">
      {!showCert ? (
        <div className="form-container">
          <h2>Index info</h2>
          <input
            type="text"
            id="name-One"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            id="name-Two"
            placeholder="Enter course name"
            value={course}
            onChange={(e) => setCourse(e.target.value)}
          />
          <input
            type="date"
            id="data-One"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <button onClick={handleGenerate}>Generate Certificate</button>
        </div>
      ) : (
        <Certificate name={name} course={course} date={date} />
      )}
    </div>
  );
}

export default App;
