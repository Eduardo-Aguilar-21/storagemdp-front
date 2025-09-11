import { useState, useEffect } from "react";
import { Table, Badge, Button, Modal, Pagination, Dropdown } from "react-bootstrap";
import {
  FaBoxOpen,
  FaCalendarAlt,
  FaExchangeAlt,
  FaHashtag,
  FaSortNumericDown,
  FaTools,
  FaTrash,
  FaUser,
  FaFilter,
  FaTags
} from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";
import "./Movimientos.css";

export function Movimientos() {
  const { dark } = useTheme();

  const [movements, setMovements] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedMovement, setSelectedMovement] = useState(null);

  // 🔹 paginación
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // 🔹 filtro
  const [filter, setFilter] = useState("TODOS");

  useEffect(() => {
    const categories = ["Electrónica", "Accesorios", "Muebles", "Papelería"];
    const exampleData = [];
    for (let i = 1; i <= 25; i++) {
      exampleData.push({
        id: i,
        product: `Producto ${i}`,
        type: i % 2 === 0 ? "ENTRADA" : "SALIDA",
        category: categories[i % categories.length], // 🔹 categoría aleatoria
        quantity: Math.floor(Math.random() * 10) + 1,
        createdBy: i % 2 === 0 ? "admin" : "usuario1",
        createdAt: `2025-09-${(i % 30) + 1} 10:23`
      });
    }
    setMovements(exampleData);
  }, []);

  const handleDelete = (id) => setMovements(movements.filter((m) => m.id !== id));
  const handleView = (movement) => { setSelectedMovement(movement); setShowModal(true); };

  // 🔹 aplicar filtro
  const filteredMovements =
    filter === "TODOS"
      ? movements
      : movements.filter((m) => m.type === filter);

  // 🔹 lógica de paginación
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentItems = filteredMovements.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredMovements.length / itemsPerPage);

  return (
    <div className={`movements-container p-3 ${dark ? "dark" : ""}`}>
      <div className="d-flex justify-content-between align-items-center">
        <h2>Movimientos de Inventario</h2>

        {/* 🔹 Filtro */}
        <Dropdown>
          <Dropdown.Toggle variant={dark ? "secondary" : "primary"}>
            <FaFilter className="me-2" />
            {filter}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => { setFilter("TODOS"); setCurrentPage(1); }}>Todos</Dropdown.Item>
            <Dropdown.Item onClick={() => { setFilter("ENTRADA"); setCurrentPage(1); }}>Entradas</Dropdown.Item>
            <Dropdown.Item onClick={() => { setFilter("SALIDA"); setCurrentPage(1); }}>Salidas</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>

      <Table
        striped
        bordered
        hover
        responsive
        className={`mt-3 ${dark ? "table-dark" : ""}`}
      >
        <thead>
          <tr>
            <th><FaHashtag className="me-1" /> ID</th>
            <th><FaBoxOpen className="me-1" /> Producto</th>
            <th><FaExchangeAlt className="me-1" /> Tipo</th>
            <th><FaTags className="me-1" /> Categoría</th> {/* 🔹 nueva columna */}
            <th><FaSortNumericDown className="me-1" /> Cantidad</th>
            <th><FaUser className="me-1" /> Creado por</th>
            <th><FaCalendarAlt className="me-1" /> Fecha</th>
            <th><FaTools className="me-1" /> Acciones</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((m) => (
            <tr key={m.id}>
              <td>{m.id}</td>
              <td>{m.product}</td>
              <td>
                <Badge bg={m.type === "ENTRADA" ? "success" : "danger"}>
                  {m.type}
                </Badge>
              </td>
              <td>{m.category}</td> {/* 🔹 categoría en la tabla */}
              <td>{m.quantity}</td>
              <td>{m.createdBy}</td>
              <td>{m.createdAt}</td>
              <td className="d-flex gap-2">
                <Button size="sm" variant="primary" onClick={() => handleView(m)}>Ver</Button>
                <Button size="sm" variant="danger" onClick={() => handleDelete(m.id)}>
                  <FaTrash />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* 🔹 Paginación elegante */}
      <div className="d-flex justify-content-center mt-3">
        <Pagination className={dark ? "pagination-dark" : ""}>
          <Pagination.First onClick={() => setCurrentPage(1)} disabled={currentPage === 1} />
          <Pagination.Prev onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1} />
          
          {[...Array(totalPages)].map((_, idx) => (
            <Pagination.Item
              key={idx + 1}
              active={idx + 1 === currentPage}
              onClick={() => setCurrentPage(idx + 1)}
            >
              {idx + 1}
            </Pagination.Item>
          ))}

          <Pagination.Next onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages} />
          <Pagination.Last onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages} />
        </Pagination>
      </div>

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
              <li><strong>Categoría:</strong> {selectedMovement.category}</li> {/* 🔹 categoría en el modal */}
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
