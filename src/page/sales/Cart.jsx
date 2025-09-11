import { Table, Button, Form } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";

export default function Cart({ cart, onUpdateQty, onRemove }) {
  return (
    <div>
      <h5>Carrito</h5>
      {cart.length === 0 ? (
        <p>No hay productos en el carrito.</p>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Producto</th>
              <th>Cant.</th>
              <th>Precio</th>
              <th>Subtotal</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>
                  <Form.Control
                    type="number"
                    min="1"
                    value={item.qty}
                    onChange={(e) => onUpdateQty(item.id, parseInt(e.target.value))}
                    style={{ width: "70px" }}
                  />
                </td>
                <td>S/ {item.price}</td>
                <td>S/ {item.price * item.qty}</td>
                <td>
                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() => onRemove(item.id)}
                  >
                    <FaTrash />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
}
    