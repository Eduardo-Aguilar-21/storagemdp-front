import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function StockChart() {
  const data = [
    { category: "Electronics", stock: 40 },
    { category: "Accessories", stock: 25 },
    { category: "Furniture", stock: 15 },
    { category: "Stationery", stock: 20 },
  ];

  return (
    <div style={{ height: 300 }}>
      <h5>Stock by Category</h5>
      <ResponsiveContainer>
        <BarChart data={data}>
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="stock" fill="#007bff" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
