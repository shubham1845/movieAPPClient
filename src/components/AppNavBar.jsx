import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../context/UserContext";

export default function AppNavBar() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  //   const token = localStorage.getItem("token");

  //   const handleLogout = () => {
  //     localStorage.removeItem("token");
  //     navigate("/login");
  //   };

  return (
    <Navbar expand="lg" className="bg-light shadow-sm">
      <Container>
        <Navbar.Brand as={NavLink} to="/" className="fw-bold fs-4">
          My Movies
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/" className="nav-link">
              Home
            </Nav.Link>
            <Nav.Link as={NavLink} to="/movies" className="nav-link">
              Movies
            </Nav.Link>

            {user?.isAdmin && (
              <Nav.Link as={NavLink} to="/addMovie" className="nav-link">
                Add Movie
              </Nav.Link>
            )}
          </Nav>

          <Nav className="ms-auto">
            {user.id != (null || undefined) ? (
              <>
                {/* <Nav.Link as={NavLink} to="/orders" className="nav-link">
                  Order
                </Nav.Link> */}

                <Nav.Link as={NavLink} to="/logout" className="nav-link">
                  Logout
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={NavLink} to="/register" className="nav-link">
                  Register
                </Nav.Link>
                <Nav.Link as={NavLink} to="/login" className="nav-link">
                  Login
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
