import { useState } from "react";
import { Button } from "react-bootstrap";
import CompanyTable from "./CompanyTable";
import CompanyModal from "./CompanyModal";
import "./Companies.css";

export default function Companies() {
  const [companies, setCompanies] = useState([
    { id: 1, name: "Tech Corp", createdAt: "2025-01-01", updatedAt: "2025-02-01" },
    { id: 2, name: "Food Market", createdAt: "2025-03-05", updatedAt: "2025-04-10" },
    { id: 3, name: "Retail World", createdAt: "2025-06-15", updatedAt: "2025-07-01" },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);

  const handleAdd = () => {
    setSelectedCompany(null);
    setShowModal(true);
  };

  const handleEdit = (company) => {
    setSelectedCompany(company);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    setCompanies(companies.filter((c) => c.id !== id));
  };

  const handleSave = (company) => {
    if (company.id) {
      setCompanies(companies.map((c) => (c.id === company.id ? company : c)));
    } else {
      const newCompany = {
        ...company,
        id: companies.length + 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setCompanies([...companies, newCompany]);
    }
    setShowModal(false);
  };

  return (
    <div className="companies-container p-3">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Companies</h2>
        <Button onClick={handleAdd}>➕ Add Company</Button>
      </div>

      <CompanyTable
        companies={companies}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <CompanyModal
        show={showModal}
        onHide={() => setShowModal(false)}
        onSave={handleSave}
        company={selectedCompany}
      />
    </div>
  );
}
    