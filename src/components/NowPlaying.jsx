import React from "react";

const NowPlayingRow = ({ movies, onBookTicket }) => {
  const nowPlayingMovies = movies.filter(
    (m) => m.category?.toLowerCase() === "now playing"
  );

  return (
    <div className="mb-5">
      <h2 className="text-warning border-bottom pb-2 mb-4 fw-bold">🍿 Now Playing</h2>
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
        {nowPlayingMovies.length > 0 ? (
          nowPlayingMovies.map((movie) => (
            <div key={movie.id} className="col">
              <div className="card h-100 bg-secondary text-white border-0 shadow">
                <img
                  src={movie.image || "https://unsplash.com"}
                  className="card-img-top"
                  alt={movie.title}
                  style={{ height: "320px", objectFit: "cover" }}
                />
                <div className="card-body d-flex flex-column justify-content-between">
                  <div>
                    <h5 className="card-title fw-bold text-truncate">{movie.title || "Untitled Movie"}</h5>
                    <p className="card-text text-light small text-truncate mb-1">Dir: {movie.director || "Unknown"}</p>
                    <p className="card-text text-warning small text-truncate">{movie.description || "No description available."}</p>
                  </div>
                  <button 
                    onClick={() => onBookTicket(movie)} 
                    className="btn btn-primary w-100 mt-3 fw-bold"
                  >
                    Book Tickets
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-muted ps-2">No active movies in theater.</p>
        )}
      </div>
    </div>
  );
};

export default NowPlayingRow;
