import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

export default function MovementsChart() {
    const data = [
        { date: "2025-09-01", entries: 20, exits: 10 },
        { date: "2025-09-02", entries: 15, exits: 8 },
        { date: "2025-09-03", entries: 25, exits: 12 },
        { date: "2025-09-04", entries: 10, exits: 15 },
    ];

    return (
        <div style={{ height: 300 }}>
            <h5>Entries vs Exits</h5>
            <ResponsiveContainer>
                <LineChart data={data}>
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="entries" stroke="#28a745" />
                    <Line type="monotone" dataKey="exits" stroke="#dc3545" />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}
