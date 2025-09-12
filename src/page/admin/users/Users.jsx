import { useState } from "react";
import { Container, Button } from "react-bootstrap";
import UserTable from "./UserTable";
import UserModal from "./UserModal";
import "./Users.css";

export default function  Users() {
  const [users, setUsers] = useState([
    { id: 1, name: "Juan Pérez", email: "juan@example.com", role: "Admin" },
    { id: 2, name: "María López", email: "maria@example.com", role: "User" },
    { id: 3, name: "Carlos Díaz", email: "carlos@example.com", role: "Manager" },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const handleSave = (user) => {
    if (user.id) {
      // editar
      setUsers(users.map((u) => (u.id === user.id ? user : u)));
    } else {
      // crear
      user.id = Date.now();
      setUsers([...users, user]);
    }
    setShowModal(false);
  };

  const handleDelete = (id) => {
    setUsers(users.filter((u) => u.id !== id));
  };

  return (
    <Container className="users-container">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>👤 Users</h2>
        <Button onClick={() => { setEditingUser(null); setShowModal(true); }}>
          ➕ New User
        </Button>
      </div>

      <UserTable
        users={users}
        onEdit={(user) => { setEditingUser(user); setShowModal(true); }}
        onDelete={handleDelete}
      />

      <UserModal
        show={showModal}
        onHide={() => setShowModal(false)}
        onSave={handleSave}
        user={editingUser}
      />
    </Container>
  );
}
