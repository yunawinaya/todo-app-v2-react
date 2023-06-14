import { useNavigate } from "react-router-dom";
import { Container, Nav, Navbar } from "react-bootstrap";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import useLocalStorage from "use-local-storage";
import { TodoContext, UserContext } from "./contexts/TodoContext";
import { useContext } from "react";
import AddTodo from "./pages/AddTodo";
import ErrorPage from "./pages/ErrorPage";
import Home from "./pages/Home";
import EditTodo from "./pages/EditTodo";
import { Form, Button } from "react-bootstrap";

const users = [
  { id: 1, user: "admin1", password: "admin" },
  { id: 2, user: "admin2", password: "admin" },
];

function Layout() {
  const { loggedInUser } = useContext(UserContext);

  return (
    <>
      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand href="/">Todos</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/add">Add Todo</Nav.Link>
          </Nav>
          <Nav>
            {loggedInUser ? (
              <Nav.Link href="/logout">Logout</Nav.Link>
            ) : (
              <Nav.Link href="/login">Login</Nav.Link>
            )}
          </Nav>
        </Container>
      </Navbar>
      <Outlet />
    </>
  );
}

function Login() {
  const [username, setUsername] = useLocalStorage("username", "");
  const [password, setPassword] = useLocalStorage("password", "");
  const { setLoggedInUser } = useContext(UserContext);
  const navigate = useNavigate();

  function handleLogin(event) {
    event.preventDefault();
    // Find the user based on the entered username
    const loggedInUser = users.find(
      (user) => user.user === username && user.password === password
    );
    if (loggedInUser) {
      setLoggedInUser(loggedInUser);
      navigate("/");
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
        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
    </Container>
  );
}

function Logout() {
  const { setLoggedInUser } = useContext(UserContext);
  const navigate = useNavigate();

  function handleLogout() {
    setLoggedInUser(null);
    navigate("/");
  }

  return (
    <Container>
      <h1 className="my-3">Logout</h1>
      <p>Are you sure you want to log out?</p>
      <Button variant="danger" onClick={handleLogout}>
        Logout
      </Button>
    </Container>
  );
}

export default function App() {
  const [todos, setTodos] = useLocalStorage("todos", []);
  const [loggedInUser, setLoggedInUser] = useLocalStorage("loggedInUser", null);

  return (
    <TodoContext.Provider value={{ todos, setTodos }}>
      <UserContext.Provider value={{ loggedInUser, setLoggedInUser }}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="add" element={<AddTodo />} />
              <Route path="login" element={<Login />} />
              <Route path="logout" element={<Logout />} />
              <Route path="*" element={<ErrorPage />} />
              <Route path="todo/:id" element={<EditTodo />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    </TodoContext.Provider>
  );
}
