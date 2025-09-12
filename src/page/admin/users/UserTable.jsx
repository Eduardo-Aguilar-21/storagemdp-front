import { Table, Button, Pagination } from "react-bootstrap";
import { useState } from "react";
import { useTheme } from "../../../context/ThemeContext";
import { FaUser, FaEnvelope, FaIdBadge, FaTools, FaTrash, FaEdit } from "react-icons/fa";

export default function UserTable({ users, onEdit, onDelete }) {
  const { dark } = useTheme();
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 5;

  const totalPages = Math.ceil(users.length / perPage);
  const start = (currentPage - 1) * perPage;
  const paginatedUsers = users.slice(start, start + perPage);

  return (
    <div className={`table-responsive user-table ${dark ? "dark" : ""}`}>
      <Table
        striped
        bordered
        hover
        responsive
        className={`mt-3 ${dark ? "table-dark" : ""}`}
      >
        <thead>
          <tr>
            <th><FaIdBadge className="me-1" /> ID</th>
            <th><FaUser className="me-1" /> Name</th>
            <th><FaEnvelope className="me-1" /> Email</th>
            <th><FaIdBadge className="me-1" /> Role</th>
            <th><FaTools className="me-1" /> Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedUsers.map((u) => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.role}</td>
              <td className="d-flex gap-2">
                <Button
                  size="sm"
                  variant="primary"
                  onClick={() => onEdit(u)}
                >
                  <FaEdit /> Edit
                </Button>
                <Button
                  size="sm"
                  variant="danger"
                  onClick={() => onDelete(u.id)}
                >
                  <FaTrash /> Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* 🔹 Paginación mejorada */}
      <div className="d-flex justify-content-center mt-3">
        <Pagination className={dark ? "pagination-dark" : ""}>
          <Pagination.First
            onClick={() => setCurrentPage(1)}
            disabled={currentPage === 1}
          />
          <Pagination.Prev
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          />

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
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          />
          <Pagination.Last
            onClick={() => setCurrentPage(totalPages)}
            disabled={currentPage === totalPages}
          />
        </Pagination>
      </div>
    </div>
  );
}
