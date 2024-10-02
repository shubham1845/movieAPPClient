import PropTypes from "prop-types";
import MovieCard from "./MovieCard";
import { useEffect } from "react";

export default function UserView({ moviesData }) {
  useEffect(() => {
    console.log(moviesData); // Check the structure of the moviesData
  }, [moviesData]);

  return (
    <div>
      <h2 className="text-center">Our Movies</h2>
      {Array.isArray(moviesData) && moviesData.length > 0 ? (
        moviesData.map((movie) => (
          <MovieCard key={movie._id} movieProp={movie} />
        ))
      ) : (
        <p>No movies available</p>
      )}
    </div>
  );
}

// PropTypes validation
UserView.propTypes = {
  moviesData: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      director: PropTypes.string.isRequired,
      year: PropTypes.number.isRequired,
      description: PropTypes.string.isRequired,
      genre: PropTypes.string.isRequired,
      comments: PropTypes.arrayOf(
        PropTypes.shape({
          _id: PropTypes.string.isRequired,
          user: PropTypes.string.isRequired,
          commentText: PropTypes.string.isRequired,
          createdAt: PropTypes.string.isRequired,
        })
      ).isRequired,
    })
  ).isRequired,
};
