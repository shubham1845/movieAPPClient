import { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";

export default function EditMovie({ movie, fetchData }) {
  const notyf = new Notyf();

  // States for input boxes and modal visibility
  const [title, setTitle] = useState(movie.title);
  const [director, setDirector] = useState(movie.director);
  const [year, setYear] = useState(movie.year);
  const [description, setDescription] = useState(movie.description);
  const [genre, setGenre] = useState(movie.genre);
  //   const [isActive, setIsActive] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  // Edit movie handler
  const editmovie = (e) => {
    e.preventDefault();
    fetch(`${import.meta.env.VITE_API_URL}/movies/update/${movie._id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        title: title,
        director: director,
        year: year,
        description: description,
        genre: genre,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "Movie updated successfully!") {
          notyf.success("Successfully Updated");
          fetchData(); // Refresh the movie list
        } else {
          notyf.error("Something went wrong");
        }
        closeEdit(); // Close the modal
      })
      .catch(() => {
        notyf.error("An error occurred while updating the movie.");
        closeEdit(); // Close the modal in case of error
      });
  };

  // Function to show the modal
  const openEdit = () => {
    setShowEdit(true);
  };

  // Function to hide the modal and reset fields to the original movie values
  const closeEdit = () => {
    setShowEdit(false);
    setTitle(movie.title); // Reset fields to the original movie values
    setDirector(movie.director);
    setYear(movie.year);
  };

  return (
    <>
      <Button variant="primary" size="sm" onClick={openEdit}>
        Update
      </Button>
      <Modal show={showEdit} onHide={closeEdit}>
        <Form onSubmit={editmovie}>
          <Modal.Header closeButton>
            <Modal.Title>Edit movie</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group controlId="movieTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="movieDirector">
              <Form.Label>Director</Form.Label>
              <Form.Control
                type="text"
                value={director}
                onChange={(e) => setDirector(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="movieYear">
              <Form.Label>Year</Form.Label>
              <Form.Control
                type="number"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                required
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
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeEdit}>
              Close
            </Button>
            <Button variant="success" type="submit">
              Submit
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}
