import { Container, Nav, Navbar } from "react-bootstrap";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import AddTodo from "./pages/AddTodo";
import ErrorPage from "./pages/ErrorPage";
import Home from "./pages/Home";
import EditTodo from "./pages/EditTodo";
import { useDispatch, useSelector } from "react-redux";
import { setLoggedInUser } from "./features/todos/userSlice";
import Login from "./pages/Login";
import Logout from "./pages/Logout";

function Layout() {
  const loggedInUser = useSelector((state) => state.user);

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">💪🏻 Workout Assistant</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/add">Add Your Routine</Nav.Link>
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

export default function App() {
  const loggedInUser = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (loggedInUser) {
      dispatch(setLoggedInUser(loggedInUser));
    }
  }, [loggedInUser, dispatch]);

  return (
    <>
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
    </>
  );
}
