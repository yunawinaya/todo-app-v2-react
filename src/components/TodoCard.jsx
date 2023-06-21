import { useState, useEffect } from "react";
import { Button, Card, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { deleteTodo } from "../features/todos/todoSlice";
import { increment, reset } from "../features/todos/counterSlice";

export default function TodoCard({ todo }) {
  const completed = todo.completed;
  const border = completed ? "success" : "danger";
  const [timer, setTimer] = useState(0);
  const [timerInterval, setTimeInterval] = useState(null);
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const startTimer = () => {
    if (timerInterval === null) {
      const intervalID = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
      }, 1000);
      setTimeInterval(intervalID);
    }
  };

  const pauseTimer = () => {
    clearInterval(timerInterval);
    setTimeInterval(null);
  };

  const resetTimer = () => {
    clearInterval(timerInterval);
    setTimeInterval(null);
    setTimer(0);
  };

  const handleDeleteTodo = () => {
    dispatch(deleteTodo(todo.id));
  };

  useEffect(() => {
    return () => {
      clearInterval(timerInterval);
    };
  }, [timerInterval]);

  const cardId = todo.id;

  const count = useSelector((state) => state.counter[cardId] || 0);

  const handleIncrement = () => {
    if (count < todo.sets) {
      dispatch(increment({ cardId }));
    }
  };

  return (
    <>
      <Card border={border} className="my-3">
        <Card.Header>{!completed && "Not"} Completed</Card.Header>
        <Card.Body>
          <Card.Title>{todo.title}</Card.Title>
          <Card.Text>{todo.description}</Card.Text>
          <Card.Text>
            {count}/{todo.sets} Sets
            <Button
              variant="outline-secondary"
              onClick={handleIncrement}
              size="sm"
              className="ms-1"
            >
              <i className="bi bi-plus"></i>
            </Button>
            <Button
              variant="outline-secondary"
              onClick={() => dispatch(reset({ cardId }))}
              size="sm"
              className="ms-1"
            >
              reset
            </Button>
          </Card.Text>
          <p>Rest Timer: {timer} seconds</p>
          <Button onClick={startTimer}>
            <i className="bi bi-play"></i>
          </Button>
          <Button onClick={pauseTimer} className="ms-2">
            <i className="bi bi-pause-fill"></i>
          </Button>
          <Button onClick={resetTimer} className="ms-2">
            <i className="bi bi-arrow-clockwise"></i>
          </Button>
          <Button
            variant="secondary"
            href={`/todo/${todo.id}`}
            className="ms-2"
          >
            <i className="bi bi-pencil"></i>
          </Button>
          <Button variant="danger" onClick={handleShow} className="ms-2">
            <i className="bi bi-trash3"></i>
          </Button>

          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Confirm Delete</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to delete this todo?</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Cancel
              </Button>
              <Button variant="danger" onClick={handleDeleteTodo}>
                Delete
              </Button>
            </Modal.Footer>
          </Modal>
        </Card.Body>
      </Card>
    </>
  );
}
