import { useState, useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import ProductSearch from "./ProductSearch";
import Cart from "./Cart";
import PaymentPanel from "./PaymentPanel";
import SaleSummary from "./SaleSummary";
import "./Sales.css";
import Swal from "sweetalert2";

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

  const finalizeSale = () => {
    if (cart.length === 0) {
      Swal.fire("⚠️ Carrito vacío", "Agrega al menos un producto", "warning");
      return;
    }

    if (!payment.method || payment.received < total) {
      Swal.fire("❌ Pago inválido", "El monto recibido es insuficiente", "error");
      return;
    }

    Swal.fire({
      title: "✅ Venta registrada",
      html: `
        <p><strong>Total:</strong> S/ ${total.toFixed(2)}</p>
        <p><strong>Método:</strong> ${payment.method}</p>
        <p><strong>Recibido:</strong> S/ ${payment.received}</p>
        <p><strong>Cambio:</strong> S/ ${(payment.received - total).toFixed(2)}</p>
      `,
      icon: "success",
      confirmButtonText: "OK",
    }).then(() => {
      setCart([]); // limpia carrito
      setPayment({ method: "Efectivo", received: 0 }); // resetea pago
    });
  };

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
              total={total}
              payment={payment}
              onFinalize={finalizeSale}
            />
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
