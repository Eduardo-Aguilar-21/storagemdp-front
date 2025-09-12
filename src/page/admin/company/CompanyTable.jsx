import { Table, Button, Pagination } from "react-bootstrap";
import { useState } from "react";
import { useTheme } from "../../../context/ThemeContext";
import { FaBuilding, FaCalendarAlt, FaTools, FaTrash, FaEdit, FaHashtag } from "react-icons/fa";

export default function CompanyTable({ companies, onEdit, onDelete }) {
  const { dark } = useTheme();
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 5;

  const totalPages = Math.ceil(companies.length / perPage);
  const start = (currentPage - 1) * perPage;
  const paginatedCompanies = companies.slice(start, start + perPage);

  return (
    <div className={`table-responsive company-table ${dark ? "dark" : ""}`}>
      <Table striped bordered hover responsive className={`mt-3 ${dark ? "table-dark" : ""}`}>
        <thead>
          <tr>
            <th><FaHashtag className="me-1" /> ID</th>
            <th><FaBuilding className="me-1" /> Name</th>
            <th><FaCalendarAlt className="me-1" /> Created At</th>
            <th><FaCalendarAlt className="me-1" /> Updated At</th>
            <th><FaTools className="me-1" /> Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedCompanies.map((c) => (
            <tr key={c.id}>
              <td>{c.id}</td>
              <td>{c.name}</td>
              <td>{c.createdAt}</td>
              <td>{c.updatedAt}</td>
              <td className="d-flex gap-2">
                <Button size="sm" variant="primary" onClick={() => onEdit(c)}>
                  <FaEdit /> Edit
                </Button>
                <Button size="sm" variant="danger" onClick={() => onDelete(c.id)}>
                  <FaTrash /> Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Paginación */}
      <div className="d-flex justify-content-center mt-3">
        <Pagination className={dark ? "pagination-dark" : ""}>
          <Pagination.First onClick={() => setCurrentPage(1)} disabled={currentPage === 1} />
          <Pagination.Prev onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))} disabled={currentPage === 1} />

          {[...Array(totalPages)].map((_, idx) => (
            <Pagination.Item
              key={idx + 1}
              active={idx + 1 === currentPage}
              onClick={() => setCurrentPage(idx + 1)}
            >
              {idx + 1}
            </Pagination.Item>
          ))}

          <Pagination.Next
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
          />
          <Pagination.Last onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages} />
        </Pagination>
      </div>
    </div>
  );
}
