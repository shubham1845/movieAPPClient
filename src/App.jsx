import { useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { UserProvider } from "./context/UserContext";
import Container from "react-bootstrap/Container";
import AppNavBar from "./components/AppNavBar";
import MoviesPage from "./pages/MoviesPage";
import Logout from "./pages/Logout";
import AddMovie from "./pages/AddMovie";

import Home from "./pages/Home";

function App() {
  const [user, setUser] = useState({
    id: null,
    email: null,
    isAdmin: null,
  });

  // unsetUser function to clear localStorage and reset user
  function unsetUser() {
    console.log("Clearing user data and localStorage");
    localStorage.clear();
    setUser({
      id: null,
      email: null,
      isAdmin: null,
    });
  }

  // Function to retrieve user details using token
  function retrieveUserDetails(token) {
    if (!token) {
      console.log("No token found in localStorage");
      unsetUser();
      return;
    }

    console.log("Fetching user details with token:", token);

    fetch(`${import.meta.env.VITE_API_URL}/users/details`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Error fetching user details: ${res.statusText}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("User details fetched:", data);
        if (data && data._id) {
          setUser({
            id: data._id,
            email: data.email,
            isAdmin: data.isAdmin,
          });
        } else {
          console.log("Invalid user data, clearing user.");
          unsetUser();
        }
      })
      .catch((err) => {
        console.error("Error occurred while fetching user details:", err);
        unsetUser();
      });
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("Current user in state:", user);
    console.log("Token from localStorage:", token);
    retrieveUserDetails(token);
  }, []);

  return (
    <>
      <UserProvider value={{ user, setUser, unsetUser }}>
        <Router>
          <AppNavBar />
          <Container>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/movies" element={<MoviesPage />} />
              <Route path="/logout" element={<Logout />} />
              <Route path="/add-movie" element={<AddMovie />} />
            </Routes>
          </Container>
        </Router>
      </UserProvider>
    </>
  );
}

export default App;
