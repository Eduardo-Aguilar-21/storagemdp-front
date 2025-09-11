import { Row, Col, Form } from "react-bootstrap";

export default function Filters() {
  return (
    <Row className="mb-4">
      <Col md={4}>
        <Form.Group>
          <Form.Label>Date Range</Form.Label>
          <Form.Control type="date" />
        </Form.Group>
      </Col>
      <Col md={4}>
        <Form.Group>
          <Form.Label>User</Form.Label>
          <Form.Select>
            <option>All</option>
            <option>Admin</option>
            <option>User 1</option>
          </Form.Select>
        </Form.Group>
      </Col>
      <Col md={4}>
        <Form.Group>
          <Form.Label>Category</Form.Label>
          <Form.Select>
            <option>All</option>
            <option>Electronics</option>
            <option>Accessories</option>
            <option>Furniture</option>
            <option>Stationery</option>
          </Form.Select>
        </Form.Group>
      </Col>
    </Row>
  );
}
