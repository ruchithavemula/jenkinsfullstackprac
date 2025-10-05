import React from "react";
import { API_URL } from "./config.js";


const HotelList = ({ hotels, fetchHotels, setEditHotel }) => {
  const handleDelete = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      fetchHotels();
    } catch (err) {
      console.error("Error deleting hotel:", err);
      alert("Backend connection failed.");
    }
  };

  return (
    <div className="hotel-list">
      {hotels.map((hotel) => (
        <div key={hotel.id} className="hotel-item">
          <h3>{hotel.name}</h3>
          <p>Location: {hotel.location}</p>
          <p>Rooms: {hotel.rooms}</p>
          <p>Price: ₹{hotel.price}</p>
          <button onClick={() => setEditHotel(hotel)}>Edit</button>
          <button onClick={() => handleDelete(hotel.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default HotelList;
