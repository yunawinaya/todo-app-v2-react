import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import useLocalStorage from "use-local-storage";
import { setLoggedInUser } from "../features/todos/userSlice";
import { Button, Container, Form } from "react-bootstrap";

const users = [
  { id: 1, user: "admin1", password: "admin" },
  { id: 2, user: "admin2", password: "admin" },
];

export default function Login() {
  const [username, setUsername] = useLocalStorage("username", "");
  const [password, setPassword] = useLocalStorage("password", "");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleLogin(event) {
    event.preventDefault();
    const loggedInUser = users.find(
      (user) => user.user === username && user.password === password
    );
    if (loggedInUser) {
      dispatch(setLoggedInUser(loggedInUser));
      navigate("/");
    } else {
      setError("Invalid username or password");
    }
  }

  return (
    <Container>
      <h1 className="my-3">Login</h1>
      <Form onSubmit={handleLogin}>
        <Form.Group className="mb-3" controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            placeholder="Enter your username"
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Enter your password"
            required
          />
        </Form.Group>
        <p>{error}</p>
        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
    </Container>
  );
}
