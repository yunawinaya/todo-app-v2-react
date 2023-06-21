import { useState, useEffect } from "react";
import { Button, InputGroup } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import { updateTodo } from "../features/todos/todoSlice";
import { useParams, useNavigate } from "react-router-dom";

export default function EditTodo() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const todo = useSelector((state) =>
    state.todos.find((todo) => todo.id === parseInt(id))
  );

  const [date, setDate] = useState(todo?.date || "");
  const [title, setTitle] = useState(todo?.title || "");
  const [description, setDescription] = useState(todo?.description || "");
  const [sets, setSets] = useState(todo?.sets || "");
  const [completed, setCompleted] = useState(todo?.completed || false);

  useEffect(() => {
    setDate(todo?.date || "");
    setTitle(todo?.title || "");
    setDescription(todo?.description || "");
    setSets(todo?.sets || "");
    setCompleted(todo?.completed || false);
  }, [todo]);

  const handleUpdateTodo = (event) => {
    event.preventDefault();

    const updatedTodo = {
      id: todo.id,
      userId: todo.userId,
      date,
      title,
      description,
      sets,
      completed,
    };

    dispatch(updateTodo(updatedTodo));
    navigate("/");
  };

  return (
    <Container>
      <h1 className="my-3">🏋🏼 Edit Your Routine</h1>
      <Form onSubmit={handleUpdateTodo}>
        <Form.Group className="mb-3" controlId="date">
          <Form.Label>Date</Form.Label>
          <Form.Control
            value={date}
            onChange={(event) => setDate(event.target.value)}
            type="date"
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder="Get software developer job"
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            as="textarea"
            rows={3}
            placeholder="1. Create amazing project\n2. Apply to Google & Netflix\n3. Crush interview"
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
        <Form.Check
          type="checkbox"
          id="completed"
          label="Mark as completed"
          checked={completed}
          onChange={(e) => setCompleted(e.target.checked)}
          className="mb-3"
        />
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
}
