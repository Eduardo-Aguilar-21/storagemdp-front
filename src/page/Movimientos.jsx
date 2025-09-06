// Movimientos.jsx
import { useState, useEffect } from "react";
import { Table, Badge, Button, Modal } from "react-bootstrap";
import { FaPlus, FaTrash } from "react-icons/fa";
import "./Movimientos.css";

export function Movimientos() {
  // Estado para los movimientos
  const [movements, setMovements] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedMovement, setSelectedMovement] = useState(null);

  // Datos de ejemplo
  useEffect(() => {
    const exampleData = [
      {
        id: 1,
        product: "Laptop Dell",
        type: "ENTRADA",
        quantity: 5,
        createdBy: "admin",
        createdAt: "2025-09-05 10:23",
      },
      {
        id: 2,
        product: "Mouse Logitech",
        type: "SALIDA",
        quantity: 2,
        createdBy: "usuario1",
        createdAt: "2025-09-06 14:10",
      },
      {
        id: 3,
        product: "Teclado Corsair",
        type: "ENTRADA",
        quantity: 8,
        createdBy: "admin",
        createdAt: "2025-09-06 15:30",
      },
    ];
    setMovements(exampleData);
  }, []);

  const handleDelete = (id) => {
    setMovements(movements.filter((m) => m.id !== id));
  };

  const handleView = (movement) => {
    setSelectedMovement(movement);
    setShowModal(true);
  };

  return (
    <div className="movements-container p-3">
      <h2>Movimientos de Inventario</h2>
      <Table striped bordered hover responsive className="mt-3">
        <thead>
          <tr>
            <th>ID</th>
            <th>Producto</th>
            <th>Tipo</th>
            <th>Cantidad</th>
            <th>Creado por</th>
            <th>Fecha</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {movements.map((m) => (
            <tr key={m.id}>
              <td>{m.id}</td>
              <td>{m.product}</td>
              <td>
                <Badge bg={m.type === "ENTRADA" ? "success" : "danger"}>
                  {m.type}
                </Badge>
              </td>
              <td>{m.quantity}</td>
              <td>{m.createdBy}</td>
              <td>{m.createdAt}</td>
              <td className="d-flex gap-2">
                <Button size="sm" variant="primary" onClick={() => handleView(m)}>
                  Ver
                </Button>
                <Button size="sm" variant="danger" onClick={() => handleDelete(m.id)}>
                  <FaTrash />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal para ver detalles */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Detalle del Movimiento</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedMovement && (
            <ul>
              <li><strong>ID:</strong> {selectedMovement.id}</li>
              <li><strong>Producto:</strong> {selectedMovement.product}</li>
              <li><strong>Tipo:</strong> {selectedMovement.type}</li>
              <li><strong>Cantidad:</strong> {selectedMovement.quantity}</li>
              <li><strong>Creado por:</strong> {selectedMovement.createdBy}</li>
              <li><strong>Fecha:</strong> {selectedMovement.createdAt}</li>
            </ul>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Cerrar</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
