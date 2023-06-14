import { useContext } from "react";
import { Col, Container, Row } from "react-bootstrap";
import TodoCard from "../components/TodoCard";
import { TodoContext, UserContext } from "../contexts/TodoContext";

export default function Home() {
  const { todos } = useContext(TodoContext);
  const { loggedInUser } = useContext(UserContext);

  const userTodos = todos.filter((todo) => todo.userId === loggedInUser?.id);

  return (
    <Container>
      <h1 className="my-3">Your todos</h1>
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
