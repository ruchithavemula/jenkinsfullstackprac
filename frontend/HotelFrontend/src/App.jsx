import React, { useEffect, useState } from "react";
import HotelForm from "./components/HotelForm.jsx";
import HotelList from "./components/HotelList.jsx";
import { API_URL } from "./components/config.js";
import "./style.css";

function App() {
  const [hotels, setHotels] = useState([]);
  const [editHotel, setEditHotel] = useState(null);

  const fetchHotels = async () => {
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error("Network response not ok");
      const data = await res.json();
      setHotels(data);
    } catch (err) {
      console.error("Error fetching hotels:", err);
      alert("Cannot connect to backend. Make sure Spring Boot is running!");
    }
  };

  useEffect(() => {
    fetchHotels();
  }, []);

  return (
    <div className="App">
      <h1>Hotel Management</h1>
      <HotelForm
        fetchHotels={fetchHotels}
        editHotel={editHotel}
        setEditHotel={setEditHotel}
      />
      <HotelList
        hotels={hotels}
        fetchHotels={fetchHotels}
        setEditHotel={setEditHotel}
      />
    </div>
  );
}

export default App;
