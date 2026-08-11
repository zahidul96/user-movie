import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import NowPlayingRow from "./components/NowPlaying";
import TopRated from "./components/TopRated";
import BookingModal from "./components/BookingModal"; // Import here
const UserSection = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    fetch("https://movie-b9fa5-default-rtdb.firebaseio.com/movies.json")
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          const loadedMovies = Object.keys(data).map((key) => {
          

            return {
              id: key,
              title: data[key].title,
              director: data[key].director,
              description: data[key].description,
              category: data[key].category,
              image: data[key].posterUrl,
            };
          });

          setMovies(loadedMovies);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Firebase fetch error:", err);
        setLoading(false);
      });
  }, []);

  
 
  const handleBookingSuccess = () => {
    setSelectedMovie(null); 
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100 bg-dark text-white">
        <div className="spinner-border text-danger" role="status">
          <span className="visually-hidden">Loading Movies...</span>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="bg-dark min-vh-100 text-white pt-4">
        <div
          className="container"
          style={{ paddingLeft: "10%", paddingRight: "10%" }}
        >
      
          <NowPlayingRow movies={movies} onBookTicket={setSelectedMovie} />

      
          <TopRated movies={movies} onBookTicket={setSelectedMovie} />
          {selectedMovie && (
            <BookingModal
              selectedMovie={selectedMovie}
              onClose={() => setSelectedMovie(null)}
              onBookingSuccess={handleBookingSuccess}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default UserSection;
