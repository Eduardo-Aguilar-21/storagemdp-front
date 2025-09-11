import { Card, Row, Col } from "react-bootstrap";

export default function Summary() {
  const totalProducts = 120;
  const totalCategories = 8;
  const totalValue = 45000; // Ejemplo, luego podrías calcular dinámicamente

  return (
    <Row className="g-3">
      <Col md={4}>
        <Card className="card-metric">
          <h5>Total Products</h5>
          <h3>{totalProducts}</h3>
        </Card>
      </Col>
      <Col md={4}>
        <Card className="card-metric">
          <h5>Total Categories</h5>
          <h3>{totalCategories}</h3>
        </Card>
      </Col>
      <Col md={4}>
        <Card className="card-metric">
          <h5>Total Estimated Value</h5>
          <h3>${totalValue}</h3>
        </Card>
      </Col>
    </Row>
  );
}
