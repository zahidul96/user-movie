import React, {useState, useEffect} from "react";
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
          // 1. Convert Firebase object keys into an array
          const loadedMovies = Object.keys(data).map((key) => {
            // 2. 'key' is your exact unique Firebase ID (-Ozh5Cfs8JFR...)
            // 3. Dig down into the nested 'movie' property
            const movieData = data[key].movie;

            return {
              id: key, // This saves your unique ID for navigation/booking
              title: movieData?.name, // Pulls fields from inside the inner movie node
              director: movieData?.director,
              description: movieData?.description,
              category: movieData?.category,
              image: movieData?.image,
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

  // Simple placeholder click handler for checkout actions
  const handleBookingTrigger = (movie) => {
    alert(`Opening booking wizard for: ${movie.title}`);
  };
  const handleBookingSuccess = () => {
    setSelectedMovie(null); // Close the modal window upon successful booking
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
    <div className="bg-dark min-vh-100 text-white pt-4">
      <div
        className="container"
        style={{ paddingLeft: "10%", paddingRight: "10%" }}
      >
        <Navbar />
        {/* Render Now Playing Row */}
        <NowPlayingRow movies={movies} onBookTicket={setSelectedMovie} />

        {/* Render Top Rated Row */}
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
  );
};

export default UserSection;
