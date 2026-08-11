import React, { useState } from "react";

const BookingModal = ({ selectedMovie, onClose, onBookingSuccess }) => {
  const [showtime, setShowtime] = useState("Matinee - 12:00 PM");
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
  const [submitting, setSubmitting] = useState(false);

  const BOOKINGS_URL = "https://movie-b9fa5-default-rtdb.firebaseio.com/bookings.json";

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const bookingPayload = {
      movieId: selectedMovie.id,
      movieTitle: selectedMovie.title,
      showtime: showtime,
      customerName: formData.name,
      customerEmail: formData.email,
      customerPhone: formData.phone,
      bookingDate: new Date().toLocaleDateString(),
    };

    try {
      const response = await fetch(BOOKINGS_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingPayload),
      });

      if (response.ok) {
        alert(`🎉 Booking confirmed for ${selectedMovie.title}!`);
        onBookingSuccess(); // Closes modal and resets state in parent
      } else {
        alert("Server error processing your transaction.");
      }
    } catch (error) {
      console.error("Booking error:", error);
      alert("Failed to connect to Firebase database.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div 
      className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center" 
      style={{ backgroundColor: "rgba(0,0,0,0.8)", zIndex: 1050 }}
    >
      <div className="bg-secondary text-white p-4 rounded shadow-lg m-3" style={{ maxWidth: "500px", width: "100%" }}>
        <div className="d-flex justify-content-between align-items-center border-bottom pb-2 mb-3">
          <h4 className="m-0 text-warning">Tickets: {selectedMovie.title}</h4>
          <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
        </div>

        <form onSubmit={handleFormSubmit}>
          {/* Showtime Selector Capsules */}
          <div className="mb-3">
            <label className="form-label small fw-bold">Select Showtime</label>
            <div className="d-flex gap-2">
              {["Morning - 9:00 AM", "Matinee - 12:00 PM", "Evening - 6:00 PM"].map((time) => (
                <button
                  key={time}
                  type="button"
                  className={`btn btn-sm flex-fill ${showtime === time ? "btn-danger fw-bold" : "btn-dark text-muted"}`}
                  onClick={() => setShowtime(time)}
                >
                  {time.split(" - ")[0]}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label small">Your Name</label>
            <input type="text" name="name" className="form-control form-control-sm bg-dark text-white border-0" required value={formData.name} onChange={handleInputChange} />
          </div>

          <div className="mb-3">
            <label className="form-label small">Email Address</label>
            <input type="email" name="email" className="form-control form-control-sm bg-dark text-white border-0" required value={formData.email} onChange={handleInputChange} />
          </div>

          <div className="mb-3">
            <label className="form-label small">Phone Number</label>
            <input type="tel" name="phone" className="form-control form-control-sm bg-dark text-white border-0" required value={formData.phone} onChange={handleInputChange} />
          </div>

          <div className="d-flex gap-2 mt-4">
            <button type="button" className="btn btn-sm btn-dark flex-fill" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-sm btn-success flex-fill fw-bold" disabled={submitting}>
              {submitting ? "Processing..." : "Confirm Booking"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingModal;
