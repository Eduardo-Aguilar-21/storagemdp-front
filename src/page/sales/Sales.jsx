import { useState, useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import ProductSearch from "./ProductSearch";
import Cart from "./Cart";
import PaymentPanel from "./PaymentPanel";
import SaleSummary from "./SaleSummary";
import "./Sales.css";

export function Sales() {
  const [products, setProducts] = useState([]); // catálogo de productos
  const [cart, setCart] = useState([]); // carrito de venta
  const [payment, setPayment] = useState({ method: "Efectivo", received: 0 });

  // cargar productos de ejemplo
  useEffect(() => {
    const exampleProducts = [];
    for (let i = 1; i <= 15; i++) {
      exampleProducts.push({
        id: i,
        name: `Producto ${i}`,
        price: Math.floor(Math.random() * 50) + 5,
        stock: Math.floor(Math.random() * 20) + 1,
      });
    }
    setProducts(exampleProducts);
  }, []);

  const handleAddToCart = (product, qty) => {
    const existing = cart.find((item) => item.id === product.id);
    if (existing) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, qty: item.qty + qty }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, qty }]);
    }
  };

  const handleUpdateQty = (id, qty) => {
    setCart(cart.map((item) => (item.id === id ? { ...item, qty } : item)));
  };

  const handleRemove = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <Container fluid className="sales-container p-3">
      <h2 className="mb-4">🛒 Nueva Venta</h2>
      <Row>
        {/* Buscar productos */}
        <Col md={7}>
          <Card className="p-3 mb-3">
            <ProductSearch products={products} onAdd={handleAddToCart} />
          </Card>

          <Card className="p-3">
            <Cart cart={cart} onUpdateQty={handleUpdateQty} onRemove={handleRemove} />
          </Card>
        </Col>

        {/* Pago y resumen */}
        <Col md={5}>
          <Card className="p-3 mb-3">
            <PaymentPanel payment={payment} setPayment={setPayment} total={total} />
          </Card>

          <Card className="p-3">
            <SaleSummary
              total={cart.reduce((acc, p) => acc + p.price * p.qty, 0)}
              payment={payment}
              onFinalize={() => {
                alert("✅ Venta registrada con éxito");
                setCart([]); // limpia carrito
                setPayment({ method: "", received: 0 }); // resetea pago
              }}
            />
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
