import { useState } from "react";
import { Button, InputGroup } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import { addTodo } from "../features/todos/todoSlice";
import { useNavigate } from "react-router-dom";

export default function AddTodo() {
  const [date, setDate] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [sets, setSets] = useState("");
  const loggedInUser = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleAddTodo(event) {
    event.preventDefault();
    const newTodo = {
      id: Date.now(),
      userId: loggedInUser?.id,
      date,
      title,
      description,
      sets,
    };
    dispatch(addTodo(newTodo));
    navigate("/");
  }

  return (
    <Container>
      <h1 className="my-3">🏋🏼 Add Your Routine</h1>
      <Form onSubmit={handleAddTodo}>
        <Form.Group className="mb-3" controlId="date">
          <Form.Label>Date</Form.Label>
          <Form.Control
            value={date}
            onChange={(event) => setDate(event.target.value)}
            type="date"
            placeholder="MM/DD/YYYY"
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="title">
          <Form.Label>Exercise</Form.Label>
          <Form.Control
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            type="text"
            placeholder="Bench Press"
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            as="textarea"
            rows={3}
            placeholder={`Working Muscles: Chest, Triceps, Deltoids\nThe bar should not travel straight up and down,\nFocus on moving the weight by squeezing your chest together`}
            required
          />
        </Form.Group>
        <Form.Label>Sets Goal</Form.Label>
        <InputGroup className="mb-3" controlId="sets">
          <Form.Control
            value={sets}
            onChange={(event) => setSets(event.target.value)}
            type="number"
            placeholder="8"
            required
          />
          <InputGroup.Text id="basic-addon2">Sets</InputGroup.Text>
        </InputGroup>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
}
