import { useSelector } from "react-redux";
import {
  Button,
  Col,
  Container,
  OverlayTrigger,
  Popover,
  Row,
} from "react-bootstrap";
import TodoCard from "../components/TodoCard";

export default function Home() {
  const todos = useSelector((state) => state.todos);
  const loggedInUser = useSelector((state) => state.user);

  const userTodos = todos.filter((todo) => todo.userId === loggedInUser?.id);

  const completedTodos = userTodos.filter((todo) => todo.completed);
  const totalTodos = userTodos.length;
  const completionPercentage =
    totalTodos > 0 ? (completedTodos.length / totalTodos) * 100 : 0;

  const popover = (
    <Popover id="popover-basic">
      <Popover.Header as="h3">Progression Trackers</Popover.Header>
      <Popover.Body>
        <p>Total Workouts: {totalTodos}</p>
        <p>Completed Workouts: {completedTodos.length}</p>
        <p>Completion Percentage: {completionPercentage.toFixed(2)}%</p>
      </Popover.Body>
    </Popover>
  );

  return (
    <Container>
      <h1 className="my-3">🏋🏼 Start Your Workout Routines!</h1>
      <OverlayTrigger trigger="click" placement="right" overlay={popover}>
        <Button variant="success">Progression Tracker</Button>
      </OverlayTrigger>
      <Row>
        <CardGroup todos={userTodos} />
      </Row>
    </Container>
  );
}

function CardGroup({ todos }) {
  return todos.map((todo) => {
    return (
      <Col md={4} key={todo.id}>
        <TodoCard todo={todo} />
      </Col>
    );
  });
}
