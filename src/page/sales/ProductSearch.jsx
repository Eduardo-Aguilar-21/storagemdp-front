import { useState } from "react";
import { Table, Form, Button } from "react-bootstrap";
import { FaSearch, FaPlus } from "react-icons/fa";

export default function ProductSearch({ products, onAdd }) {
  const [search, setSearch] = useState("");

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h5>Buscar Producto</h5>
      <Form.Control
        type="text"
        placeholder="Buscar por nombre o código..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-3"
      />
      <div className="product-table-wrapper">
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Producto</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((p) => (
              <tr key={p.id}>
                <td>{p.name}</td>
                <td>S/ {p.price}</td>
                <td>{p.stock}</td>
                <td>
                  <Button
                    size="sm"
                    variant="success"
                    onClick={() => onAdd(p, 1)}
                  >
                    <FaPlus /> Agregar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}
