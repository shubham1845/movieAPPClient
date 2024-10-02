// // MovieCard.js
// import React from "react";
// import { Card, Button } from "react-bootstrap";

// const MovieCard = ({ movie }) => {
//   return (
//     <Card className="cardHighlight">
//       <Card.Body>
//         <Card.Title>{movie.title}</Card.Title>
//         <Card.Subtitle className="mb-2 text-muted">
//           Directed by {movie.director} - {movie.year}
//         </Card.Subtitle>
//         <Card.Text>{movie.description}</Card.Text>
//         <Card.Text>Genre: {movie.genre}</Card.Text>

//         {movie.comments.length > 0 && (
//           <>
//             <h6>Comments:</h6>
//             {movie.comments.map((comment) => (
//               <Card.Text key={comment._id}>
//                 <strong>{comment.user}:</strong> {comment.commentText}
//               </Card.Text>
//             ))}
//           </>
//         )}
//         <Button variant="primary">More Details</Button>
//       </Card.Body>
//     </Card>
//   );
// };

// export default MovieCard;

import React from "react";
import { Card, Button } from "react-bootstrap";
import PropTypes from "prop-types";

const MovieCard = ({ movieProp }) => {
  return (
    <Card>
      <Card.Body>
        <Card.Title>{movieProp.title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          Directed by {movieProp.director} - {movieProp.year}
        </Card.Subtitle>
        <Card.Text>{movieProp.description}</Card.Text>
        <Card.Text>Genre: {movieProp.genre}</Card.Text>

        {movieProp.comments.length > 0 && (
          <>
            <h6>Comments:</h6>
            {movieProp.comments.map((comment) => (
              <Card.Text key={comment._id}>
                <strong>{comment.user}:</strong> {comment.commentText}
              </Card.Text>
            ))}
          </>
        )}
        <Button variant="primary">More Details</Button>
      </Card.Body>
    </Card>
  );
};

// PropTypes validation for MovieCard
MovieCard.propTypes = {
  movieProp: PropTypes.shape({
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
  }).isRequired,
};

export default MovieCard;
