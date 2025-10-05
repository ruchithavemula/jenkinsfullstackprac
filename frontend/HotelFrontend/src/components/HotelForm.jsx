import React, { useState, useEffect } from "react";
import { API_URL } from "./config.js";


const HotelForm = ({ fetchHotels, editHotel, setEditHotel }) => {
  const [hotel, setHotel] = useState({ name: "", location: "", rooms: "", price: "" });

  useEffect(() => {
    if (editHotel) setHotel(editHotel);
  }, [editHotel]);

  const handleChange = (e) => {
    setHotel({ ...hotel, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editHotel) {
        await fetch(`${API_URL}/${editHotel.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(hotel),
        });
        setEditHotel(null);
      } else {
        await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(hotel),
        });
      }
      setHotel({ name: "", location: "", rooms: "", price: "" });
      fetchHotels();
    } catch (err) {
      console.error("Error connecting to backend:", err);
      alert("Backend connection failed. Make sure Spring Boot is running!");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="hotel-form">
      <input
        type="text"
        name="name"
        placeholder="Hotel Name"
        value={hotel.name}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="location"
        placeholder="Location"
        value={hotel.location}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="rooms"
        placeholder="Rooms"
        value={hotel.rooms}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        step="0.01"
        name="price"
        placeholder="Price"
        value={hotel.price}
        onChange={handleChange}
        required
      />
      <button type="submit">{editHotel ? "Update" : "Add"} Hotel</button>
    </form>
  );
};

export default HotelForm;
