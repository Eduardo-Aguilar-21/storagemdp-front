import { Modal, Button, Form } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useTheme } from "../../../context/ThemeContext";

export default function UserModal({ show, onHide, onSave, user }) {
  const { dark } = useTheme();
  const [form, setForm] = useState({ name: "", email: "", role: "User" });

  useEffect(() => {
    if (user) setForm(user);
    else setForm({ name: "", email: "", role: "User" });
  }, [user]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onSave({ ...form, id: user?.id });
  };

  return (
    <Modal show={show} onHide={onHide} centered className={dark ? "dark" : ""}>
      <Modal.Header closeButton>
        <Modal.Title>{user ? "Edit User" : "New User"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter name"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter email"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Role</Form.Label>
            <Form.Select name="role" value={form.role} onChange={handleChange}>
              <option>User</option>
              <option>Admin</option>
              <option>Manager</option>
            </Form.Select>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          {user ? "Save Changes" : "Create User"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
