import { ListGroup, Badge } from "react-bootstrap";

export default function Alerts() {
  const lowStock = [
    { id: 1, product: "Laptop", quantity: 5 },
    { id: 2, product: "Pen", quantity: 3 },
  ];

  const frequentMovements = [
    { id: 101, product: "Mouse", count: 12 },
    { id: 102, product: "Notebook", count: 10 },
  ];

  return (
    <div>
      <h5>Alerts</h5>
      <ListGroup className="mb-3">
        <ListGroup.Item variant="danger">
          <strong>Low Stock</strong>
        </ListGroup.Item>
        {lowStock.map((p) => (
          <ListGroup.Item key={p.id}>
            {p.product} - <Badge bg="danger">{p.quantity}</Badge>
          </ListGroup.Item>
        ))}
      </ListGroup>

      <ListGroup>
        <ListGroup.Item variant="info">
          <strong>Frequent Movements</strong>
        </ListGroup.Item>
        {frequentMovements.map((m) => (
          <ListGroup.Item key={m.id}>
            {m.product} - <Badge bg="primary">{m.count}</Badge> times
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
}
