import { useState, useEffect } from "react";
import { Button, Card, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { deleteTodo } from "../features/todos/todoSlice";
import { increment, reset } from "../features/todos/counterSlice";

export default function TodoCard({ todo }) {
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

  const formatDate = (date) => {
    const options = { day: "2-digit", month: "short", year: "numeric" };
    const formattedDate = new Date(date).toLocaleDateString("en-US", options);
    const [month, day, year] = formattedDate.split(" ");
    const capitalizedMonth = month.charAt(0).toUpperCase() + month.slice(1);
    return `${capitalizedMonth} ${day} ${year}`;
  };

  const cardId = todo.id;
  const [completed, setCompleted] = useState(false);

  const count = useSelector((state) => state.counter[cardId] || 0);

  const handleIncrement = () => {
    if (count < todo.sets) {
      dispatch(increment({ cardId }));
    } else if (count >= todo.sets) {
      setCompleted(true);
    }
  };

  return (
    <>
      <Card border={completed ? "success" : "danger"} className="my-3">
        <Card.Header>{formatDate(todo.date)}</Card.Header>
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
            {completed && (
              <span className="ms-1 text-success">You Did It!💪🏻</span>
            )}
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
