import { useSelector } from "react-redux";
import { Col, Container, Row } from "react-bootstrap";
import TodoCard from "../components/TodoCard";

export default function Home() {
  const todos = useSelector((state) => state.todos);
  const loggedInUser = useSelector((state) => state.user);

  const userTodos = todos.filter((todo) => todo.userId === loggedInUser?.id);

  return (
    <Container>
      <h1 className="my-3">🏋🏼 Start Your Workout Routines!</h1>
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
