import { Form } from "react-bootstrap";

export default function PaymentPanel({ payment, setPayment, total }) {
  const change = payment.received - total;

  return (
    <div>
      <h5>Pago</h5>
      <Form.Group className="mb-2">
        <Form.Label>Método de pago</Form.Label>
        <Form.Select
          value={payment.method}
          onChange={(e) => setPayment({ ...payment, method: e.target.value })}
        >
          <option>Efectivo</option>
          <option>Tarjeta</option>
          <option>Yape/Plin</option>
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-2">
        <Form.Label>Monto recibido</Form.Label>
        <Form.Control
          type="number"
          value={payment.received}
          onChange={(e) => setPayment({ ...payment, received: parseFloat(e.target.value) || 0 })}
        />
      </Form.Group>

      <div>
        <strong>Cambio:</strong> S/ {change >= 0 ? change : 0}
      </div>
    </div>
  );
}
