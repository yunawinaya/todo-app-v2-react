import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
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

  const [title, setTitle] = useState(todo?.title || "");
  const [description, setDescription] = useState(todo?.description || "");
  const [completed, setCompleted] = useState(todo?.completed || false);

  useEffect(() => {
    setTitle(todo?.title || "");
    setDescription(todo?.description || "");
    setCompleted(todo?.completed || false);
  }, [todo]);

  const handleUpdateTodo = (event) => {
    event.preventDefault();

    const updatedTodo = {
      id: todo.id,
      userId: todo.userId,
      title,
      description,
      completed,
    };

    dispatch(updateTodo(updatedTodo));
    navigate("/");
  };

  return (
    <Container>
      <h1 className="my-3">Edit Todo</h1>
      <Form onSubmit={handleUpdateTodo}>
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
