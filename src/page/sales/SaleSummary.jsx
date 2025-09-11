import { Button } from "react-bootstrap";

export default function SaleSummary({ total, payment, onFinalize }) {
  const tax = total * 0.18;
  const net = total - tax;

  return (
    <div>
      <h5>Resumen</h5>
      <p><strong>Subtotal:</strong> S/ {net.toFixed(2)}</p>
      <p><strong>IGV (18%):</strong> S/ {tax.toFixed(2)}</p>
      <p><strong>Total:</strong> S/ {total.toFixed(2)}</p>
      <hr />
      <p>
        <strong>Método de pago:</strong> {payment.method || "—"} <br />
        <strong>Monto recibido:</strong> S/ {payment.received || 0} <br />
        <strong>Cambio:</strong> S/ {(payment.received - total >= 0 ? payment.received - total : 0).toFixed(2)}
      </p>

      <Button 
        variant="success" 
        className="mt-3 w-100" 
        disabled={total <= 0 || !payment.method}
        onClick={onFinalize}
      >
        Finalizar Venta
      </Button>
    </div>
  );
}
