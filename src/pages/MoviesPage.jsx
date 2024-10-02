// // MoviesPage.js
// import React, { useState, useEffect } from "react";
// import { Container, Row, Col } from "react-bootstrap";
// import MovieCard from "../components/MovieCard";
// import { useContext } from "react";
// import UserContext from "../context/UserContext";

// const MoviesPage = () => {
//   const { user } = useContext(UserContext);

//   const [movies, setMovies] = useState([]);

//   useEffect(() => {
//     // Fetch movies from the API
//     fetch("http://localhost:4000/movies/getMovies")
//       .then((response) => response.json())
//       .then((data) => {
//         if (data.movies) {
//           setMovies(data.movies);
//         }
//       })
//       .catch((error) => console.error("Error fetching movies:", error));
//   }, []);

//   return (
//     <Container className="mt-4">
//       <Row>
//         {movies.map((movie) => (
//           <Col key={movie._id} sm={12} md={6} lg={4} className="mb-4">
//             <MovieCard movie={movie} /> {/* Pass movie data as props */}
//           </Col>
//         ))}
//       </Row>
//     </Container>
//   );
// };

// export default MoviesPage;
// MoviesPage.js
import React, { useState, useEffect, useContext } from "react";
import { Container, Row, Col } from "react-bootstrap";
import MovieCard from "../components/MovieCard";
import UserContext from "../context/UserContext";
import UserView from "../components/UserView";
import AdminView from "../components/AdminView";

const MoviesPage = () => {
  const { user } = useContext(UserContext);

  const [movies, setMovies] = useState([]);

  // Fetch movies data from API
  const fetchData = () => {
    fetch(`${import.meta.env.VITE_API_URL}/movies/getMovies`)
      .then((response) => response.json())
      .then((data) => {
        if (data.movies) {
          setMovies(data.movies);
        }
      })
      .catch((error) => console.error("Error fetching movies:", error));
  };

  useEffect(() => {
    if (user) {
      console.log(user);
      fetchData();
    }
  }, [user]);

  return (
    <>
      {user && user.isAdmin ? (
        <AdminView fetchData={fetchData} moviesData={movies} />
      ) : (
        <UserView moviesData={movies} />
      )}
    </>
  );
};

export default MoviesPage;
