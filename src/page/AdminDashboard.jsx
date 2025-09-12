import { Card, Button, Row, Col, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaUsers, FaBuilding, FaChartBar, FaCogs } from "react-icons/fa";
import "./AdminDashboard.css";
import { useTheme } from "../context/ThemeContext";

export default function AdminDashboard() {
  const { dark } = useTheme();
  const navigate = useNavigate();

  const modules = [
    {
      title: "Users",
      description: "Manage system users and roles.",
      icon: <FaUsers size={40} />,
      path: "/admin/users",
    },
    {
      title: "Companies",
      description: "Manage companies information.",
      icon: <FaBuilding size={40} />,
      path: "/admin/empresas",
    },
    {
      title: "Reports",
      description: "View admin reports and metrics.",
      icon: <FaChartBar size={40} />,
      path: "/reports",
    },
    {
      title: "Settings",
      description: "System configuration and options.",
      icon: <FaCogs size={40} />,
      path: "/settings",
    },
  ];

  return (
    <Container fluid className={`admin-dashboard p-4 ${dark ? "dark" : ""}`}>
      <h2 className="mb-4">⚙️ Administration Dashboard</h2>
      <Row xs={1} md={2} lg={3} className="g-4">
        {modules.map((m, idx) => (
          <Col key={idx}>
            <Card className="h-100 dashboard-card">
              <Card.Body className="d-flex flex-column align-items-center text-center">
                <div className="mb-3">{m.icon}</div>
                <Card.Title>{m.title}</Card.Title>
                <Card.Text>{m.description}</Card.Text>
                <Button
                  variant="primary"
                  className="mt-auto"
                  onClick={() => navigate(m.path)}
                >
                  Go to {m.title}
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
