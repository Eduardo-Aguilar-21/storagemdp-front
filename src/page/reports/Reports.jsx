import { Container, Row, Col } from "react-bootstrap";
import Summary from "./Summary";
import StockChart from "./StockChart";
import MovementsChart from "./MovementsChart";
import MovementsTable from "./MovementsTable";
import Alerts from "./Alerts";
import Filters from "./Filters";
import "./Reports.css";
import { useTheme } from "../../context/ThemeContext";

export default function Reports() {
  const { dark } = useTheme();

  return (
    <div className={`reports-container p-3 ${dark ? "dark" : ""}`}>
      <h2 className="mb-4">📊 Reports</h2>

      {/* Filters */}
      <Filters />

      {/* Summary KPIs */}
      <Summary />

      {/* Charts */}
      <Container fluid className="mt-4">
        <Row>
          <Col md={6}>
            <StockChart />
          </Col>
          <Col md={6}>
            <MovementsChart />
          </Col>
        </Row>
      </Container>

      {/* Table & Alerts */}
      <Container fluid className="mt-4">
        <Row>
          <Col md={8}>
            <MovementsTable />
          </Col>
          <Col md={4}>
            <Alerts />
          </Col>
        </Row>
      </Container>
    </div>
  );
}
