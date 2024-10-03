import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { useState, useEffect } from "react";
import EditMovie from "./EditMovie";

export default function AdminView({ fetchData, moviesData }) {
  const [movies, setMovies] = useState([]);
  console.log(movies);

  useEffect(() => {
    // Set the products state with the imported moviesData
    setMovies(moviesData);
  }, [moviesData]);

  return (
    <div className="container my-4">
      <h1 className="text-center mb-4">Admin Dashboard</h1>
      <Table striped bordered hover responsive>
        <thead className="text-center">
          <tr>
            <th>ID</th>
            <th>Movie</th>
            <th>Director</th>
            <th>Description</th>

            <th>Release Year</th>
            <th>Genre</th>
            <th colSpan="2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {movies.map((movie) => (
            <tr key={movie._id}>
              <td>{movie._id}</td>
              <td>{movie.title}</td>
              <td>{movie.director}</td>
              <td>{movie.description}</td>
              <td>{movie.year}</td>
              <td>{movie.genre}</td>
              <td className="text-center">
                <EditMovie movie={movie} fetchData={fetchData} />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
