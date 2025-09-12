import { Modal, Button, Form } from "react-bootstrap";
import { useState, useEffect } from "react";

export default function CompanyModal({ show, onHide, onSave, company }) {
  const [formData, setFormData] = useState({ id: null, name: "" });

  useEffect(() => {
    if (company) {
      setFormData(company);
    } else {
      setFormData({ id: null, name: "" });
    }
  }, [company]);

  const handleSubmit = () => {
    if (formData.name.trim() === "") return;
    onSave({ ...formData, updatedAt: new Date().toISOString() });
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{formData.id ? "Edit Company" : "Add Company"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Company Name</Form.Label>
            <Form.Control
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Cancel</Button>
        <Button variant="primary" onClick={handleSubmit}>
          {formData.id ? "Save Changes" : "Add Company"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
