import { useContext, useEffect, useState } from "react";
import UserContext from "../context/UserContext";
import { Container, Form, Button } from "react-bootstrap";

import { Notyf } from "notyf";
import "notyf/notyf.min.css";

export default function addMovie() {
  const notyf = new Notyf();

  const [title, setTitle] = useState("");
  const [director, setDirector] = useState("");
  const [year, setYear] = useState("");
  const [description, setDescription] = useState("");
  const [genre, setGenre] = useState("");
  const [isActive, setIsActive] = useState(false);

  const { user } = useContext(UserContext);
  console.log(user);

  useEffect(() => {
    if (
      title !== "" &&
      director !== "" &&
      year !== "" &&
      genre !== "" &&
      description !== ""
    ) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [title, director, year, genre]);
  // handeling form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    fetch(`${import.meta.env.VITE_API_URL}/movies/addMovie`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Ensure the token is sent for admin authentication
      },
      body: JSON.stringify({
        title, // Title from the form state
        director, // Director from the form state
        year, // Year from the form state
        description, // Description from the form state
        genre, // Genre from the form state
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        if (data.message === "Movie created successfully!") {
          notyf.success("Movie added successfully!");
        } else {
          notyf.error(data.message || "Something went wrong");
        }
      })
      .catch((error) => {
        notyf.error("Error adding movie");
        console.error("Error:", error);
      });

    // Reset form fields after submission
    setTitle("");
    setDirector("");
    setYear("");
    setDescription("");
    setGenre("");
  };

  return (
    <Container>
      <h2>Add New Movie</h2>
      <Form onSubmit={(e) => handleSubmit(e)}>
        <Form.Group>
          <Form.Label>Title:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Movie Name"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Director:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Director Name"
            required
            value={director}
            onChange={(e) => setDirector(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Year:</Form.Label>
          <Form.Control
            type="number"
            placeholder="Release Year"
            required
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Description:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Description"
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Genre:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Genre"
            required
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
          />
        </Form.Group>

        {isActive ? (
          <Button variant="primary" type="submit">
            Submit
          </Button>
        ) : (
          <Button variant="danger" type="submit" disabled>
            Submit
          </Button>
        )}
      </Form>
    </Container>
  );
}
