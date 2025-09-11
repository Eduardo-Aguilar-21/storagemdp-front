import { useState, useEffect } from "react";
import { Table, Button, Modal, Pagination, Form } from "react-bootstrap";
import {
    FaBoxOpen,
    FaCalendarAlt,
    FaHashtag,
    FaSortNumericDown,
    FaTags,
    FaTools,
    FaTrash,
    FaSearch,
} from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";
import "./Inventory.css";

export function Inventory() {
    const { dark } = useTheme();

    const [products, setProducts] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    // 🔹 filtros y búsqueda
    const [search, setSearch] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("All");
    const [stockFilter, setStockFilter] = useState("All");

    // 🔹 paginación
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    useEffect(() => {
        const categories = ["Electronics", "Accessories", "Furniture", "Stationery"];
        const exampleData = [];
        for (let i = 1; i <= 20; i++) {
            exampleData.push({
                id: i,
                name: `Product ${i}`,
                category: categories[i % categories.length],
                quantity: Math.floor(Math.random() * 50) + 1,
                updatedAt: `2025-09-${(i % 30) + 1} 14:00`,
            });
        }
        setProducts(exampleData);
    }, []);

    const handleDelete = (id) => setProducts(products.filter((p) => p.id !== id));
    const handleView = (product) => {
        setSelectedProduct(product);
        setShowModal(true);
    };

    // 🔹 aplicar búsqueda y filtro por categoría
    const filteredProducts = products.filter((p) => {
        const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
        const matchesCategory = categoryFilter === "All" || p.category === categoryFilter;

        const matchesStock =
            stockFilter === "All" ||
            (stockFilter === "Low" && p.quantity <= 10) ||
            (stockFilter === "InStock" && p.quantity > 10);

        return matchesSearch && matchesCategory && matchesStock;
    });

    // 🔹 paginación
    const indexOfLast = currentPage * itemsPerPage;
    const indexOfFirst = indexOfLast - itemsPerPage;
    const currentItems = filteredProducts.slice(indexOfFirst, indexOfLast);
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

    return (
        <div className={`inventory-container p-3 ${dark ? "dark" : ""}`}>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2>Inventory</h2>
                <div className="d-flex gap-2">
                    <Form.Control
                        type="text"
                        placeholder="Search..."
                        value={search}
                        onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
                        style={{ width: "200px" }}
                    />
                    <Form.Select
                        value={categoryFilter}
                        onChange={(e) => { setCategoryFilter(e.target.value); setCurrentPage(1); }}
                    >
                        <option value="All">All Categories</option>
                        <option value="Electronics">Electronics</option>
                        <option value="Accessories">Accessories</option>
                        <option value="Furniture">Furniture</option>
                        <option value="Stationery">Stationery</option>
                    </Form.Select>
                    <Form.Select
                        value={stockFilter}
                        onChange={(e) => { setStockFilter(e.target.value); setCurrentPage(1); }}
                    >
                        <option value="All">All Stock</option>
                        <option value="Low">Low Stock</option>
                        <option value="InStock">In Stock</option>
                    </Form.Select>
                </div>
            </div>

            <div className="metrics d-flex gap-3 mb-3">
                <div>Total Products: {products.length}</div>
                <div>Low Stock: {products.filter(p => p.quantity <= 10).length}</div>
                <div>Categories: {new Set(products.map(p => p.category)).size}</div>
            </div>

            <Table striped bordered hover responsive className={`mt-3 ${dark ? "table-dark" : ""}`}>
                <thead>
                    <tr>
                        <th><FaHashtag className="me-1" /> ID</th>
                        <th><FaBoxOpen className="me-1" /> Product</th>
                        <th><FaTags className="me-1" /> Category</th>
                        <th><FaSortNumericDown className="me-1" /> Quantity</th>
                        <th><FaCalendarAlt className="me-1" /> Last Updated</th>
                        <th><FaTools className="me-1" /> Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.map((p) => (
                        <tr key={p.id}>
                            <td>{p.id}</td>
                            <td>{p.name}</td>
                            <td>{p.category}</td>
                            <td style={{ color: p.quantity <= 10 ? "red" : "inherit", fontWeight: p.quantity <= 10 ? "bold" : "normal" }}>
                                {p.quantity}
                            </td>
                            <td>{p.updatedAt}</td>
                            <td className="d-flex gap-2">
                                <Button size="sm" variant="primary" onClick={() => handleView(p)}>View</Button>
                                <Button size="sm" variant="danger" onClick={() => handleDelete(p.id)}><FaTrash /></Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {/* Paginación */}
            <div className="d-flex justify-content-center mt-3">
                <Pagination className={dark ? "pagination-dark" : ""}>
                    <Pagination.First onClick={() => setCurrentPage(1)} disabled={currentPage === 1} />
                    <Pagination.Prev onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1} />

                    {[...Array(totalPages)].map((_, idx) => (
                        <Pagination.Item key={idx + 1} active={idx + 1 === currentPage} onClick={() => setCurrentPage(idx + 1)}>
                            {idx + 1}
                        </Pagination.Item>
                    ))}

                    <Pagination.Next onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages} />
                    <Pagination.Last onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages} />
                </Pagination>
            </div>

            {/* Modal Detalle */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Product Detail</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedProduct && (
                        <ul>
                            <li><strong>ID:</strong> {selectedProduct.id}</li>
                            <li><strong>Product:</strong> {selectedProduct.name}</li>
                            <li><strong>Category:</strong> {selectedProduct.category}</li>
                            <li><strong>Quantity:</strong> {selectedProduct.quantity}</li>
                            <li><strong>Last Updated:</strong> {selectedProduct.updatedAt}</li>
                        </ul>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
