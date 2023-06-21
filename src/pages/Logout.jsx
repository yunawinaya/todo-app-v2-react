import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLoggedInUser } from "../features/todos/userSlice";
import { Button, Container } from "react-bootstrap";

export default function Logout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleLogout() {
    dispatch(setLoggedInUser(null));
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
