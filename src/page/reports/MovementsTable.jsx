import { Table } from "react-bootstrap";

export default function MovementsTable() {
  const data = [
    { period: "2025-09-01", entries: 20, exits: 10 },
    { period: "2025-09-02", entries: 15, exits: 8 },
    { period: "2025-09-03", entries: 25, exits: 12 },
  ];

  return (
    <div>
      <h5>Movements Summary</h5>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Date</th>
            <th>Entries</th>
            <th>Exits</th>
            <th>Balance</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr key={idx}>
              <td>{row.period}</td>
              <td>{row.entries}</td>
              <td>{row.exits}</td>
              <td>{row.entries - row.exits}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
